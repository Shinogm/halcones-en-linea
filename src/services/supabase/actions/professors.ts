"use server";
import type { Tables } from "database.types";
import { createClient } from "../actions";
import { USER_TYPES } from "../functions/types";
import type { GetMyAlumnsProps, StartClassProps } from "./professor.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getProfessors = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_data")
    .select("*")
    .eq("role", USER_TYPES.PROFESSOR);

  if (error != null) {
    console.error("Error getting professors:", error);
    throw new Error("Error getting professors");
  }

  return data;
};

export const getMyClasses = async (careerSlug: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error != null || data == null) {
    console.error("Error getting session:", error);
    throw new Error("Error getting session");
  }

  // convert licenciatura-en-psicolog%C3%ADa-educativa to licenciatura-en-psicologia-educativa

  const careerSlugFixed = decodeURIComponent(careerSlug);

  const { data: classes, error: errClasses } = await supabase
    .from("teacher_config")
    .select(
      "subjects(*), careers(id, name, slug), education_plans(id, name), groups(id, name), semesters(id, number)",
    )
    .eq("owner", data.session?.user.id ?? "")
    .eq("careers.slug", careerSlugFixed);

  const configData: {
    [c: number]: {
      id: number;
      name: string;
      educationPlans: {
        [e: number]: {
          id: number;
          name: string;
          groups: {
            [g: number]: {
              id: number;
              name: string;
              semesters: {
                [s: number]: {
                  id: number;
                  number: number;
                  subjects: Array<Tables<"subjects">>;
                };
              };
            };
          };
        };
      };
    };
  } = {};

  if (errClasses != null || classes == null) {
    console.error("Error getting professor subjects:", error);
    throw new Error("Error getting professor subjects");
  }

  for (const config of classes) {
    if (
      config.careers == null ||
      config.semesters == null ||
      config.groups == null ||
      config.subjects == null ||
      config.education_plans == null
    )
      continue;

    const c = configData[config.careers.id];

    if (c == null) {
      configData[config.careers.id] = {
        ...config.careers,
        educationPlans: {
          [config.education_plans.id]: {
            ...config.education_plans,
            groups: {
              [config.groups.id]: {
                ...config.groups,
                semesters: {
                  [config.semesters.id]: {
                    ...config.semesters,
                    subjects: [config.subjects],
                  },
                },
              },
            },
          },
        },
      };

      continue;
    }

    const e = c.educationPlans[config.education_plans.id];

    if (e == null) {
      c.educationPlans[config.education_plans.id] = {
        ...config.education_plans,
        groups: {
          [config.groups.id]: {
            ...config.groups,
            semesters: {
              [config.semesters.id]: {
                ...config.semesters,
                subjects: [config.subjects],
              },
            },
          },
        },
      };

      continue;
    }

    const g = e.groups[config.groups.id];

    if (g == null) {
      e.groups[config.groups.id] = {
        ...config.groups,
        semesters: {
          [config.semesters.id]: {
            ...config.semesters,
            subjects: [config.subjects],
          },
        },
      };

      continue;
    }

    const s = g.semesters[config.semesters.id];

    if (s == null) {
      g.semesters[config.semesters.id] = {
        ...config.semesters,
        subjects: [config.subjects],
      };

      continue;
    }

    s.subjects.push(config.subjects);
  }

  const configDataArray = Object.values(configData).map((c) => ({
    ...c,
    educationPlans: Object.values(c.educationPlans).map((e) => ({
      ...e,
      groups: Object.values(e.groups).map((g) => ({
        ...g,
        semesters: Object.values(g.semesters).map((s) => s),
      })),
    })),
  }));

  return configDataArray[0];
};

export const getMyReducedCareers = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error != null || data == null) {
    console.error("Error getting session:", error);
    throw new Error("Error getting session");
  }

  const { data: dataCareers, error: errorCareers } = await supabase
    .from("teacher_config")
    .select("careers(id, name, slug)")
    .eq("owner", data.session?.user.id ?? "");

  if (errorCareers != null || dataCareers == null) {
    console.error("Error getting professor careers:", error);
    throw new Error("Error getting professor careers");
  }

  return dataCareers.map((c) => c.careers);
};

export const getMyStudents = async ({
  careerId,
  educationPlanId,
  groupId,
  semesterId,
}: GetMyAlumnsProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("student_config")
    .select("owner")
    .eq("career", careerId)
    .eq("education_plan", educationPlanId)
    .eq("group", groupId)
    .eq("semester", semesterId);

  if (error != null) {
    console.log("Error getting students:", error);
    throw new Error("Error getting students");
  }

  const students = await Promise.all(
    (data ?? []).map(async (o) => {
      const { data: studentData } = await supabase
        .from("user_data")
        .select("*")
        .eq("owner", o.owner)
        .single();

      return studentData;
    }),
  );

  return students;
};

export const startClass = async ({
  careerId,
  educationPlanId,
  groupId,
  semesterId,
  subjectId,
  subjectSlug,
}: StartClassProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error != null || data == null) {
    console.error("Error getting session:", error);
    throw new Error("Error getting session");
  }

  const { error: errorLive } = await supabase.from("live-class").insert({
    career: careerId,
    group: groupId,
    plan: educationPlanId,
    semester: semesterId,
    subject: subjectId,
  });

  if (errorLive != null) {
    console.error("Error starting class:", error);
    throw new Error("Error starting class");
  }

  await supabase.channel("live-class").send({
    event: "start-class",
    type: "broadcast",
    payload: {
      career: careerId,
      group: groupId,
      plan: educationPlanId,
      semester: semesterId,
      subject: subjectId,
      subjectSlug,
    },
  });
};

interface PGetActivityInfoForProfessor {
  educationPlanId: string | number;
  groupId: string | number;
  semesterId: string | number;
  careerId: string | number;
}

export const getActivityInfoForProfessor = async (activityId: string, { careerId, educationPlanId, groupId, semesterId }: PGetActivityInfoForProfessor) => {
  const supabase = await createClient();

  const { data: activity, error: errorActivity } = await supabase
    .from("activities")
    .select("name, desc, type, id")
    .eq("id", activityId)
    .single();

  if (errorActivity != null) {
    console.error("Error getting activity:", errorActivity);
    throw new Error("Error getting activity");
  }

  const { data: students, error: errorStudents } = await supabase
    .from("student_config")
    .select("owner")
    .eq("career", careerId)
    .eq("education_plan", educationPlanId)
    .eq("group", groupId)
    .eq("semester", semesterId);

  if (errorStudents != null) {
    console.error("Error getting students:", errorStudents);
    throw new Error("Error getting students");
  }

  const studentsData = await Promise.all(
    (students ?? []).map(async (o) => {
      const { data: studentData } = await supabase
        .from("user_data")
        .select("first_name, last_name")
        .eq("owner", o.owner)
        .single();

      const { data: calification } = await supabase
        .from("student_activity_califications")
        .select("cal")
        .eq("student", o.owner)
        .eq("activity", activityId)
        .single();

      const workIsSended = activity.type === 'work'
        ? async () => {
          const { data: work } = await supabase
            .from("student_work")
            .select("id")
            .eq("student", o.owner)
            .eq("activity", activityId)
            .single();

          return !!work?.id;
        }
        : async () => {
          const { data: openQuestions } = await supabase
            .from("student_open_options")
            .select("id")
            .eq("student", o.owner)
            .eq("activity", activityId)

          const { data: closedQuestions } = await supabase
            .from("student_multiple_options")
            .select("id")
            .eq("student", o.owner)
            .eq("activity", activityId)

          const data = [
            ...(openQuestions ?? []),
            ...(closedQuestions ?? []),
          ]

          return data.length > 0
        }

      const { data: work } = await supabase
        .from("student_work")
        .select("id")
        .eq("student", o.owner)
        .eq("activity", activityId)
        .single();

      const { data: files } = await supabase.storage
        .from("activities")
        .list(`${activityId.toString()}/${work?.id ?? "aaaaaa"}`);

      const formattedFiles = files?.map((f) => ({
        ...f,
        url: supabase.storage
          .from("activities")
          .getPublicUrl(`${activityId}/${work?.id ?? ''}/${f.name}`).data.publicUrl,
      }));

      return {
        id: o.owner,
        ...studentData,
        calification: calification?.cal ?? null,
        workIsSended: await workIsSended(),
        files: formattedFiles ?? [],
      };
    }),
  );

  return {
    ...activity,
    students: studentsData,
  };
}

export const getActivityStudentInfoForProfessor = async (activityId: string, studentId: string) => {
  const supabase = await createClient();

  const { data: activity, error: activityError } = await supabase
    .from("activities")
    .select("name, desc, type, id")
    .eq("id", activityId)
    .single();

  if (activityError != null) {
    console.error("Error getting activity:", activityError);
    throw new Error("Error getting activity");
  }

  const { data: studentData } = await supabase
    .from("user_data")
    .select("first_name, last_name")
    .eq("owner", studentId)
    .single();

  const { data: calification } = await supabase
    .from("student_activity_califications")
    .select("cal, message")
    .eq("activity", activityId)
    .eq("student", studentId)
    .single();

  const IsWorkIsSended = activity.type === 'work'
    ? async () => {
      const { data: work } = await supabase
        .from("student_work")
        .select("id")
        .eq("student", studentId)
        .eq("activity", activityId)
        .single()

      return !!work?.id
    }
    : async () => {
      const { data: openQuestions } = await supabase
        .from("student_open_options")
        .select("id")
        .eq("student", studentId)
        .eq("activity", activityId)

      const { data: closedQuestions } = await supabase
        .from("student_multiple_options")
        .select("id")
        .eq("student", studentId)
        .eq("activity", activityId)

      const data = [
        ...(openQuestions ?? []),
        ...(closedQuestions ?? []),
      ]

      return data.length > 0
    }

  const workIsSended = IsWorkIsSended()

  const { data: work } = await supabase
    .from("student_work")
    .select("id")
    .eq("student", studentId)
    .eq("activity", activityId)
    .single();

  const { data: files } = await supabase.storage
    .from("activities")
    .list(`${activityId.toString()}/${work?.id ?? "aaaaaa"}`);

  const formattedFiles = files?.map((f) => ({
    ...f,
    url: supabase.storage
      .from("activities")
      .getPublicUrl(`${activityId}/${work?.id ?? ''}/${f.name}`).data.publicUrl,
  }));

  const { data: questions } = await supabase
    .from("questions")
    .select("type, id")
    .eq("activity", activityId)

  const questionsData = await Promise.all(
    (questions ?? []).map(async (q) => {
      if (q.type === 'multiple_option') {
        const { data: responses } = await supabase
          .from("responses")
          .select("id, option, is_correct")
          .eq("question", q.id)

        const responsesData = await Promise.all(
          (responses ?? []).map(async (r) => {
            const { data: response } = await supabase
              .from("student_multiple_options")
              .select("id")
              .eq('response', r.id)
              .eq('student', studentId)
              .single()

            if (r.is_correct === false && response == null) return {
              ...r,
              studentIsCorrect: null
            }

            return {
              ...r,
              studentIsCorrect: !!response?.id
            }
          }),
        )

        return {
          ...q,
          responses: responsesData
        }
      }

      const { data: response } = await supabase
        .from("student_open_options")
        .select("response")
        .eq('question', q.id)
        .eq('student', studentId)
        .single()

      return {
        ...q,
        response: response?.response
      }
    }),
  )


  return {
    id: studentId,
    studentData: {
      ...studentData,
    },
    calification: calification?.cal ?? null,
    workIsSended: await workIsSended,
    files: formattedFiles ?? [],
    questions: questionsData,
    activity: activity,
    message: calification?.message ?? null
  };
}

export const getMyReducedStudents = async ({ careerId, educationPlanId, groupId, semesterId, }: PGetActivityInfoForProfessor) => {
  const supabase = await createClient();

  const { data: students, error: errorStudents } = await supabase
    .from("student_config")
    .select("owner")
    .eq("career", careerId)
    .eq("education_plan", educationPlanId)
    .eq("group", groupId)
    .eq("semester", semesterId);

  if (errorStudents != null) {
    console.log("Error getting students:", errorStudents);
    throw new Error("Error getting students");
  }

  const studentsData = await Promise.all(
    (students ?? []).map(async (o) => {
      const { data: studentData } = await supabase
        .from("user_data")
        .select("first_name, last_name")
        .eq("owner", o.owner)
        .single();

      return {
        id: o.owner,
        ...studentData,
      }
    }),
  );

  return studentsData;
}

interface PCalifyStudent {
  actId: number;
  studentId: string;
  calification: number;
  message: string;
}

export const califyStudent = async ({ actId, calification, studentId, message }: PCalifyStudent, redirectUri?: string) => {
  const supabase = await createClient();

  const { data: calificationObject } = await supabase.from('student_activity_califications').select('id').eq('activity', actId).eq('student', studentId).single()

  if (calificationObject == null) {
    await supabase.from('student_activity_califications').insert({
      student: studentId,
      activity: actId,
      cal: calification,
      message: message
    })

    return
  }

  await supabase.from('student_activity_califications').update({
    cal: calification
  }).eq('id', calificationObject.id)

  if (redirectUri != null) {
    revalidatePath(redirectUri)
    redirect(redirectUri)
  }
}
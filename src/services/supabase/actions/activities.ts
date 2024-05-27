"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../actions";
import type {
  CreateActivityProps,
  FileWithName,
  GetMyActivitiesProps,
} from "./professor.types";
import type { Enums } from "database.types";
import { z } from "zod";

export async function createActivity<
  QT extends Enums<"question_type">,
  AT extends Enums<"activity_type">,
>(
  activity: CreateActivityProps<AT, QT>,
  searchParams: {
    [key: string]: string;
  },
) {
  const supabase = await createClient();

  const { data: professorData, error: professorError } =
    await supabase.auth.getSession();

  if (professorError != null || professorData == null) {
    console.log("Error getting session:", professorError);
    throw new Error("Error getting session");
  }

  const { data, error } = await supabase
    .from("activities")
    .insert({
      ...activity.config,
      professor: professorData.session?.user.id ?? "",
    })
    .select("id")
    .single();

  if (error != null || data == null) {
    console.log("Error creating activity:", error);
    throw new Error("Error creating activity");
  }

  if (activity.files != null && activity.files.length > 0) {
    const bufferFilesArray = activity.files.map((base64File) =>
      Buffer.from(base64File.bytes, "base64"),
    );

    const bucketName = "activities";

    bufferFilesArray?.forEach(async (b, i) => {
      const name = (activity.files ?? [])[i].name ?? "";

      console.log("Uploading file:", name);

      const path = `/${data.id}/${name}`;

      const { data: bucketData, error: bucketError } = await supabase.storage
        .from(bucketName)
        .upload(path, b);

      console.log({
        bucketData,
        bucketError,
      });
    });
  }

  if (activity.questions != null) {
    const questions = activity.questions.map((q) => ({
      question: q.question ?? "",
      type: q.type ?? "multiple_option",
      accept_file: q.accept_file ?? false,
      activity: data.id,
      responses: q.responses ?? [],
    }));

    console.log(questions);

    const { error: errorQuestions, data: questionsData } = await supabase
      .from("questions")
      .insert(
        questions.map((q) => ({
          question: q.question,
          type: q.type,
          accept_file: q.accept_file,
          activity: q.activity,
        })),
      )
      .select("id");

    console.log({
      errorQuestions,
      questionsData,
    });

    if (errorQuestions != null || questionsData == null) {
      console.log("Error creating questions:", errorQuestions);
      throw new Error("Error creating questions");
    }

    await Promise.all(
      questions.map(async (q, i) => {
        if (q.type !== "multiple_option" || q.responses == null) return;

        const responses = q.responses.map((r) => ({
          ...r,
          question: questionsData[i].id,
        }));

        await supabase
          .from("responses")
          .insert(responses)
          .then(({ error: errorResponses }) => {
            if (errorResponses != null) {
              console.log("Error creating responses:", error);
              throw new Error("Error creating responses");
            }
          });
      }),
    );
  }

  const newSearchParams = new URLSearchParams(searchParams);

  newSearchParams.delete("section");
  newSearchParams.delete("type");
  newSearchParams.delete("currentPosition");
  newSearchParams.delete("name");
  newSearchParams.delete("desc");
  newSearchParams.delete("questionIndex");
  newSearchParams.delete("deadline");
  newSearchParams.delete("lastQuestionIndex");

  const { data: careerData } = await supabase
    .from("careers")
    .select("slug")
    .eq("id", activity.config.career)
    .single();
  const { data: subjectData } = await supabase
    .from("subjects")
    .select("slug")
    .eq("id", activity.config.subject)
    .single();

  const newPathname = decodeURIComponent(
    `/professor/career/${careerData?.slug ?? ""}/${subjectData?.slug ?? ""
    }/activities?${newSearchParams.toString()}`,
  );

  revalidatePath(newPathname);

  return {
    careerSlug: careerData?.slug ?? "",
    subjectSlug: subjectData?.slug ?? "",
    searchParams: newSearchParams.toString(),
  };
}

const getStudentInfo = async (
  activityId: number,
  activityType: Enums<"activity_type">,
  studentId?: string,
) => {
  const supabase = await createClient();

  if (studentId == null) return null;

  const studentInfoMethod =
    activityType === "work"
      ? async () => {
        const { data } = await supabase
          .from("student_work")
          .select("id, message, created_at")
          .eq("student", studentId)
          .eq("activity", activityId)
          .single()

        return {
          ...data,
          qualification: 0,
        }
      }
      : async () => {
        const { data: multipleData } = await supabase.from('student_multiple_options').select('id').eq('activity', activityId).eq('student', studentId)

        const { data: openData } = await supabase.from('student_open_options').select('id').eq('activity', activityId).eq('student', studentId)

        const data = [
          ...(multipleData ?? []),
          ...(openData ?? [])
        ]

        if (data.length === 0) return null

        return {
          id: 0,
          qualification: 0
        }
      };

  const studentInfo = await studentInfoMethod();

  const { data: files } = await supabase.storage.from("activities")
    .list(`${activityId.toString()}/${studentInfo?.id?.toString() ?? ""}`);

  const formattedFiles = (files ?? []).map((f) => ({
    ...f,
    url: supabase.storage
      .from("activities")
      .getPublicUrl(
        `${activityId.toString()}/${studentInfo?.id?.toString() ?? ""}/${f.name
        }`,
      ).data.publicUrl,
  }));

  if (studentInfo == null) return null;

  return {
    ...studentInfo,
    files: formattedFiles,
  };
};

export const getMyActivities = async (
  {
    careerId,
    educationPlanId,
    groupId,
    semesterId,
    subjectId,
    studentId,
  }: GetMyActivitiesProps,
  isProfessor = false,
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error != null || data == null) {
    console.error("Error getting session:", error);
    throw new Error("Error getting session");
  }

  const { data: activities, error: errorActivities } = isProfessor ? await supabase
    .from("activities")
    .select(
      "id, name, desc, type, created_at, deadline, is_open, questions(id, question, type, created_at, responses(id, option, is_correct)), professor",
    )
    .eq("professor", data.session?.user.id ?? "")
    .eq("career", careerId)
    .eq("education_plan", educationPlanId)
    .eq("group", groupId)
    .eq("semester", semesterId)
    .eq("subject", subjectId)
    : await supabase
      .from("activities")
      .select(
        "id, name, desc, type, created_at, deadline, is_open, questions(id, question, type, created_at, responses(id, option, is_correct)), professor",
      )
      .eq("career", careerId)
      .eq("education_plan", educationPlanId)
      .eq("group", groupId)
      .eq("semester", semesterId)
      .eq("subject", subjectId);

  if (errorActivities != null) {
    console.log("Error getting activities:", errorActivities);
    throw new Error("Error getting activities");
  }

  const activitiesWithFiles = await Promise.all(
    activities.map(async (a) => {
      const { data: files } = await supabase.storage
        .from("activities")
        .list(a.id.toString());
      const { data: professor } = await supabase
        .from("user_data")
        .select("first_name, last_name")
        .eq("owner", a.professor)
        .single();

      const studentInfo = await getStudentInfo(a.id, a.type, studentId);

      const formattedFiles = files?.map((f) => ({
        ...f,
        url: supabase.storage
          .from("activities")
          .getPublicUrl(`${a.id}/${f.name}`).data.publicUrl,
      }));

      return {
        ...a,
        files: formattedFiles ?? [],
        professor: {
          id: a.professor,
          ...professor,
        },
        studentInfo,
      };
    }),
  );

  return activitiesWithFiles;
};

export const getActivityById = async (
  activityId: number,
  studentId?: string,
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("activities")
    .select(
      "id, name, desc, type, deadline, is_open, questions(id, question, type, created_at, responses(id, option, is_correct))",
    )
    .eq("id", activityId)
    .single();

  if (error != null) {
    console.error("Error getting activity:", error);
    throw new Error("Error getting activity");
  }

  const { data: files } = await supabase.storage
    .from("activities")
    .list(activityId.toString());

  const formattedFiles = (files ?? []).map((f) => ({
    ...f,
    url: supabase.storage
      .from("activities")
      .getPublicUrl(`${activityId}/${f.name}`).data.publicUrl,
  }));

  const studentInfo = await getStudentInfo(activityId, data.type, studentId);

  return {
    ...data,
    studentInfo,
    files: formattedFiles,
  };
};

export const getStudentResponse = async (
  activityId: number,
  activityType: Enums<"activity_type">,
  studentId: string,
) => {
  const supabase = await createClient();

  const studentInfo = await getStudentInfo(activityId, activityType, studentId);

  const { data: files } = await supabase.storage
    .from("activities")
    .list(activityId.toString());

  const formattedFiles = (files ?? []).map((f) => ({
    ...f,
    url: supabase.storage
      .from("activities")
      .getPublicUrl(`${activityId}/${f.name}`).data.publicUrl,
  }));

  return {
    studentInfo,
    files: formattedFiles,
  };
};

export const uploadWorkActivity = async (
  activityId: number,
  file: FileWithName,
  message?: string,
  revalidatePathname?: string,
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error != null || data == null) {
    console.error("Error getting session:", error);
    throw new Error("Error getting session");
  }

  const { error: errorWork, data: uploadData } = await supabase
    .from("student_work")
    .insert({
      student: data.session?.user.id ?? "",
      activity: activityId,
      message,
    })
    .select("id")
    .single();

  if (errorWork != null) {
    console.error("Error uploading work:", errorWork);
    throw new Error("Error uploading work");
  }

  const bufferFile = Buffer.from(file.bytes, "base64");

  const bucketName = "activities";

  const path = `/${activityId}/${uploadData.id}/${file.name}`;

  const { error: bucketError } = await supabase.storage
    .from(bucketName)
    .upload(path, bufferFile);

  if (bucketError != null) {
    console.error("Error uploading file:", bucketError);
    throw new Error("Error uploading file");
  }

  if (revalidatePathname != null) {
    revalidatePath(revalidatePathname);
  }
};

export const uploadQuestionsWorkActivity = async (formdata: FormData) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error != null || data == null) {
    console.error("Error getting session:", error);
    throw new Error("Error getting session");
  }

  const responsesData = Object.fromEntries(formdata.entries());

  const actId = z.number({ coerce: true }).parse(responsesData.actId);

  const allResponses = await Promise.all(
    Object.entries(responsesData)
      .filter(([key, value]) => key.startsWith("response-question-"))
      .map(async ([key, value]) => {
        const questionId = z
          .number({
            coerce: true,
          })
          .parse(key.split("-")[2]);

        const { data: question } = await supabase
          .from("questions")
          .select("type")
          .eq("id", questionId)
          .single();

        if (question == null) return;

        if (question.type === "multiple_option") {
          const responseId = z
            .number({
              coerce: true,
            })
            .parse(value);

          return {
            responseId,
            questionId,
            type: question.type,
          };
        }

        if (question.type === "open") {
          return {
            questionId,
            type: question.type,
            response: value,
          };
        }
      }),
  );

  for (const r of allResponses) {
    if (r == null) continue;

    const table =
      r.type === "multiple_option"
        ? "student_multiple_options"
        : "student_open_options";
    const response =
      r.type === "multiple_option"
        ? z.number({ coerce: true }).parse(r.responseId)
        : z.string({ coerce: true }).parse(r.response);

    // @ts-expect-error - supabase types are wrong
    await supabase.from(table).insert({
      activity: actId,
      question: r.questionId,
      student: data.session?.user.id ?? "",
      response,
    });
  }
};

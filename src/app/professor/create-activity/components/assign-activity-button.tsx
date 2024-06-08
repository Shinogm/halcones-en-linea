"use client";

import { createActivity } from "@/services/supabase/actions/activities";
import { useFileStore, useQuestionsStore } from "@/stores/create-activity";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

interface Props {
	searchParams: {
		[key: string]: string;
	};
}

const ActivityTypeEnum = z.enum(["trivia", "exam", "questionary", "work"]);

export const AssignActivityButton = ({ searchParams }: Props) => {
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const files = useFileStore((state) => state.files);
	const questions = useQuestionsStore((state) => state.questions);
	const { push } = useRouter();

	const uploadActivity = async () => {
		const type = ActivityTypeEnum.parse(searchParams.type);

		const base64FilesArray = await Promise.all(
			files.map(async (file) => {
				const arrayBuffer = await file.arrayBuffer();
				const base64 = Buffer.from(arrayBuffer).toString("base64");
				return {
					bytes: base64,
					name: file.name,
				};
			}),
		);

		await createActivity(
			{
				config: {
					career: Number(searchParams.careerId),
					deadline:
						searchParams.deadline ?? new Date().toISOString().slice(0, 19),
					desc: searchParams.desc,
					education_plan: Number(searchParams.educationPlanId),
					name: searchParams.name,
					group: Number(searchParams.groupId),
					semester: Number(searchParams.semesterId),
					subject: Number(searchParams.subjectId),
					type,
					is_open: true,
				},
				files: type === "work" ? base64FilesArray : null,
				questions:
					type === "work"
						? null
						: Object.values(questions).filter((q) =>
								q.question !== "" && q.type === "open"
									? true
									: (q.responses ?? []).length > 0,
							),
			},
			searchParams,
		).then((res) => {
			console.log(res);

			if (res == null) return;

			const { careerSlug, searchParams, subjectSlug } = res;

			push(
				`/professor/career/${careerSlug}/${subjectSlug}/activities?${searchParams}`,
			);
		});
	};

	return (
		<button
			type="button"
			onClick={() => {
				setButtonDisabled(true);
				uploadActivity().catch((err) => console.log(err));
			}}
			className="bg-itesus-primary px-2 rounded-lg text-white"
			disabled={buttonDisabled}
		>
			Asignar actividad
		</button>
	);
};

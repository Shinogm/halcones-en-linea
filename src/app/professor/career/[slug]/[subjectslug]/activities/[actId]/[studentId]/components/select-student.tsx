"use client";

import { v4 } from "@/utils/uuid";
import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
	students: {
		first_name?: string | undefined;
		last_name?: string | undefined;
		id: string;
	}[];
}

export function SelectStudent({ students }: Props) {
	const params = useParams();
	const searchParams = useSearchParams();
	const router = useRouter();
	const selectedStudent = params.studentId;

	const showLoading = () => {
		toast.message("Cargando estudiante...", {
			duration: 1500,
		});
	};

	return (
		<section className="flex items-center gap-4">
			<select
				value={selectedStudent}
				className="bg-transparent text-xl"
				onChange={(e) => {
					showLoading();

					router.replace(
						`/professor/career/${params.slug}/${
							params.subjectslug
						}/activities/${params.actId}/${
							e.target.value
						}?${searchParams.toString()}`,
					);
				}}
			>
				{students.map((s) => (
					<option className="text-black bg-white" key={v4()} value={s.id}>
						{s.first_name} {s.last_name}
					</option>
				))}
			</select>

			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => {
						showLoading();

						const studentIndex = students.findIndex(
							(s) => s.id === selectedStudent,
						);

						const newStudent =
							studentIndex === 0
								? students[students.length - 1]
								: students[studentIndex - 1];

						router.replace(
							`/professor/career/${params.slug}/${
								params.subjectslug
							}/activities/${params.actId}/${
								newStudent.id
							}?${searchParams.toString()}`,
						);
					}}
				>
					<IconCaretLeftFilled />
				</button>

				<button
					type="button"
					onClick={() => {
						showLoading();

						const studentIndex = students.findIndex(
							(s) => s.id === selectedStudent,
						);

						const newStudent =
							studentIndex === students.length - 1
								? students[0]
								: students[studentIndex + 1];

						router.replace(
							`/professor/career/${params.slug}/${
								params.subjectslug
							}/activities/${params.actId}/${
								newStudent.id
							}?${searchParams.toString()}`,
						);
					}}
				>
					<IconCaretRightFilled />
				</button>
			</div>
		</section>
	);
}

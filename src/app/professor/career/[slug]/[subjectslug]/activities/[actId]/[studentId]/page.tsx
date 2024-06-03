import { Main } from "@/components/utils";
import {
	getActivityStudentInfoForProfessor,
	getMyReducedStudents,
} from "@/services/supabase/actions/professors";
import { v4 } from "@/utils/uuid";
import { ACTIVITYTYPES } from "../page";
import {
	IconCaretLeftFilled,
	IconCaretRightFilled,
	IconFileText,
	IconSearch,
} from "@tabler/icons-react";
import { CalifyForm } from "./components/calify-form";

interface Props {
	params: {
		actId: string;
		slug: string;
		subjectslug: string;
		studentId: string;
	};

	searchParams: {
		groupId: string;
		semesterId: string;
		educationPlanId: string;
		careerId: string;
	};
}

export default async function StudentActivityPage({
	params,
	searchParams,
}: Props) {
	const listOfStudents = await getMyReducedStudents({
		careerId: searchParams.careerId,
		educationPlanId: searchParams.educationPlanId,
		groupId: searchParams.groupId,
		semesterId: searchParams.semesterId,
	});

	const selectedStudentActivity = await getActivityStudentInfoForProfessor(
		params.actId,
		params.studentId,
	);

	console.log(selectedStudentActivity);
	console.log(listOfStudents);

	return (
		<Main>
			<header className="flex flex-col border-b border-b-itesus-tertiary pb-2">
				<div className="mx-auto bg-itesus-tertiary min-w-96 px-3">
					<h1 className="text-itesus-primary text-2xl text-center caption-top font-bold">
						{selectedStudentActivity.activity.name}
					</h1>
				</div>

				<section className="flex items-center gap-4">
					<select className="bg-transparent text-xl">
						{listOfStudents.map((s) => (
							<option className="text-black bg-white" key={v4()} value={s.id}>
								{s.first_name} {s.last_name}
							</option>
						))}
					</select>

					<div className="flex items-center gap-2">
						<button type="button">
							<IconCaretLeftFilled />
						</button>

						<button type="button">
							<IconCaretRightFilled />
						</button>
					</div>
				</section>
			</header>

			<section className="flex flex-col flex-1">
				<span className="text-xl text-itesus-tertiary/70">
					{selectedStudentActivity.files[0]?.name}
				</span>
				<div className="flex justify-end">
					<span className="text-right text-xl border-b">
						{ACTIVITYTYPES[selectedStudentActivity.activity.type]}
					</span>
				</div>

				<div className="flex h-full">
					<div className="flex-1 flex flex-col gap-2">
						{selectedStudentActivity.activity.type === "work" ? (
							<>
								{selectedStudentActivity.files.length > 0 &&
								selectedStudentActivity.files[0]?.url !== null ? (
									<>
										<picture className="aspect-video">
											<img
												src={selectedStudentActivity.files[0]?.url}
												alt="imagen de actividad"
											/>
										</picture>
										<div className="flex w-full justify-center items-center">
											<button type="button">-</button>

											<IconSearch />

											<button type="button">+</button>
										</div>
									</>
								) : (
									<div className="flex justify-center items-center">
										<IconFileText />
									</div>
								)}
							</>
						) : (
							<>
								{selectedStudentActivity.questions.map((q, i) => (
									<div key={v4()} className="w-full">
										<p className="text-left text-xl border-b">
											<span>{i + 1}.</span> {q.question}
										</p>
										{q.type === "open" && (
											<span className="p-2 text-lg">{q.response}</span>
										)}
										{q.type === "multiple_option" && (
											<ol className="list-upper-alpha space-y-2 py-2 pl-5 text-lg">
												{q?.responses?.map((r) => (
													<li
														className={`
														rounded-md px-1
													${
														r.studentIsCorrect === true
															? "bg-green-400/50"
															: r.studentIsCorrect === false
																? "bg-red-400/50"
																: ""
													}
													`}
														key={v4()}
													>
														{r.option}
													</li>
												))}
											</ol>
										)}
									</div>
								))}
							</>
						)}
					</div>

					<div className="h-full flex justify-center items-center">
						<CalifyForm
							actId={selectedStudentActivity.activity.id}
							studentId={selectedStudentActivity.id}
							calification={selectedStudentActivity.calification ?? undefined}
							message={selectedStudentActivity.message ?? undefined}
						/>
					</div>
				</div>
			</section>
		</Main>
	);
}

import { Main, ShyScrollbar } from "@/components/utils";
import { getActivityInfoForProfessor } from "@/services/supabase/actions/professors";
import { v4 } from "@/utils/uuid";
import { FilterInput } from "./components/filter-input";
import { CalifyInput } from "./components/calify-input";
import Link from "next/link";

interface Props {
	params: {
		actId: string;
	};
	searchParams: {
		subjectId: string;
		groupId: string;
		semesterId: string;
		educationPlanId: string;
		careerId: string;
		filterIsSender?: "all" | "send" | "notSend";
	};
}

const ACTIVITYTYPES = {
	trivia: "Trivia",
	exam: "Examen",
	work: "Trabajo",
	questionary: "Cuestionario",
};

export default async function ActivityPage({ params, searchParams }: Props) {
	const activity = await getActivityInfoForProfessor(params.actId, {
		careerId: searchParams.careerId,
		educationPlanId: searchParams.educationPlanId,
		groupId: searchParams.groupId,
		semesterId: searchParams.semesterId,
	});

	const filteredStudents = activity.students.filter((s) => {
		if (searchParams.filterIsSender == null) return true;

		const variants = {
			all: true,
			send: s.workIsSended === true,
			notSend: s.workIsSended === false,
		};

		return variants[searchParams.filterIsSender];
	});

	return (
		<Main>
			<header className="flex flex-col flex-1">
				<div className="flex flex-col gap-3 justify-center items-center border-b border-b-itesus-tertiary pb-4">
					<div className="bg-itesus-tertiary px-2 rounded-sm">
						<h1 className="text-itesus-primary text-2xl font-bold capitalize">
							{activity.name}
						</h1>
					</div>

					<p className="text-2xl text-itesus-tertiary/90">
						{activity.desc != null
							? activity.desc
							: "Vista general de la actividad"}
					</p>
				</div>
				<div className="flex justify-end">
					<span className="text-2xl">{ACTIVITYTYPES[activity.type]}</span>
				</div>
			</header>

			<div className="flex h-[75%] gap-5">
				<ol className="overflow-y-auto space-y-1 w-[40%] px-5 ">
					{filteredStudents.map((s) => (
						<li key={v4()} className="flex gap-2">
							<div className="bg-itesus-tertiary px-2 py-1 flex-1 rounded-lg">
								<span className="text-itesus-primary">
									{s.first_name} {s.last_name}
								</span>
							</div>
							<CalifyInput
								studentId={s.id}
								actId={activity.id}
								calification={s.calification ?? undefined}
							/>
						</li>
					))}
				</ol>

				<section style={ShyScrollbar} className="overflow-y-auto flex-1">
					<FilterInput />

					<div className="grid grid-cols-2 place-items-center gap-x-11">
						{filteredStudents.map((s) => (
							<article
								key={v4()}
								className="flex h-28 w-full bg-itesus-tertiary text-gray-800/50 font-semibold rounded-xl overflow-hidden"
							>
								<picture className="flex-1">
									{s.files[0]?.metadata?.mimetype?.startsWith("image") ? (
										<Link href={s.files[0].url} target="_blank">
											<img
												className="aspect-square "
												src={s.files[0].url}
												alt={s.files[0].name}
											/>
										</Link>
									) : (
										<Link href={s.files[0]?.url ?? "#"} target="_blank">
											<img
												className="aspect-square "
												src="/upload.svg"
												alt="upload"
											/>
										</Link>
									)}
								</picture>

								<div className="w-[75%]">
									<span className="flex mt-2">
										{s.first_name} {s.last_name}
									</span>

									{/* file name */}
									{s.files[0] != null && <span className="flex flex-col mt-2 text-black">{s.files[0]?.name}</span>}

									{/* file type */}
									{s.files[0] != null && (
										<span className="flex flex-col text-sm">{s.files[0].name.split(".").pop()}</span>
									)}
									<span className="pl-56 ">{s.workIsSended ? "Entregado" : "No entregado"}</span>
								</div>
							</article>
						))}
					</div>
				</section>
			</div>
		</Main>
	);
}

import { getMyStudents } from "@/services/supabase/actions/professors";
import { ShowAlumns } from "./show-alumns";
import ShowImage from "../activities/components/show-image";
import { getActivityById } from "@/services/supabase/actions/activities";

export default async function GradeActivity({ params, searchParams }) {
	console.log(params, searchParams);

	const activity = await getActivityById(searchParams.activityId);

	const myStudents = await getMyStudents({
		careerId: searchParams.careerId,
		educationPlanId: searchParams.educationPlanId,
		groupId: searchParams.groupId,
		semesterId: searchParams.semesterId,
	});

	console.log(myStudents);
	return (
		<main className="flex flex-col gap-5 w-full h-full ">
			<ShowAlumns students={myStudents} />
			<span className="underline text-xl font-black text-[#cfd0d2] text-start">
				{activity.name}
			</span>
			<section className="flex flex-row gap-10">
				<ShowImage selectedActivity={activity} />
				<div className="flex flex-col w-1/4  gap-2 border">
					<span className="underline text-xl font-black text-[#cfd0d2] px-5 text-center">
						{activity.type}
					</span>
					<section className="flex flex-col p-5">
						<input
							type="text"
							className="p-2 text-[#cfd0d2] border bg-transparent"
							placeholder="Calificación"
						/>
						<input
							type="text"
							className="p-2 text-[#cfd0d2] border bg-transparent"
							placeholder="Comentario"
						/>
						<button
							type="button"
							className="rounded-md bg-[#1664a6] text-white w-24 self-center mt-10"
						>
							Enviar
						</button>
					</section>
				</div>
			</section>
		</main>
	);
}

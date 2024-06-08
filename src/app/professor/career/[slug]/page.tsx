import { H1, Main } from "@/components/utils";
import { getMyClasses } from "@/services/supabase/actions/professors";
import Link from "next/link";

interface Props {
	params: {
		slug: string;
	};
}

export default async function CareerPage({ params }: Props) {
	const classes = await getMyClasses(params.slug);

	console.log(classes);
	console.log(params);

	return (
		<Main>
			<div className="text-white flex flex-row w-full">
				{classes.educationPlans?.map((plan) =>
					plan.groups?.map((group) =>
						group.semesters?.map((semester) =>
							semester.subjects?.map((subject) => (
								<div
									key={`${classes.id}-${plan.id}-${group.id}-${semester.id}-${subject.id}`}
									className="text-[#858484] p-6 px-10 grid grid-cols-2 grid-flow-row  w-full"
								>
									<Link
										href={`/professor/career/${params.slug}/${subject.slug ?? ""}/schedule?groupId=${group.id}&semesterId=${semester.id}&educationPlanId=${plan.id}&subjectId=${subject.id}&careerId=${classes.id}`}
									>
										<button
											type="button"
											className="rounded-xl gap-10 bg-[#cdcbcc] p-3"
										>
											<H1 className="text-2xl">{subject.name}</H1>
											<p>
												Semestre {semester.number} - Plan (PLAN - {plan.id})
											</p>
											<p>Grupo {group.name} </p>
										</button>
									</Link>
								</div>
							)),
						),
					),
				)}
			</div>
		</Main>
	);
}
// groupId: group.id,
// semesterId: semester.id,
// educationPlanId: plan.id,
// subjectId: subject.id,
// careerId: career.id

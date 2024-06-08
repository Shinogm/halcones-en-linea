import { Main } from "@/components/utils";
import {
	getActivityById,
	uploadQuestionsWorkActivity,
} from "@/services/supabase/actions/activities";
import { dateFormatter } from "@/utils/formatters";
import { ActivityForm } from "./components/form";

interface Props {
	params: {
		actId: string;
	};
}

export default async function DoActivity({ params }: Props) {
	const act = await getActivityById(Number(params.actId));

	console.log(act);

	return (
		<Main className="max-w-5xl mx-auto p-2 flex flex-col">
			<header className="mb-10 ">
				<time className="flex flex-col text-[#cdcccb]/70 w-full font-semibold text-right">
					Finaliza el: {dateFormatter(new Date(act.deadline), "es-MX")}
				</time>
				<div className="flex justify-between mt-6">
					<h1 className="text-4xl font-bold text-[#cdcccb] capitalize">
						{act.name}
					</h1>
					{act.desc != null && <h3>{act.desc}</h3>}
				</div>
			</header>

			<ActivityForm act={act} />
		</Main>
	);
}

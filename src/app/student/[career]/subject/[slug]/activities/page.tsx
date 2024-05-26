// import { UploadFileIcon } from '@/assets/icons'
import { getMyActivities } from "@/services/supabase/actions/activities";
import { getUser } from "@/services/supabase/actions/auth";
import { DisplayActivity } from "./components/display-activity";
import { v4 } from "@/utils/uuid";
import { UploadFileModal } from "./components/upload-file-modal";
import { Filter } from "./components/filter";

const TYPES = {
	trivia: "Trivia",
	exam: "Examen",
	work: "Trabajo",
	questionary: "Cuestionario",
};

interface Props {
	searchParams: {
		careerId: string;
		semesterId: string;
		groupId: string;
		educationPlanId: string;
		subjectId: string;
		upload?: string;
		activityId?: string;
		filter?: string;
	};
}

export default async function ActivityPage({ searchParams }: Props) {
	const user = await getUser();

	if (user == null) {
		console.error("Error getting user");
		throw new Error("Error getting user");
	}

	const { owner } = user;

	const activities = await getMyActivities({
		careerId: Number.parseInt(searchParams.careerId),
		semesterId: Number.parseInt(searchParams.semesterId),
		groupId: Number.parseInt(searchParams.groupId),
		educationPlanId: Number.parseInt(searchParams.educationPlanId),
		subjectId: Number.parseInt(searchParams.subjectId),
		studentId: owner ?? undefined,
	});

	const filteredActivities = activities.filter((a) => {
		const filter = searchParams.filter ?? "all";

		if (filter === "all") return true;

		if (filter === "delivered") return a.studentInfo != null;

		if (filter === "not-delivered") return a.studentInfo == null;

		return false;
	});

	console.log(filteredActivities);

	return (
		<main className="flex flex-col gap-2">
			{searchParams?.upload === "true" && (
				<UploadFileModal
					open={searchParams?.upload === "true"}
					activityId={Number.parseInt(searchParams.activityId ?? "0")}
				/>
			)}
			<section className="flex justify-end">
				<Filter />
			</section>
			<section className="flex flex-col gap-5 flex-1 overflow-y-auto">
				{filteredActivities.map((a, i) => (
					<DisplayActivity
						id={a.id}
						key={v4()}
						number={i + 1}
						deadline={new Date(a.deadline)}
						status={a.studentInfo != null ? "Entregada" : "No entregada"}
						topic={a.name}
						description={a.desc ?? undefined}
						checked={a.studentInfo != null}
						requiredFile={a.type === "work"}
						type={{
							label: TYPES[a.type],
							value: a.type,
						}}
					/>
				))}
			</section>
		</main>
	);
}

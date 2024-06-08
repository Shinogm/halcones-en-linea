import Link from "next/link";
import { DisplayActivities } from "./components/get-activities";
import { Main } from "@/components/utils";

export default async function Activities({ params, searchParams }) {
	const newSearchParams = new URLSearchParams(searchParams);

	return (
		<Main className="flex flex-col gap-5 mx-auto max-w-7xl">
			<header className="flex gap-2 items-center">
				<div className="bg-white text-[#21264a] rounded-md px-2 flex items-center text-xl">
					Mis actividades
				</div>
				<Link href={`/professor/create-activity?${newSearchParams.toString()}`}>
					<div className="text-white bg-[#1264ac] rounded-full justify-center items-center flex  size-7">
						+
					</div>
				</Link>
			</header>

			<DisplayActivities params={params} searchParams={searchParams} />
		</Main>
	);
}

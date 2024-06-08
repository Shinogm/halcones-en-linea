import { H1, Main } from "@/components/utils";
import { DayAndHour } from "./components/day-and-hour";

export default function Schedule() {
	return (
		<Main>
			<header className="border-b-2 border-b-black px-10 py-5">
				<H1 className="text-white underline">Horario de clases</H1>
			</header>
			<DayAndHour date={new Date()} toDate={new Date()} />
		</Main>
	);
}

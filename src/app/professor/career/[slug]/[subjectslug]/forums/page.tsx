import { SendForm } from "./components/send-form";
import { MessageBox } from "./components/message-box";
import {
	getMessages,
	listenMessages,
} from "@/services/supabase/actions/forums";

export default async function Forums({ params, searchParams }) {
	const messages = await getMessages({
		careerId: Number(searchParams.careerId),
		educationPlanId: Number(searchParams.educationPlanId),
		groupId: Number(searchParams.groupId),
		subjectId: Number(searchParams.subjectId),
	});

	listenMessages({
		careerId: Number(searchParams.careerId),
		educationPlanId: Number(searchParams.educationPlanId),
		groupId: Number(searchParams.groupId),
		subjectId: Number(searchParams.subjectId),
	}).then((message) => {
		// @ts-expect-error - supabase types are wrong
		messages.push(message);
	});

	return (
		<main className="h-full w-full flex flex-col gap-10">
			<div className="bg-[#305866] w-full h-20 items-center flex justify-center">
				<h1 className="text-4xl font-bold text-center text-white ">Foros</h1>
			</div>
			<MessageBox messages={messages} />
			<SendForm searchParams={searchParams} />
		</main>
	);
}

"use client";

import { sendMessage } from "@/services/supabase/actions/forums";
import { toast } from "sonner";

type Props = {
	searchParams: {
		[key: string]: string;
	};
};

export const SendForm = ({ searchParams }) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				const form = new FormData(e.currentTarget);

				const message = form.get("message") as string;

				if (message == null) return;
				if (message === "") return;

				const promise = sendMessage({
					message,
					subjectId: Number(searchParams.subjectId),
					groupId: Number(searchParams.groupId),
					educationPlanId: Number(searchParams.educationPlanId),
					careerId: Number(searchParams.careerId),
				});

				toast.promise(promise, {
					loading: "Enviando mensaje...",
					success: "Mensaje enviado",
					error: "Error al enviar mensaje",
				});

				e.currentTarget.reset();
			}}
			className="w-full flex flex-row gap-4"
		>
			<input
				placeholder="Escribe un mensaje"
				className="w-full rounded-xl p-5"
				name="message"
			/>
			<button type="submit">
				<img src="/accept.svg" alt="" className="w-10 h-10" />
			</button>
		</form>
	);
};

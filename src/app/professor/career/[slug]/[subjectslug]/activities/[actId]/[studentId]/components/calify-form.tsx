"use client";

import { califyStudent } from "@/services/supabase/actions/professors";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	calification?: number;
	message?: string;
	studentId: string;
	actId: number;
};

export const CalifyForm = ({
	calification,
	message,
	studentId,
	actId,
}: Props) => {
	const [calificationValue, setCalificationValue] = useState(calification ?? 0);
	const [messageValue, setMessageValue] = useState(message ?? "");
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (calificationValue < 0 || calificationValue > 100)
			return toast.error("Calificación debe estar entre 0 y 100");
		if (messageValue.length < 50)
			return toast.error("El comentario debe tener al menos 50 caracteres");

		const pathnameWithoutStudentId = pathname.split("/");
		pathnameWithoutStudentId.pop();

		const newPathname = `${pathnameWithoutStudentId.join(
			"/",
		)}?${searchParams.toString()}`;

		califyStudent(
			{
				actId,
				calification: calificationValue,
				studentId,
				message: messageValue,
			},
			newPathname,
		)
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				toast.success("Calificación enviada con éxito");
			});
	};

	return (
		<form
			onSubmit={onSubmit}
			className="flex my-auto flex-col border border-itesus-tertiary/20 p-2"
		>
			<label className="flex flex-col gap-1 border border-itesus-tertiary/20 p-2">
				<span className="text-xl">Calificación</span>
				<input
					className="bg-transparent w-96 p-1"
					type="number"
					required
					value={calificationValue}
					onChange={(e) => setCalificationValue(Number(e.target.value))}
				/>
			</label>

			<label className="flex flex-col gap-1 border border-itesus-tertiary/20 p-2">
				<span className="text-xl">Comentario</span>
				<textarea
					className="bg-transparent w-96 min-h-40 p-1"
					required
					value={messageValue}
					onChange={(e) => setMessageValue(e.target.value)}
				/>
			</label>

			<footer className="flex justify-center items-center gap-2 border-t border-itesus-tertiary/20 p-2">
				<button
					className="bg-itesus-primary text-xl w-fit text-itesus-tertiary font-semibold px-3 py-1 rounded-md"
					type="submit"
				>
					Enviar
				</button>
			</footer>
		</form>
	);
};

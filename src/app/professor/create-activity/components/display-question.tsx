"use client";

import type { Response } from "@/services/supabase/actions/professor.types";
import { useQuestionsStore } from "@/stores/create-activity";
import { useRef } from "react";

interface Props {
	index: number;
}

export const DisplayQuestion = ({ index }: Props) => {
	const setQuestion = useQuestionsStore((state) => state.setQuestion);
	const questions = useQuestionsStore((state) => state.questions);

	const selectedQuestion = questions[index];

	const $answerInput = useRef<HTMLInputElement>(null);

	const addResponse = (isCorrect: boolean) => {
		const newResponse: Response = {
			is_correct: isCorrect,
			option: $answerInput.current?.value ?? "",
		};

		setQuestion(index, {
			...selectedQuestion,
			responses: [...(selectedQuestion.responses ?? []), newResponse],
		});

		if ($answerInput.current != null) $answerInput.current.value = "";
		$answerInput.current?.focus();
	};

	return (
		<div className="flex flex-col w-full h-full justify-center items-center gap-2">
			<input
				className="bg-itesus-tertiary py-1 w-full rounded-md text-itesus-secondary font-semibold text-lg px-2 outline-none placeholder:text-itesus-secondary/80"
				placeholder="Escribe tu pregunta"
				value={selectedQuestion?.question ?? ""}
				onChange={(e) => {
					setQuestion(index, {
						...selectedQuestion,
						question: e.target.value,
					});
				}}
			/>

			<div className="flex w-full justify-between gap-2">
				<ButtonInput
					type="radio"
					name="type_question"
					checked={(selectedQuestion?.type ?? "multiple_option") === "open"}
					onChange={() => {
						setQuestion(index, {
							...selectedQuestion,
							type: "open",
						});
					}}
				>
					Abierta
				</ButtonInput>

				<ButtonInput
					type="radio"
					name="type_question"
					checked={
						(selectedQuestion?.type ?? "multiple_option") === "multiple_option"
					}
					onChange={() => {
						setQuestion(index, {
							...selectedQuestion,
							type: "multiple_option",
						});
					}}
				>
					Cerrada
				</ButtonInput>

				<ButtonInput
					type="checkbox"
					checked={selectedQuestion?.accept_file ?? false}
					onChange={() => {
						setQuestion(index, {
							...selectedQuestion,
							accept_file: !selectedQuestion.accept_file,
						});
					}}
				>
					Permitir archivo
				</ButtonInput>
			</div>

			{(selectedQuestion?.type ?? "multiple_option") === "multiple_option" && (
				<div className="bg-itesus-tertiary w-full flex rounded-md px-3 py-1 gap-1">
					<input
						ref={$answerInput}
						placeholder="Escribe tu respuesta"
						className="flex-1 bg-transparent outline-none placeholder:text-itesus-secondary/80 text-itesus-secondary font-semibold text-lg"
					/>

					<button
						onClick={() => addResponse(true)}
						type="button"
						className="bg-itesus-primary text-itesus-tertiary font-semibold px-3 py-1 rounded-md"
					>
						Respuesta correcta
					</button>

					<button
						onClick={() => addResponse(false)}
						type="button"
						className="bg-itesus-primary text-itesus-tertiary font-semibold px-3 py-1 rounded-md"
					>
						+
					</button>
				</div>
			)}

			{/* <div className='bg-itesus-primary text-itesus-tertiary font-semibold px-3 py-1 rounded-md'>
        Indice de la pregunta
      </div> */}
		</div>
	);
};

interface ButtonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type: "radio" | "checkbox";
}

const ButtonInput = ({ children, ...props }: ButtonInputProps) => (
	<label className="flex items-center gap-4 bg-itesus-tertiary py-1 px-5 rounded-md text-itesus-secondary font-semibold text-sm cursor-pointer justify-around leading-none flex-1">
		<span className="w-min  border-itesus-secondary border-b-2">
			{children}
		</span>
		<input {...props} />
	</label>
);

"use client";

import { AnimateContainer } from "./animate-container";
import { AnimateQuesionConatiner } from "./animate-question-container";
import { SelectorType } from "./selector-type";
import { DisplayQuestion } from "./display-question";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFileStore, useQuestionsStore } from "@/stores/create-activity";
import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";

const sections = {
	0: () => "activity-type",
	1: () => "activity-name",
	2: (type: string) => (type === "work" ? "desc" : "questions"),
	3: (type: string) => (type === "work" ? "file" : "deadline"),
	4: () => "deadline",
};

const names = {
	trivia: "trivia",
	exam: "examen",
	questionary: "cuestionario",
	work: "actividad",
};

export const SliderBox = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const {
		type,
		name = "",
		questionIndex = "0",
		currentPosition = "0",
		lastQuestionIndex = "0",
		section,
		desc,
		deadline = new Date().toISOString().slice(0, 19),
	} = Object.fromEntries(searchParams) as {
		type: "trivia" | "exam" | "questionary" | "work";
		name: string;
		questionIndex: string;
		currentPosition: string;
		lastQuestionIndex: string;
		section: string;
		desc: string;
		deadline: string;
	};
	const addFiles = useFileStore((state) => state.addFiles);
	const resetFiles = useFileStore((state) => state.reset);
	const resetQuestions = useQuestionsStore((state) => state.reset);

	const setQuerys = (querys: { [key: string]: string }) => {
		const newSearchParams = new URLSearchParams(searchParams);

		const newQuerys = {
			...querys,
			section: sections[Number(querys.currentPosition)]?.(type) ?? section,
			type: Number(querys.currentPosition) === 0 ? "" : querys.type ?? type,
		};

		for (const [key, value] of Object.entries(newQuerys)) {
			value === ""
				? newSearchParams.delete(key)
				: newSearchParams.set(key, value);
		}

		router.replace(`${pathname}?${newSearchParams.toString()}`);
	};

	const setQueryParam = (key: string, value: string) => {
		const newSearchParams = new URLSearchParams(searchParams);

		value === ""
			? newSearchParams.delete(key)
			: newSearchParams.set(key, value);

		router.replace(`${pathname}?${newSearchParams.toString()}`);
	};

	const setCurrentPosition = (
		cb: (prev: number) => number,
		querys?: { [key: string]: string },
	) => {
		const newPosition = cb(Number(currentPosition)).toString();

		const newQuerys = {
			...querys,
			currentPosition: newPosition,
		};

		setQuerys(newQuerys);
	};

	const setQuestionIndex = (cb: (prev: number) => number) => {
		const newIndex = cb(Number(questionIndex)).toString();

		setQuerys({
			questionIndex: newIndex,
			lastQuestionIndex: questionIndex,
		});
	};

	const handleSlidePosition = (
		direction: "+" | "-",
		setQuerys?: { [key: string]: string },
	) => {
		const subProccess = () => {
			setCurrentPosition(
				(prev) => {
					const newPosition = direction === "+" ? prev + 1 : prev - 1;

					return newPosition;
				},
				{
					...setQuerys,
					lastQuestionIndex: "0",
				},
			);
		};

		if (Number(currentPosition) >= 2 && type !== "work") {
			Number(questionIndex) === 0 && direction === "-"
				? subProccess()
				: setQuestionIndex((prev) => {
						const newIndex = direction === "+" ? prev + 1 : prev - 1;

						return newIndex;
					});

			return;
		}

		subProccess();
	};

	return (
		<section className="flex justify-center items-center flex-1 flex-col overflow-hidden">
			<div className="flex justify-center items-center gap-5 overflow-hidden">
				<button
					type="button"
					disabled={Number(currentPosition) === 0}
					className="bg-[#cdcccb] p-3 rounded-lg"
					onClick={() => {
						handleSlidePosition("-");
					}}
				>
					<IconCaretLeftFilled />
				</button>
				<div className="h-72 aspect-[16/9] relative">
					<AnimateContainer
						currentPosition={Number(currentPosition)}
						position={0}
					>
						<SelectorType
							onSelect={(type) => {
								handleSlidePosition("+", {
									type,
									desc: "",
									questionIndex: "0",
								});

								resetFiles();
								resetQuestions();
							}}
						/>
					</AnimateContainer>

					<AnimateContainer
						currentPosition={Number(currentPosition)}
						position={1}
					>
						<input
							className="text-center w-full h-full bg-transparent border rounded-md text-white"
							placeholder={`Escribe el nombre de tu ${names[type]}`}
							defaultValue={name}
							onChange={(e) => {
								setQueryParam("name", e.target.value);
							}}
						/>
					</AnimateContainer>

					{type === "work" ? (
						<>
							<AnimateContainer
								currentPosition={Number(currentPosition)}
								position={2}
							>
								<input
									className="text-center w-full h-full bg-transparent border rounded-md text-white"
									placeholder="Describe tu actividad"
									defaultValue={desc}
									onChange={(e) => {
										setQueryParam("desc", e.target.value);
									}}
								/>
							</AnimateContainer>
							<AnimateContainer
								currentPosition={Number(currentPosition)}
								position={3}
							>
								<div className="w-full relative h-full flex justify-center items-center bg-transparent border rounded-md text-center">
									<p className="text-itesus-tertiary/20 italic leading-none">
										<span className="border-b border-itesus-tertiary/20">
											Arrastra tu documentación requerida para la actividad
										</span>
										<br />
										<span className="border-b border-itesus-tertiary/20">
											Ej: Archivo .pdf | .doc | .jpg | .ppt | .xls
										</span>
									</p>

									<input
										className=" w-full h-full absolute inset-0 opacity-0 "
										type="file"
										multiple
										draggable
										onChange={(e) => {
											if (e.target.files == null) return;

											const files = Array.from(e.target.files);

											addFiles(files);
										}}
									/>
								</div>
							</AnimateContainer>
						</>
					) : (
						<>
							{Number(currentPosition) === 2 && (
								<AnimateQuesionConatiner
									index={Number(questionIndex)}
									lastIndex={Number(lastQuestionIndex)}
								>
									<DisplayQuestion index={Number(questionIndex)} />
								</AnimateQuesionConatiner>
							)}
						</>
					)}

					<AnimateContainer
						currentPosition={Number(currentPosition)}
						position={type === "work" ? 4 : 3}
					>
						<div className="w-full h-full bg-transparent border rounded-md flex justify-center items-center">
							<input
								className="p-1"
								placeholder="Fecha de entrega"
								type="datetime-local"
								defaultValue={deadline}
								onChange={(e) => {
									setQueryParam("deadline", e.target.value);
								}}
							/>
						</div>
					</AnimateContainer>
				</div>
				<button
					type="button"
					disabled={
						Number(currentPosition) === (type === "work" ? 4 : 3) ||
						type == null
					}
					className="bg-[#cdcccb] p-3 rounded-lg"
					onClick={() => {
						handleSlidePosition("+");
					}}
				>
					<IconCaretRightFilled />
				</button>
			</div>

			{section === "questions" && (
				<button
					type="button"
					className="bg-itesus-primary p-3 rounded-lg text-white"
					onClick={() => {
						setCurrentPosition(() => 3);
					}}
				>
					Finalizar preguntas
				</button>
			)}
		</section>
	);
};

import { Main } from "@/components/utils";
import {
	getActivityById,
	uploadQuestionsWorkActivity,
} from "@/services/supabase/actions/activities";
import { dateFormatter } from "@/utils/formatters";

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

			<form action={uploadQuestionsWorkActivity}>
				<input type="hidden" name="actId" value={act.id} />
				{act.questions.map((q, i) => {
					const hasTwoOrMoreCorrectAnswers =
						q.responses.filter((r) => r.is_correct).length >= 2;

					const inputType = hasTwoOrMoreCorrectAnswers ? "checkbox" : "radio";

					return (
						<div className="p-2 " key={`question-${q.id}`}>
							<h3 className="text-[#cdcccb] text-xl font-semibold">
								{i + 1}- {q.question}
							</h3>
							{q.type === "multiple_option" && (
								<ul className="">
									{q.responses.map((r) => (
										<li key={`response-${r.id}`}>
											<label className="flex items-center gap-2">
												<input
													type={inputType}
													name={`response-question-${q.id}${
														inputType === "checkbox" ? `-${r.id}` : ""
													}`}
													value={r.id}
												/>
												{r.option}
											</label>
										</li>
									))}
								</ul>
							)}

							{q.type === "open" && (
								<textarea
									className="bg-[#34495e] border border-[#34495e] text-white text-md rounded-lg block w-full p-2.5 resize-none h-20"
									name={`response-question-${q.id}`}
								/>
							)}
						</div>
					);
				})}

				<footer>
					<button
						className="w-full bg-gray-500 text-white rounded-lg p-2.5 text-sm font-medium mt-4"
						type="submit"
					>
						Enviar
					</button>
				</footer>
			</form>
		</Main>
	);
}

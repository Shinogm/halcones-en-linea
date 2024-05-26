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
		<Main className="max-w-5xl mx-auto">
			<header className="flex justify-between mb-10">
				<div>
					<h1 className="text-4xl font-bold text-[#cdcccb] text-center">
						{act.name}
					</h1>
					{act.desc != null && <h3>{act.desc}</h3>}
				</div>
				<time className="text-[#cdcccb] text-center">
					Para el: {dateFormatter(new Date(act.deadline), "es-MX")}
				</time>
			</header>

			<form action={uploadQuestionsWorkActivity}>
				<input type="hidden" name="actId" value={act.id} />
				{act.questions.map((q, i) => {
					const hasTwoOrMoreCorrectAnswers =
						q.responses.filter((r) => r.is_correct).length >= 2;

					const inputType = hasTwoOrMoreCorrectAnswers ? "checkbox" : "radio";

					return (
						<div key={`question-${q.id}`}>
							<h3 className="text-[#cdcccb]">
								{i + 1}- {q.question}
							</h3>

							{q.type === "multiple_option" && (
								<ul>
									{q.responses.map((r) => (
										<li key={`response-${r.id}`}>
											<label>
												{r.option}
												<input
													type={inputType}
													name={`response-question-${q.id}${
														inputType === "checkbox" ? `-${r.id}` : ""
													}`}
													value={r.id}
												/>
											</label>
										</li>
									))}
								</ul>
							)}

							{q.type === "open" && (
								<textarea name={`response-question-${q.id}`} />
							)}
						</div>
					);
				})}

				<footer>
					<button type="submit">Enviar</button>
				</footer>
			</form>
		</Main>
	);
}

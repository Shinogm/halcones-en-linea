"use client";

import { uploadQuestionsWorkActivity } from "@/services/supabase/actions/activities";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export const ActivityForm = ({ act }) => {
	const searchParams = useSearchParams();
	const params = useParams();
	const router = useRouter();

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				const form = new FormData(e.currentTarget);

				const pathnameToRevalidate = `/studen/${params.career}/subject/${params.slug}/activities`;

				uploadQuestionsWorkActivity(form, pathnameToRevalidate)
					.catch((err) => {
						console.log(err);
					})
					.finally(() => {
						router.push(`${pathnameToRevalidate}?${searchParams.toString()}`);
					});
			}}
		>
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
	);
};

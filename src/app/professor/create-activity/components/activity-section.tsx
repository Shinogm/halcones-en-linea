"use client";
import { H2, H3, H4, ShyScrollbar } from "@/components/utils";
import type { Response } from "@/services/supabase/actions/professor.types";
import { useFileStore, useQuestionsStore } from "@/stores/create-activity";
import { dateTimeFormatter } from "@/utils/formatters";
import { v4 } from "@/utils/uuid";
import {
	IconFileSpreadsheet,
	IconFileText,
	IconFileTypePdf,
	IconFileUnknown,
	IconPhoto,
	IconPresentation,
	IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ICONS = {
	pdf: () => <IconFileTypePdf size={20} />,
	document: () => <IconFileText size={20} />,
	presentation: () => <IconPresentation size={20} />,
	sheet: () => <IconFileSpreadsheet size={20} />,
	image: () => <IconPhoto size={20} />,
	default: () => <IconFileUnknown size={20} />,
};

export function ActivitySection() {
	const searchParams = useSearchParams();
	const questions = useQuestionsStore((state) => state.questions);
	const files = useFileStore((state) => state.files);
	const deleteFile = useFileStore((state) => state.removeFile);
	const {
		section,
		name,
		questionIndex = "0",
		desc,
		deadline = new Date().toISOString(),
		type,
	} = Object.fromEntries(searchParams);
	const deleteResponse = useQuestionsStore((state) => state.removeResponse);

	return (
		<section
			style={ShyScrollbar}
			className="text-itesus-tertiary flex flex-col items-center w-full h-[25%] overflow-y-auto"
		>
			{["activity-name", "desc", "file", "deadline"].includes(section) && (
				<div className="w-full max-w-2xl">
					<H3>{name}</H3>
					<p>{desc}</p>

					<time>Entrega: {dateTimeFormatter(new Date(deadline), "es-MX")}</time>

					{type === "work" && (
						<section>
							<H4>Documentacion</H4>
							<ul className="list-decimal">
								{files.map((file, i) => {
									const url = URL.createObjectURL(file);
									const type = file.type;
									const Icon: () => JSX.Element =
										ICONS[type.split("/")[0]] ??
										ICONS[type.split(".")[0]] ??
										ICONS[type.split(".").pop()?.split("/").pop() ?? ""] ??
										ICONS.default;

									return (
										<li key={v4()}>
											<figure>
												<div className="flex gap-3">
													<Link
														target="_blank"
														href={url}
														className="flex gap-1 items-center"
													>
														<Icon />
														{file.name}
													</Link>
													<button type="button" onClick={() => deleteFile(i)}>
														<IconTrash size={20} />
													</button>
												</div>

												{type.startsWith("image") && (
													<img src={url} alt={file.name} className="w-10" />
												)}
											</figure>
										</li>
									);
								})}
							</ul>
						</section>
					)}
				</div>
			)}

			{section === "questions" && (
				<>
					<H2>{questions[questionIndex]?.question}</H2>

					<ul className="list-upper-alpha">
						{questions[questionIndex]?.responses?.map(
							(response: Response, i: number) => (
								<li key={v4()}>
									<span
										className={`${response.is_correct ? "text-green-400" : ""}`}
									>
										{response.option}
										<button
											type="button"
											onClick={() => deleteResponse(Number(questionIndex), i)}
										>
											<IconTrash size={20} />
										</button>
									</span>
								</li>
							),
						)}
					</ul>
				</>
			)}
		</section>
	);
}

import { H1, Main, RedirectPlus } from "@/components/utils";
import Link from "next/link";

export default function Documentation({ params, searchParams }) {
	return (
		<Main>
			<header className="flex items-center gap-2">
				<H1>Temas y Documentacion</H1>
				<RedirectPlus
					href={`/professor/career/${params.slug}/${params.subjectslug}/documentation/new-theme?${new URLSearchParams(searchParams).toString()}`}
					className="rounded-full"
				/>
			</header>

			<section className="grid grid-cols-3 gap-10 mt-6">
				<Link href={"#"}>
					<article className="flex flex-col gap-5 p-5 bg-[#cdcbcc] rounded-xl">
						<h3 className="text-[#1e244b] font-bold text-lg">
							Fundamentos de la Psicología Social
						</h3>

						<p className="text-[#1e244b] font-medium text-lg h-32 text-ellipsis overflow-hidden">
							Este tema explora cómo los pensamientos, sentimientos y
							comportamientos de las personas son influenciados por la
							presencia, real o imaginada, de otros. Incluye el estudio de la
							conformidad, la obediencia, la disonancia cognitiva, la atracción
							interpersonal, los estereotipos, y los fenómenos de grupo como la
							influencia social y el efecto espectador.
						</p>
					</article>
				</Link>
			</section>
		</Main>
	);
}

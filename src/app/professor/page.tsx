import { H1, Main } from "@/components/utils";
import { getMyReducedCareers } from "@/services/supabase/actions/professors";
import { v4 } from "@/utils/uuid";
import Link from "next/link";
import { DistroNav } from "../layouts/distro-nav";
import { ProfileSettingsButton } from "@/components/profile-settings/profile-settings-button";
import { getUser } from "@/services/supabase/actions/auth";
import { redirect } from "next/navigation";

export default async function ProfessorPage() {
	const careers = await getMyReducedCareers();
	const user = await getUser();

	if (careers.length === 1) {
		redirect(`/professor/career/${careers[0]?.slug ?? ""}`);
	}

	return (
		<DistroNav
			navbar={
				<nav className="bg-itesus-tertiary p-2 flex justify-between items-center">
					<img
						className="aspect-[24/9] w-28"
						src="/img/logo-itesus.png"
						alt="Logo de itesus"
					/>

					<ProfileSettingsButton user={user} />
				</nav>
			}
		>
			<Main className="w-full flex flex-col max-w-6xl mx-auto px-4">
				<header className="border-b pb-4 px-14 mb-10">
					<H1 className="text-[#cdcccb] border-b w-min">Bienvenido</H1>

					<span className="text-white font-bold text-lg">
						Selecciona la carrera en la que desees ingresar
					</span>
				</header>

				<section className="flex flex-col items-center gap-4 mt-4 w-full px-80">
					{careers.map((career) => (
						<Link
							href={`/professor/career/${career?.slug ?? ""}`}
							key={v4()}
							className="group gap-4 transition-colors bg-[#cdcccb] rounded-lg px-4 w-full py-1 hover:bg-[#b9b9b8]"
						>
							<span className=" font-bold border-b transition-colors border-b-[#212953] text-[#212953] text-xl group-hover:text-[#020305]">
								{career?.name}
							</span>
						</Link>
					))}
				</section>
			</Main>
		</DistroNav>
	);
}

import React from "react";
import { StatsCard } from "./stats-card";
import { createClient } from "@/services/supabase/actions";
import { USER_TYPES } from "@/services/supabase/functions/types";

export const StadisticsSection = async () => {
	const supabase = await createClient();

	const { data: students } = await supabase
		.from("user_data")
		.select("id")
		.eq("role", USER_TYPES.STUDENT);
	const studentsCount = students?.length ?? 0;

	const { data: teachers } = await supabase
		.from("user_data")
		.select("id")
		.eq("role", USER_TYPES.PROFESSOR);
	const teachersCount = teachers?.length ?? 0;

	const { data: subjects } = await supabase.from("subjects").select("*");
	const subjectsCount = subjects?.length ?? 0;

	const { data: groups } = await supabase.from("groups").select("*");
	const groupsCount = groups?.length ?? 0;

	return (
		<>
			<header className="space-y-2">
				<h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
					ITESUS - Intituo Tecnológico Superior de Sinaloa
				</h2>
			</header>
			<section className="w-full py-12 md:py-24 lg:py-32 ">
				<div className="container grid gap-6 px-4 md:px-6 bg-white rounded-xl">
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<StatsCard title="Estudiantes" value={studentsCount} />
						<StatsCard title="Materias" value={subjectsCount} />
						<StatsCard title="Grupos" value={groupsCount} />
						<StatsCard title="Profesores" value={teachersCount} />
					</div>
				</div>
			</section>
		</>
	);
};

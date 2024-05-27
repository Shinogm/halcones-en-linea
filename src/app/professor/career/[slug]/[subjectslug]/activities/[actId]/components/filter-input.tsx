"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const FilterInput = () => {
	const [filter, setFilter] = useState("all");
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	return (
		<select
			className="bg-transparent"
			value={filter}
			onChange={(e) => {
				setFilter(e.target.value);

				const newSearchParams = new URLSearchParams(searchParams);

				newSearchParams.set("filterIsSender", e.target.value);

				router.replace(`${pathname}?${newSearchParams.toString()}`);
			}}
		>
			<option
				className="bg-white hover:bg-gray-500 text-black hover:text-white"
				value={"all"}
			>
				Todos
			</option>
			<option
				className="bg-white hover:bg-gray-500 text-black hover:text-white"
				value={"send"}
			>
				Entregados
			</option>
			<option
				className="bg-white hover:bg-gray-500 text-black hover:text-white"
				value={"notSend"}
			>
				No entregados
			</option>
		</select>
	);
};

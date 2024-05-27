"use client";

import { califyStudent } from "@/services/supabase/actions/professors";
import debounce from "just-debounce-it";
import { useState } from "react";
import { z } from "zod";

type Props = {
	calification?: number;
	actId: number;
	studentId: string;
};

export const CalifyInput = ({ calification, actId, studentId }: Props) => {
	const [calificationValue, setCalificationValue] = useState(calification);

	const califyStudentDebount = debounce((value: number) => {
		califyStudent({
			actId: actId,
			calification: value,
			studentId: studentId,
		}).catch((err) => {
			console.log(err);
		});
	}, 300);

	return (
		<input
			className="bg-itesus-tertiary rounded-sm px-2 py-1 w-[15%] text-itesus-primary"
			defaultValue={calification}
			value={calificationValue}
			type="number"
			onChange={(e) => {
				const value = z
					.number({
						coerce: true,
					})
					.parse(e.target.value);

				if (value > 100) return;

				if (value < 0) return;

				califyStudentDebount(value);
				setCalificationValue(value);
			}}
		/>
	);
};

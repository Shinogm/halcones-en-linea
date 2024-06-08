"use client";

import { uploadWorkActivity } from "@/services/supabase/actions/activities";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
	activityId: number;
	open?: boolean;
}

const className = {
	itesusGradient:
		"bg-gradient-to-r from-itesus-primary to-itesus-secondary text-white",
};

export const UploadFileModal = ({ activityId }: Props) => {
	const $fileInput = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	return (
		<dialog
			open
			className="bg-black/30 w-screen h-screen top-0 flex justify-center items-center"
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();

					const newSearchParams = new URLSearchParams(searchParams);

					newSearchParams.delete("upload");
					newSearchParams.delete("activityId");

					router.replace(`${pathname}?${newSearchParams.toString()}`);

					const message =
						new FormData(e.currentTarget).get("message")?.toString() ?? "";

					const file = $fileInput.current?.files?.[0];

					if (file == null) {
						return;
					}

					file
						.arrayBuffer()
						.then((arrayBuffer) => {
							const base64 = Buffer.from(arrayBuffer).toString("base64");

							const myPromise = uploadWorkActivity(
								activityId,
								{
									name: fileName ?? "",
									bytes: base64,
								},
								message,
							)
								.catch((err) => {
									console.error("Error uploading file:", err);
								})
								.finally(() => {
									setFileName(null);
									const newSearchParams = new URLSearchParams(searchParams);

									newSearchParams.delete("upload");
									newSearchParams.delete("activityId");

									router.replace(`${pathname}?${newSearchParams.toString()}`);
								});

							toast.promise(myPromise, {
								loading: "Subiendo archivo...",
								success: "Archivo subido",
								error: "Error al subir archivo",
							});
						})
						.catch((err) => {
							console.error("Error getting file array buffer:", err);
						});
				}}
				className="bg-white py-5 rounded-md min-w-[30rem]"
			>
				<input
					ref={$fileInput}
					type="file"
					className="hidden"
					onChange={(e) => {
						const file = e.target.files?.[0];

						if (file != null) {
							setFileName(file.name);
						}
					}}
				/>

				<button
					onClick={() => {
						$fileInput.current?.click();
					}}
					type="button"
					className={`${className.itesusGradient} px-5 font-bold w-full text-lg mb-2`}
				>
					{fileName ?? "Seleccionar archivo"}
				</button>

				<label className="px-5 flex flex-col mb-2">
					<span className="font-semibold text-base">Mensaje:</span>
					<textarea
						name="message"
						placeholder="Escribe un mensaje"
						className="border p-2 min-h-20 max-h-96 bg-gray-300 text-black"
					/>
				</label>

				<footer className="flex justify-center px-5 items-center">
					<button
						type="submit"
						className={`${className.itesusGradient} px-7 font-bold rounded-md text-lg`}
					>
						Enviar
					</button>
				</footer>
			</form>
		</dialog>
	);
};

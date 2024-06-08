"use client";

import { IconFileUpload } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
	activityId: number;
}

export const UploadFileButton = ({ activityId }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<button
			type="button"
			onClick={() => {
				const newSearchParams = new URLSearchParams(searchParams);

				newSearchParams.set("upload", "true");
				newSearchParams.set("activityId", activityId.toString());

				router.replace(`${pathname}?${newSearchParams.toString()}`);
			}}
			className="bg-[#808080] px-3 py-1 flex items-center justify-center rounded-r-lg"
		>
			<IconFileUpload size={24} />
		</button>
	);
};

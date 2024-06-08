import { v4 } from "@/utils/uuid";
import styles from "../../../../../../../styles/custom.module.css";

function MyMessage({ msg }) {
	return (
		<div
			className={`${styles.maestro} bg-green-200 p-2 rounded-xl justify-end flex self-end max-w-96 text-black`}
		>
			{msg}
		</div>
	);
}

function OtherMessage({ msg, senderName }) {
	return (
		<div
			className={`${styles.alumno} bg-white p-2 rounded-xl max-w-96 flex flex-col justify-start self-start text-black`}
		>
			<div>{msg}</div>

			<footer>{senderName}</footer>
		</div>
	);
}

type Props = {
	messages: Array<{
		id: number;
		message: string;
		owner: string;
		senderName: string;
		isMyMessage: boolean;
	}>;
};

export const MessageBox = ({ messages }: Props) => {
	return (
		<section className="flex flex-col  h-full items-center px-10 overflow-y-auto">
			{messages.map((m) => {
				return m.isMyMessage ? (
					<MyMessage key={v4()} msg={m.message} />
				) : (
					<OtherMessage key={v4()} msg={m.message} senderName={m.senderName} />
				);
			})}
		</section>
	);
};

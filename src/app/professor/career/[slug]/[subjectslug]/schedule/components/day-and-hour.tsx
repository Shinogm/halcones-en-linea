type Props = {
	date: Date;
	toDate: Date;
};

const DAYS = ["Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab.", "Dom."];

export const DayAndHour = ({ date, toDate }: Props) => {
	return (
		<article className="flex flex-row gap-2 p-20 text-itesus-primary font-bold text-xl">
			<div className=" w-14 h-14 bg-[#cecbcb] rounded-xl text-center flex flex-col justify-center">
				{DAYS[date.getDay()]}
			</div>
			<div className="bg-[#cecbcb] rounded-xl flex items-center px-5 w-72 gap-2">
				<span>
					{date.toLocaleTimeString("es-MX", {
						hour: "numeric",
						minute: "numeric",
					})}
				</span>
				<span>-</span>
				<span>
					{toDate.toLocaleTimeString("es-MX", {
						hour: "numeric",
						minute: "numeric",
					})}
				</span>
			</div>
		</article>
	);
};

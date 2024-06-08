import { ShyScrollbar } from "./inline-styles";

export const Main = ({
	children,
	className,
}: React.HTMLAttributes<HTMLDivElement>) => (
	<main
		className={`animate-fade-in animate-duration-150 flex flex-col h-full overflow-y-auto ${className ?? ""}`}
		style={ShyScrollbar}
	>
		{children}
	</main>
);

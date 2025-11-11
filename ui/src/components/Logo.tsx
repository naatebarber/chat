import React from "react";
import * as icons from "lucide-react";
import { cn } from "../util";
import { useLocation } from "react-router-dom";

export default (props: { onClick?: () => void; className?: string }) => {
	const { pathname } = useLocation();

	return (
		<div
			className={cn(
				"work flex items-center space-x-2",
				!!props?.onClick && "cursor-pointer",
				props?.className,
			)}
			onClick={props?.onClick}
		>
			<icons.BotMessageSquare className="h-5 w-5" />
			<div>
				Chat <span className="text-secondary-foreground">{pathname}</span>
			</div>
		</div>
	);
};

import React from "react";
import * as icons from "lucide-react";
import { cn } from "../util";

export default (props: { className?: string }) => {
	return (
		<div className={cn("work flex items-center space-x-2", props?.className)}>
			<icons.BotMessageSquare className="h-5 w-5" />
			<div>Chat</div>
		</div>
	);
};

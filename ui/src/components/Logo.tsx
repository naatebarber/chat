import React from "react";
import { cn } from "../util";

export default (props: { className?: string }) => {
	return (
		<div className={cn("work", props?.className)}>n • t • p • l • g y</div>
	);
};

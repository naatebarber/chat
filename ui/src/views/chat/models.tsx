import React from "react";
import { cn } from "~/src/util";

const Models: React.FC<{
	models: string[];
	selectedModel: string;
	onSelect: (model: string) => void;
}> = ({ models, selectedModel, onSelect }) => {
	return (
		<div
			className={cn(
				"p-6 flex flex-row space-x-2 items-center overflow-x-scroll no-scrollbar",
			)}
		>
			{models.map((m) => (
				<div
					key={m}
					className={cn(
						"shrink-0 px-2 py-1 rounded-sm border border-accent hover:bg-accent cursor-pointer transition-colors text-xs text-nowrap",
						selectedModel === m && "bg-accent",
					)}
					onClick={() => onSelect(m)}
				>
					{m}
				</div>
			))}
		</div>
	);
};

export default Models;

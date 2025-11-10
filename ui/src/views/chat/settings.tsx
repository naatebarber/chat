import React from "react";
import { Drawer } from "vaul";
import * as icons from "lucide-react";
import { cn } from "~/src/util";

const ModelSettings: React.FC<{
	models: string[];
	selectedModel: string;
	onSelectModel: (model: string) => void;
}> = ({ models, selectedModel, onSelectModel }) => {
	return (
		<div className="flex gap-2 flex-wrap">
			{models.map((m) => (
				<div
					className={cn(
						"border border-secondary px-2 py-1 rounded-md cursor-pointer",
						selectedModel !== m && "hover:border-accent",
						selectedModel === m && "border-accent",
					)}
					onClick={() => onSelectModel(m)}
				>
					{m}
				</div>
			))}
		</div>
	);
};

const ChatSettings: React.FC<{
	show: boolean;
	onHide: () => void;
	models: string[];
	selectedModel: string;
	onSelectModel: (model: string) => void;
}> = ({ show, onHide, models, selectedModel, onSelectModel }) => {
	return (
		<Drawer.Root open={show} onOpenChange={(open) => !open && onHide()}>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40" />
				<Drawer.Content className="bg-background h-fit fixed bottom-0 left-0 right-0 outline-none rounded-lg p-4 flex flex-col space-y-4 lora">
					<Drawer.Handle />
					<Drawer.Title className="flex flex-row justify-center items-center space-x-2 text-lg">
						<icons.Cog className="h-4 w-4 mr-2" />
						<div>Settings</div>
					</Drawer.Title>

					<div className="flex flex-col space-y-4">
						<div className="flex items-center space-x-2 p-3 border-b border-secondary">
							<icons.Brain className="h-4 w-4" />
							<div>Model</div>
						</div>
						<ModelSettings
							selectedModel={selectedModel}
							models={models}
							onSelectModel={onSelectModel}
						/>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};

export default ChatSettings;

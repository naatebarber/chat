import React from "react";
import { Drawer } from "vaul";
import * as icons from "lucide-react";
import { cn } from "~/src/util";

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
				<Drawer.Content className="bg-background-secondary h-fit fixed bottom-0 left-0 right-0 outline-none rounded-lg p-4 flex flex-col space-y-4 lora">
					<Drawer.Handle />
					<Drawer.Title className="flex flex-row justify-center items-center space-x-2 text-lg">
						<icons.Brain className="h-4 w-4 mr-2" />
						<div>Models</div>
					</Drawer.Title>

					<div className="flex items-center justify-center">
						<div className="flex flex-col space-y-1 border-t border-accent p-4 transition-colors max-h-[30vh] overflow-y-scroll no-scrollbar relative">
							{models.map((m) => (
								<div
									key={`model-${m}`}
									className="flex flex-row items-center space-x-2 px-2 py-1 rounded-sm hover:bg-accent hover:text-text-accent cursor-pointer"
									onClick={() => onSelectModel(m)}
								>
									<div>{m}</div>
									<icons.Check
										className={cn(
											"h-4 w-4",
											m !== selectedModel && "text-transparent",
										)}
									/>
								</div>
							))}
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};

export default ChatSettings;

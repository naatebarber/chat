import React, { useState } from "react";
import { cn } from "~/src/util";

const ChatBox: React.FC<{
	defaultValue?: string;
	onMessage?: (chat: string) => void;
	onChange?: (chat: string) => void;
	modelName?: string;
	className: string;
}> = ({ defaultValue, onMessage, onChange, modelName, className }) => {
	const [message, setMessage] = useState<string>(defaultValue ?? "");

	return (
		<div className={cn(className)}>
			<textarea
				value={message}
				className={cn(
					"rounded-md outline-none resize-none w-full p-3 shadow-sm",
					"backdrop-blur-md bg-background-secondary/60",
				)}
				placeholder={`Chatting with @${modelName}`}
				spellCheck={false}
				onChange={(e) => {
					setMessage(e.target.value);
					onChange?.(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						onMessage?.(message);
						setMessage("");
						onChange?.("");
					}
				}}
			/>
		</div>
	);
};

export default ChatBox;

import React, { useState } from "react";
import { cn } from "../util";

const ChatBox: React.FC<{
	defaultValue?: string;
	onMessage?: (chat: string) => void;
	className: string;
}> = ({ defaultValue, onMessage, className }) => {
	const [message, setMessage] = useState<string>(defaultValue ?? "");

	return (
		<div className={cn(className)}>
			<textarea
				value={message}
				className={cn(
					"border border-gray-800 rounded-md outline-none resize-none w-full p-2",
					"backdrop-blur-md bg-black/70",
				)}
				placeholder="input"
				onChange={(e) => {
					setMessage(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						onMessage?.(message);
						setMessage("");
					}
				}}
			/>
		</div>
	);
};

export default ChatBox;

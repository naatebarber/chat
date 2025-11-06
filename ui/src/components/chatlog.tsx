import React from "react";
import { Message } from "../api/api";
import { cn } from "../util";

const ChatMessage: React.FC<{
	message: Message;
}> = ({ message }) => {
	return (
		<div
			className={cn(
				"flex flex-row",
				message.role === "agent" ? "justify-start" : "justify-end",
			)}
		>
			<div
				className={cn(
					"rounded-md p-2",
					message.role === "agent"
						? "rounded-bl-none bg-chat-agent"
						: "rounded-br-none bg-chat-user",
				)}
			>
				{message.message}
			</div>
		</div>
	);
};

const ChatLog: React.FC<{
	chat: Message[];
	className?: string;
}> = ({ chat, className }) => {
	return (
		<div className={cn("flex flex-col space-y-2 p-6 pb-[50vh]", className)}>
			{chat.map((m) => (
				<ChatMessage message={m} />
			))}
		</div>
	);
};

export default ChatLog;

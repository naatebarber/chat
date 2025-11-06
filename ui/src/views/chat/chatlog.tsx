import React from "react";
import { Message } from "~/src/api/types";
import { cn } from "~/src/util";

const ChatMessage: React.FC<{
	message: Message;
}> = ({ message }) => {
	return (
		<div
			className={cn(
				"flex flex-row",
				message.role === "assistant" ? "justify-start" : "justify-end",
			)}
		>
			<div
				className={cn(
					"rounded-md p-2",
					message.role === "assistant"
						? "rounded-bl-none bg-chat-agent"
						: "rounded-br-none bg-chat-user",
				)}
			>
				{message.content}
			</div>
		</div>
	);
};

const ChatLog: React.FC<{
	chat: Message[];
	streaming: string;
	className?: string;
}> = ({ chat, streaming, className }) => {
	return (
		<div
			className={cn(
				"grow flex flex-col space-y-2 p-6 overflow-y-scroll pb-[20vh]",
				className,
			)}
		>
			{chat.map((m, i) => (
				<ChatMessage message={m} key={`message-${i}`} />
			))}

			{streaming && (
				<ChatMessage
					message={{
						role: "assistant",
						content: streaming,
					}}
					key={"incoming"}
				/>
			)}
		</div>
	);
};

export default ChatLog;

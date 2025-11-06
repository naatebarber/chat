import React, { useEffect, useRef } from "react";
import { Message } from "~/src/api/types";
import { cn } from "~/src/util";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
					"rounded-md p-3 sm:max-w-[60%]",
					message.role === "assistant"
						? "rounded-bl-none bg-chat-agent"
						: "rounded-br-none bg-chat-user",
				)}
			>
				<Markdown
					remarkPlugins={[remarkGfm]}
					components={{
						code({ node, inlist, className, children, ...props }) {
							const isInline =
								node?.position?.start.line === node?.position?.end.line;

							if (isInline) {
								return (
									<code className={`${className || ""}`} {...props}>
										{children}
									</code>
								);
							}

							return (
								<pre className="whitespace-pre-wrap break-words rounded-sm text-text-code bg-background-code p-2 my-3 text-sm">
									<code className={className}>{children}</code>
								</pre>
							);
						},
						h1: ({ children }) => (
							<h1 className="text-xl font-bold my-2">{children}</h1>
						),
						h2: ({ children }) => (
							<h2 className="text-lg font-bold my-1">{children}</h2>
						),
						h3: ({ children }) => <h3 className="text-lg my-1">{children}</h3>,
					}}
				>
					{message.content}
				</Markdown>
			</div>
		</div>
	);
};

const ChatLog: React.FC<{
	chat: Message[];
	streaming: string;
	className?: string;
}> = ({ chat, streaming, className }) => {
	const lowRef = useRef<HTMLDivElement>(undefined);

	useEffect(() => {
		lowRef?.current?.scrollIntoView({ behavior: "smooth" });
	}, [streaming]);

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

			{streaming &&
				chat.length > 0 &&
				streaming !== chat[chat.length - 1].content && (
					<ChatMessage
						message={{
							role: "assistant",
							content: streaming,
						}}
						key={"incoming"}
					/>
				)}

			<div ref={lowRef}></div>
		</div>
	);
};

export default ChatLog;

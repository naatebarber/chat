import React, { useContext, useState } from "react";
import { Message } from "~/src/api/api";
import { cn } from "~/src/util";
import { toast } from "sonner";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as icons from "lucide-react";
import { ApiContext } from "~/src/main";

const ChatMessage: React.FC<{
	message: Partial<Message>;
}> = ({ message }) => {
	const api = useContext(ApiContext);
	const [savedMessage, setSavedMessage] = useState<boolean>(false);

	const saveMessage = (message: Partial<Message>) => {
		toast.promise(
			() =>
				api.documents.createDocument(message.content, {
					source: "message",
					role: message.role,
				}),
			{
				success: "Saved message to documents",
				error: "Failed to save message...",
			},
		);
	};

	return (
		<div
			className={cn(
				"flex flex-row",
				message.role === "assistant" ? "justify-start" : "justify-end",
			)}
		>
			<div
				className={cn(
					"rounded-md p-3",
					message.role === "user" &&
						"rounded-br-none bg-chat-user sm:max-w-[60%]",
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
								<div className="flex">
									<pre className="whitespace-pre-wrap break-words rounded-sm text-code-foreground bg-code p-4 my-3 text-sm">
										<code className={className}>{children}</code>
									</pre>
								</div>
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

				{message.role === "assistant" && (
					<div className="flex items-center space-x-2 pt-2">
						{!savedMessage ? (
							<icons.Bookmark
								className={cn(
									"h-4 w-4 text-secondary-foreground  transition-colors cursor-pointer hover:text-accent",
								)}
								onClick={() => {
									if (!savedMessage) {
										saveMessage(message);
										setSavedMessage(true);
									}
								}}
							/>
						) : (
							<icons.Check
								className={cn(
									"h-4 w-4 text-secondary-foreground  transition-colors",
								)}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatMessage;

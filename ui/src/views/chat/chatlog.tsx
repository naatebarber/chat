import React, { useEffect, useRef, useState } from "react";
import { Message } from "~/src/api/api";
import { cn } from "~/src/util";
import ChatMessage from "./chatmessage";

const ChatLog: React.FC<{
	chat: Message[];
	streaming: string;
	className?: string;
}> = ({ chat, streaming, className }) => {
	const lowRef = useRef<HTMLDivElement>(undefined);
	const [userScrolled, setUserScrolled] = useState<boolean>(false);
	const [init, setInit] = useState<boolean>(true);

	useEffect(() => {
		if (!!streaming && !userScrolled)
			lowRef?.current?.scrollIntoView({ behavior: "instant" });
	}, [streaming]);

	useEffect(() => {
		setUserScrolled(false);
	}, [!!streaming]);

	useEffect(() => {
		if (chat.length > 0 && init) {
			lowRef?.current.scrollIntoView({ behavior: "instant" });
			setInit(false);
		}
	}, [chat]);

	return (
		<div
			className={cn(
				"grow flex flex-col space-y-6 p-6 overflow-y-scroll no-scrollbar pb-[20vh]",
				className,
			)}
			onWheel={() => {
				setUserScrolled(true);
			}}
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

import React, { useContext, useEffect, useRef, useState } from "react";
import ChatBox from "./chatbox";
import { Message } from "~/src/api/api";
import ChatLog from "./chatlog";
import { ApiContext } from "~/src/main";
import Models from "./models";
import { streamResponse } from "~/src/util";

const Chat = () => {
	const api = useContext(ApiContext);

	const [models, setModels] = useState<string[]>([]);
	const [selectedModel, setSelectedModel] = useState<string>();
	const [messages, setMessages] = useState<Partial<Message>[]>([]);

	const incoming = useRef<string>("");
	const [streaming, setStreaming] = useState<string>(undefined);

	const getModels = () => {
		api.completions
			.models()
			.then((data) => data.json())
			.then((data) => {
				setSelectedModel(data[0]);
				setModels(data);
			})
			.catch(console.log);
	};

	useEffect(() => {
		api && getModels();
	}, [api]);

	return (
		<>
			<div className="h-[100%] w-[100%] flex flex-col relative pb-8">
				<Models
					className="shrink-0"
					models={models}
					selectedModel={selectedModel}
					onSelect={setSelectedModel}
				/>
				<ChatLog chat={messages} streaming={streaming} />
			</div>

			<div className="w-full p-6 fixed flex items-center bottom-0">
				<ChatBox
					className="grow"
					onMessage={async (message) => {
						if (message === "@clear") {
							setMessages([]);
							return;
						}

						let tmp = [...messages];
						tmp.push({ role: "user", content: message });
						setMessages(tmp);

						const resp = api.completions.chat(selectedModel, tmp as any);
						let response = await streamResponse(resp, (message) => {
							incoming.current = message;
							setStreaming(message);
						});
						tmp.push({ role: "assistant", content: response });

						setTimeout(() => {
							setStreaming(undefined);
							setMessages(tmp);
						}, 300);
					}}
				/>
			</div>
		</>
	);
};

export default Chat;

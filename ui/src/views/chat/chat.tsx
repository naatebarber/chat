import React, { useContext, useEffect, useRef, useState } from "react";
import ChatBox from "./chatbox";
import { Message } from "~/src/api/api";
import ChatLog from "./chatlog";
import { ApiContext, GlobalStateContext } from "~/src/main";
import { streamResponse } from "~/src/util";
import ChatSettings from "./settings";
import * as icons from "lucide-react";

const Chat = () => {
	const api = useContext(ApiContext);
	const { global, setGlobal } = useContext(GlobalStateContext);

	const [models, setModels] = useState<string[]>([]);
	const [selectedModel, setSelectedModel] = useState<string>();

	const [pendingMessage, setPendingMessage] = useState<string>();

	const incoming = useRef<string>("");
	const [streaming, setStreaming] = useState<string>(undefined);
	const [abort, setAbort] = useState<AbortController>(undefined);

	const [showModels, setShowModels] = useState<boolean>(false);

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

	const handleStartCompletion = async (userContent: string) => {
		if (userContent === "") {
			return;
		}

		if (userContent === "@clear") {
			setGlobal({ ...global, messages: [] });
			return;
		}

		try {
			let newMessages = [...global.messages];
			let userMessage = { role: "user", content: userContent } as Message;
			newMessages.push(userMessage);
			setGlobal({ ...global, messages: newMessages });

			const controller = new AbortController();
			const signal = controller.signal;
			setAbort(controller);

			const resp = api.completions.chat(selectedModel, newMessages, signal);
			let response = await streamResponse(resp, (message) => {
				incoming.current = message;
				setStreaming(message);
			});
			newMessages.push({ role: "assistant", content: response });

			setTimeout(() => {
				setStreaming(undefined);
				setAbort(undefined);
				setGlobal({ ...global, messages: newMessages });
			}, 300);
		} catch (err) {
			setStreaming(undefined);
			setAbort(undefined);
		}
	};

	useEffect(() => {
		api && getModels();
	}, [api]);

	return (
		<>
			<div className="h-[100%] w-[100%] flex flex-col relative pb-8">
				<ChatLog chat={global.messages} streaming={streaming} />
			</div>

			<div className="w-full p-6 fixed flex items-center bottom-0 space-x-4">
				<ChatBox
					className="grow"
					modelName={selectedModel}
					onChange={setPendingMessage}
					onMessage={handleStartCompletion}
				/>

				{abort ? (
					<icons.StopCircle
						className="h-5 w-5 hover:text-accent cursor-pointer transition-colors"
						onClick={() => abort.abort()}
					/>
				) : (
					<icons.Send
						className="h-5 w-5 hover:text-accent cursor-pointer transition-colors"
						onClick={() => handleStartCompletion(pendingMessage)}
					/>
				)}

				<icons.Cog
					className="h-5 w-5 hover:text-accent cursor-pointer transition-colors"
					onClick={() => setShowModels(true)}
				/>
			</div>

			<ChatSettings
				show={showModels}
				onHide={() => setShowModels(false)}
				models={models}
				selectedModel={selectedModel}
				onSelectModel={setSelectedModel}
			/>
		</>
	);
};

export default Chat;

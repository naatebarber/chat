import React, {
	createContext,
	Dispatch,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import ChatBox from "./chatbox";
import { Message } from "~/src/api/api";
import ChatLog from "./chatlog";
import { ApiContext } from "~/src/main";
import { streamResponse } from "~/src/util";
import ChatSettings from "./settings";
import * as icons from "lucide-react";

export interface ChatState {
	models: string[];
	selectedModel?: string;
}

export const ChatContext = createContext<{
	state: ChatState;
	setState: Dispatch<React.SetStateAction<ChatState>>;
}>(undefined);

const Chat = () => {
	const api = useContext(ApiContext);

	const [models, setModels] = useState<string[]>([]);
	const [selectedModel, setSelectedModel] = useState<string>();

	const [pendingMessage, setPendingMessage] = useState<string>();
	const [messages, setMessages] = useState<Partial<Message>[]>([]);

	const incoming = useRef<string>("");
	const [streaming, setStreaming] = useState<string>(undefined);

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

	const handleStartCompletion = async (message: string) => {
		if (message === "") {
			return;
		}

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
	};

	const handleStopCompletion = () => {};

	useEffect(() => {
		api && getModels();
	}, [api]);

	return (
		<>
			<div className="h-[100%] w-[100%] flex flex-col relative pb-8">
				<ChatLog chat={messages} streaming={streaming} />
			</div>

			<div className="w-full p-6 fixed flex items-center bottom-0 space-x-4">
				<ChatBox
					className="grow"
					modelName={selectedModel}
					onChange={setPendingMessage}
					onMessage={handleStartCompletion}
				/>

				{streaming ? (
					<icons.StopCircle
						className="h-5 w-5 hover:text-accent cursor-pointer transition-colors"
						onClick={handleStopCompletion}
					/>
				) : (
					<icons.Send
						className="h-5 w-5 hover:text-accent cursor-pointer transition-colors"
						onClick={() => handleStartCompletion(pendingMessage)}
					/>
				)}

				<icons.BrainCog
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

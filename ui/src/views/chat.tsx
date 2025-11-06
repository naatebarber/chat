import React, { useState } from "react";
import ChatBox from "../components/chatbox";
import { Message } from "../api/api";
import ChatLog from "../components/chatlog";

let test = [
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
	{ role: "user", message: "ping" },
	{ role: "agent", message: "pong" },
];

const Chat = () => {
	const [chat, setChat] = useState<Message[]>(test as any);

	return (
		<div>
			<div className="h-full w-full flex flex-col relative overflow-y-scroll">
				<ChatLog chat={chat} />
			</div>

			<div className="w-full p-6 fixed flex items-center bottom-0">
				<ChatBox
					className="grow"
					onMessage={(message) => {
						if (message.startsWith("agent:")) {
							setChat([...chat, { role: "agent", message }]);
							return;
						}
						setChat([...chat, { role: "user", message }]);
					}}
				/>
			</div>
		</div>
	);
};

export default Chat;

import React, { createContext, useState, Dispatch } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layout";
import Chat from "./views/chat/chat";
import API, { Message } from "./api/api";
import Login from "./views/login/login";
import { cn } from "./util";
import { useTheme } from "./hooks/useTheme";
import Documents from "./views/documents/documents";
import { Toaster } from "./components/sonner";

const api = new API();
export const ApiContext = createContext<API>(undefined);

interface GlobalState {
	messages: Message[];
}

export const GlobalStateContext = createContext<{
	global: GlobalState;
	setGlobal: Dispatch<React.SetStateAction<GlobalState>>;
}>(undefined);

const App = () => {
	const [dark] = useTheme();
	const [global, setGlobal] = useState<GlobalState>({
		messages: [],
	});

	return (
		<ApiContext.Provider value={api}>
			<GlobalStateContext.Provider value={{ global, setGlobal }}>
				<div className={cn("lora", dark && "dark")}>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Layout />}>
								<Route path="/" element={<Chat />} />
								<Route path="/documents" element={<Documents />} />
								<Route path="*" element={<Navigate to="/" />} />
							</Route>
							<Route path="/login" element={<Login />} />
						</Routes>
					</BrowserRouter>
				</div>

				<Toaster position="top-center" />
			</GlobalStateContext.Provider>
		</ApiContext.Provider>
	);
};

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<App />);

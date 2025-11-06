import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layout";
import Chat from "./views/chat/chat";
import API from "./api/api";

const api = new API("test", "test");

export const ApiContext = createContext<API>(undefined);

const App = () => {
	return (
		<ApiContext.Provider value={api}>
			<div>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route path="/" element={<Chat />} />
							<Route path="*" element={<Navigate to="/" />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		</ApiContext.Provider>
	);
};

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<App />);

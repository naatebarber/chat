import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layout";
import Chat from "./views/chat";

const App = () => {
	return (
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
	);
};

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<App />);

import React from "react";
import { Outlet } from "react-router-dom";
import CheckSession from "./components/CheckSession";

const Layout = () => {
	return (
		<div className="h-[100vh] w-[100vw] relative overflow-hidden">
			<CheckSession>
				<Outlet />
			</CheckSession>
		</div>
	);
};

export default Layout;

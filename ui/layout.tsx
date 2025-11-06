import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="h-[100vh] w-[100vw] relative">
			<Outlet />
		</div>
	);
};

export default Layout;

import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import CheckSession from "./components/CheckSession";
import Logo from "./components/Logo";
import * as icons from "lucide-react";
import { ApiContext } from "./main";

const Header: React.FC = () => {
	const api = useContext(ApiContext);

	return (
		<div className="flex items-center justify-between shrink-0 p-6 shadow-sm">
			<div className="flex items-center space-x-3">
				<Logo />
			</div>
			<div className="flex items-center space-x-3">
				<icons.LogOut
					className="h-4 w-4 text-text hover:text-accent transition-colors cursor-pointer"
					onClick={() => api.logout()}
				/>
			</div>
		</div>
	);
};

const Layout = () => {
	return (
		<div className="flex flex-col h-[100vh] w-[100vw] relative overflow-hidden">
			<Header />
			<div className="flex flex-col grow overflow-hidden relative">
				<CheckSession>
					<Outlet />
				</CheckSession>
			</div>
		</div>
	);
};

export default Layout;

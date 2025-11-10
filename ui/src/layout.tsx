import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import CheckSession from "./components/CheckSession";
import Logo from "./components/Logo";
import * as icons from "lucide-react";
import { ApiContext } from "./main";
import { useTheme } from "./hooks/useTheme";

const Header: React.FC<{
	onMenuOpen: () => void;
}> = ({ onMenuOpen }) => {
	const api = useContext(ApiContext);
	const [_, setDark] = useTheme();

	return (
		<div className="flex items-center justify-between shrink-0 p-6 shadow-sm">
			<div className="flex items-center space-x-3">
				<Logo />
			</div>
			<div className="flex items-center space-x-3">
				<icons.Moon
					className="h-4 w-4 text-foreground hover:text-accent transition-colors cursor-pointer"
					onClick={() => setDark(true)}
				/>
				<icons.Sun
					className="h-4 w-4 text-foreground hover:text-accent transition-colors cursor-pointer"
					onClick={() => setDark(false)}
				/>
				<icons.LogOut
					className="h-4 w-4 text-foreground hover:text-accent transition-colors cursor-pointer"
					onClick={() => api.logout()}
				/>
				<icons.Menu
					className="h-4 w-4 text-foreground hover:text-accent transition-colors cursor-pointer"
					onClick={onMenuOpen}
				/>
			</div>
		</div>
	);
};

const Layout = () => {
	const [_menuOpen, setMenuOpen] = useState<boolean>(false);

	return (
		<div className="flex flex-col h-[100vh] w-[100vw] relative overflow-hidden">
			<Header onMenuOpen={() => setMenuOpen(true)} />
			<div className="flex flex-col grow overflow-hidden relative">
				<CheckSession>
					<Outlet />
				</CheckSession>
			</div>
		</div>
	);
};

export default Layout;

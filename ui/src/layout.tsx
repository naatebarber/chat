import React, { useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CheckSession from "./components/CheckSession";
import Logo from "./components/Logo";
import * as icons from "lucide-react";
import { ApiContext } from "./main";
import { useTheme } from "./hooks/useTheme";
import { Sheet, SheetContent, SheetTitle } from "./components/sheet";
import { cn } from "./util";

const Header: React.FC<{
	onMenuOpen: () => void;
}> = ({ onMenuOpen }) => {
	const api = useContext(ApiContext);
	const [_, setDark] = useTheme();

	return (
		<div className="flex items-center justify-between shrink-0 p-6 shadow-sm bg-background border-b border-secondary">
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

const routes: {
	name: string;
	path: string;
	Icon: React.FC<any>;
}[] = [
	{
		name: "Chat",
		path: "/",
		Icon: icons.MessageSquare,
	},
	{
		name: "Documents",
		path: "/documents",
		Icon: icons.File,
	},
	{
		name: "Loops",
		path: "/loops",
		Icon: icons.Infinity,
	},
];

const Layout = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	return (
		<div className="flex flex-col h-[100vh] w-[100vw] relative overflow-hidden">
			<Header onMenuOpen={() => setMenuOpen(true)} />
			<div className="flex flex-col grow overflow-hidden relative">
				<CheckSession>
					<Outlet />
				</CheckSession>
			</div>

			<Sheet
				open={menuOpen}
				onOpenChange={(open) => !open && setMenuOpen(open)}
			>
				<SheetContent className="p-3 flex flex-col space-y-3 overflow-y-scroll lora w-[300px]">
					<SheetTitle className="flex items-center pb-6 border-b border-secondary">
						Menu
					</SheetTitle>

					<div className="flex flex-col space-y-1">
						{routes.map((r) => (
							<div
								key={r.path}
								className={cn(
									"flex items-center space-x-2 transition-colors cursor-pointer select-none px-2 py-1 rounded-md",
									pathname !== r.path && "hover:bg-secondary",
									pathname === r.path && "bg-accent text-accent-foreground",
								)}
								onClick={() => {
									navigate(r.path);
									setMenuOpen(false);
								}}
							>
								<r.Icon className="h-4 w-4" />
								<div>{r.name}</div>
							</div>
						))}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default Layout;

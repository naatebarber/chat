import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "~/src/components/Logo";
import { ApiContext } from "~/src/main";

const Login = () => {
	const api = useContext(ApiContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleLogin = () => {
		api.auth
			.login(username, password)
			.then((data) => data.json())
			.then(({ token }) => {
				api.credentials(token, username);
				navigate("/");
			})
			.catch(console.log);
	};

	useEffect(() => {
		if (api)
			api.auth.session().then((data) => {
				if (data.status === 200) {
					navigate("/");
				}
			});
	}, [api]);

	const inputStyle =
		"px-2 py-2 rounded-sm border border-accent shadow-sm w-[200px] outline-accent text-sm";
	const buttonStyle =
		"px-2 py-2 rounded-sm border border-accent hover:bg-accent hover:text-accent-foreground transition-colors w-[200px] cursor-pointer text-sm";

	return (
		<div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center space-y-2">
			<Logo className="text-xl mb-8" />
			<input
				className={inputStyle}
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="User"
			/>
			<input
				className={inputStyle}
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleLogin();
					}
				}}
				placeholder="Password"
			/>
			<button className={buttonStyle} onClick={handleLogin}>
				Log In
			</button>
		</div>
	);
};

export default Login;

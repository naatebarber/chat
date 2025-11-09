import { useEffect, useState } from "react";

export function useTheme() {
	const [dark, setDark] = useState(
		window.matchMedia("(prefers-color-scheme: dark)").matches,
	);

	useEffect(() => {
		const root = document.documentElement;
		dark
			? root.setAttribute("data-theme", "dark")
			: root.removeAttribute("data-theme");
	}, [dark]);

	return [dark, setDark] as const;
}

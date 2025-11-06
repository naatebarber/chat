import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function downloadFile(blob: Blob, name: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

export function readFile(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const fr = new FileReader();
		fr.onload = (e) => {
			resolve(e.target.result.toString());
		};

		fr.onerror = (err) => {
			reject(err.target.error.message);
		};

		fr.readAsText(file);
	});
}

export function readableDate(d_secs: number) {
	const date = new Date(d_secs * 1000);

	const prefixZero = (d: number) => (d < 10 ? `0${d}` : `${d}`);
	return `${date.getFullYear()}/${
		date.getMonth() + 1
	}/${date.getUTCDate()} ${date.getHours()}:${prefixZero(
		date.getMinutes(),
	)}:${prefixZero(date.getSeconds())}.${date.getMilliseconds()}`;
}

export function floatTrunc(f: number) {
	return Math.floor(f * 1000) / 1000;
}

export function toHex(s: string) {
	// utf8 to latin1
	s = encodeURIComponent(s);
	let h = "";
	for (let i = 0; i < s.length; i++) {
		h += s.charCodeAt(i).toString(16);
	}
	return h;
}

export function fromHex(h: string) {
	let s = "";
	for (let i = 0; i < h.length; i += 2) {
		s += String.fromCharCode(parseInt(h.substring(i, 2), 16));
	}
	return decodeURIComponent(s);
}

export function bytePretty(bytes?: number) {
	bytes = bytes ?? this.dump();

	const kb = bytes / 1024;
	const mb = kb / 1024;
	const gb = mb / 1024;

	function floor(n: number) {
		return Math.floor(n * 100) / 100;
	}

	if (gb > 1) {
		return floor(gb) + "GB";
	}

	if (mb > 1) {
		return floor(mb) + "MB";
	}

	if (kb > 1) {
		return floor(kb) + "KB";
	}

	return bytes + "B";
}

export const isMobile = () => {
	const agentMobile =
		navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i)
			? true
			: false;

	const widthMobile = window.innerWidth <= 1024;

	return agentMobile || widthMobile;
};

export function timeAgo(pgTimestamp: string | Date): string {
	const date =
		typeof pgTimestamp === "string" ? new Date(pgTimestamp) : pgTimestamp;
	const now = new Date();

	const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // in seconds

	if (diff < 60) {
		return `${diff} second${diff !== 1 ? "s" : ""} ago`;
	}

	const minutes = Math.floor(diff / 60);
	if (minutes < 60) {
		return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
	}

	const hours = Math.floor(diff / 3600);
	if (hours < 24) {
		return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
	}

	const days = Math.floor(diff / 86400);
	if (days < 30) {
		return `${days} day${days !== 1 ? "s" : ""} ago`;
	}

	const months = Math.floor(days / 30);
	if (months < 12) {
		return `${months} month${months !== 1 ? "s" : ""} ago`;
	}

	const years = Math.floor(months / 12);
	return `${years} year${years !== 1 ? "s" : ""} ago`;
}

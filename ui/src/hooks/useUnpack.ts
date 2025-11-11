export default () => async (data: Response) => {
	if (data.status >= 300) {
		throw new Error("High status code " + data.status);
	}

	switch (data.headers.get("content-type")) {
		case "application/json": {
			return await data.json();
		}
		case "application/octet-stream": {
			return await data.blob();
		}
		default: {
			return await data.text();
		}
	}
};

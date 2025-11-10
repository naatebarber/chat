import React, { useContext, useEffect, useState } from "react";
import { Document } from "~/src/api/api";
import { ApiContext } from "~/src/main";
import Grid from "./grid";

const Documents = () => {
	const api = useContext(ApiContext);

	const [documents, setDocuments] = useState<Document[]>([]);

	const getDocuments = () => {
		api.documents
			.getDocuments(0, 100)
			.then((data) => data.json())
			.then(setDocuments)
			.catch(console.log);
	};

	useEffect(() => {
		if (api) getDocuments();
	}, [api]);

	return (
		<div className="p-6">
			<Grid documents={documents} />
		</div>
	);
};

export default Documents;

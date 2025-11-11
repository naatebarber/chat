import React, { useContext, useEffect, useState } from "react";
import { Document } from "~/src/api/api";
import { ApiContext } from "~/src/main";
import DocumentGrid from "./documentgrid";
import useUnpack from "~/src/hooks/useUnpack";
import { toast } from "sonner";

const Documents = () => {
	const api = useContext(ApiContext);
	const unpack = useUnpack();

	const [documents, setDocuments] = useState<Document[]>([]);

	const getDocuments = () => {
		api.documents
			.getDocuments(0, 100)
			.then((data) => data.json())
			.then(setDocuments)
			.catch(console.log);
	};

	const deleteDocument = (d: Document) => {
		toast.promise(
			() =>
				api.documents.deleteDocument(d.hash).then(unpack).then(getDocuments),
			{
				success: "Deleted document",
				error: "Failed to delete document...",
			},
		);
	};

	useEffect(() => {
		if (api) getDocuments();
	}, [api]);

	return (
		<div className="flex flex-col h-full w-full overflow-y-scroll p-6">
			<DocumentGrid
				documents={documents}
				actions={{
					delete: deleteDocument,
				}}
			/>
		</div>
	);
};

export default Documents;

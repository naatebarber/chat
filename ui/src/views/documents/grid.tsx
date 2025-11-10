import React from "react";
import { Document } from "~/src/api/api";

const Grid: React.FC<{
	documents: Document[];
}> = ({ documents }) => {
	return <div>{documents.map((d) => d.content)}</div>;
};

export default Grid;

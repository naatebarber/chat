import React, { useState } from "react";
import { Document } from "~/src/api/api";
import _ from "lodash";
import * as icons from "lucide-react";
import { cn } from "~/src/util";

interface DocumentActions {
	delete: (d: Document) => void;
}

const DocumentGrid: React.FC<{
	documents: Document[];
	actions: DocumentActions;
}> = ({ documents, actions }) => {
	return (
		<div>
			<div className="columns-3 gap-4">
				{documents.map((d) => (
					<DocumentItem document={d} actions={actions} />
				))}
			</div>
		</div>
	);
};

const DocumentItem: React.FC<{
	document: Document;
	actions: DocumentActions;
}> = ({ document, actions }) => {
	const [hovering, setHovering] = useState<boolean>(false);

	return (
		<div
			className="break-inside-avoid border border-secondary rounded-sm p-4 flex flex-col space-y-2 mb-4"
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<div>{_.truncate(document.content, { length: 200 })}</div>
			<div className="flex items-end justify-between text-secondary-foreground">
				<div className="text-xs flex flex-col space-y-2">
					<div>{document.created_at}</div>
					<div className="flex flex-row space-x-1 items-center">
						{Object.entries(document.metadata).map(([k, v]) => (
							<div
								key={`doc-${document.hash}-md-${k}`}
								className="px-2 py-1 border-2 border-secondary rounded-full text-secondary-foreground/50"
							>
								<strong>{k}</strong> {v}
							</div>
						))}
					</div>
				</div>

				<div
					className={cn(
						"flex items-center space-x-2 hidden",
						hovering && "block",
					)}
				>
					<icons.Trash
						className="h-4 w-4 hover:text-accent transition-colors cursor-pointer"
						onClick={() => actions?.delete?.(document)}
					/>
				</div>
			</div>
		</div>
	);
};

export default DocumentGrid;

import { Client } from "../client";

export default class Documents extends Client {
	getDocuments(offset: number, limit: number) {
		return this.get(`/api/documents?offset=${offset}&limit=${limit}`);
	}

	searchDocuments(search: string, offset: number, limit: number) {
		return this.get(
			`/api/documents/search?search=${encodeURIComponent(search)}&offset=${offset}&limit=${limit}`,
		);
	}

	createDocument(content: string, metadata?: { [key: string]: any }) {
		return this.post(
			`/api/documents/`,
			{
				content,
				metadata,
			},
			{
				json: true,
			},
		);
	}

	updateDocument(hash: string, content: string) {
		return this.patch(
			`/api/documents/${hash}`,
			{
				content,
			},
			{
				json: true,
			},
		);
	}

	deleteDocument(hash: string) {
		return this.delete(`/api/documents/${hash}`);
	}
}

import jwt from "jsonwebtoken";

export const makeToken = (contents: any, secret: string): string => {
	return jwt.sign(
		{
			...contents,
		},
		secret,
		{
			expiresIn: 60 * 60 * 3,
		},
	);
};

export const verifyToken = (
	token: string,
	secret: string,
): {
	[key: string]: any;
} => {
	try {
		return (jwt.verify(token, secret) as any) ?? {};
	} catch (err) {
		return {};
	}
};

import jwt from "jsonwebtoken";
export const makeToken = (contents, secret) => {
    return jwt.sign({
        ...contents,
    }, secret, {
        expiresIn: 60 * 60 * 3,
    });
};
export const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret) ?? {};
    }
    catch (err) {
        return {};
    }
};
//# sourceMappingURL=hashes.js.map
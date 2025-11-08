import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../main";
import { Navigate } from "react-router-dom";

const CheckSession: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const api = useContext(ApiContext);
	const [pending, setPending] = useState<boolean>(true);
	const [valid, setValid] = useState<boolean>(false);

	useEffect(() => {
		if (api)
			api.auth
				.session()
				.then((data) => {
					if (data.status === 200) {
						setValid(true);
					} else {
						api.wipeCredentials();
						setValid(false);
					}
				})
				.finally(() => setPending(false));
	}, [api]);

	if (pending) return <></>;

	if (!valid) return <Navigate to="/login" />;

	return children;
};

export default CheckSession;

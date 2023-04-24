import { createContext, useEffect, useState } from "react";

export interface userStateType {
	auth: Boolean;
	setAuth: Function;
}
const UserContext = createContext<userStateType>();

export const UserContextProvider = ({ children }: { children: JSX.Element[] | null }) => {
	const [auth, setAuth] = useState<Boolean>(false);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setAuth(true);
		}
	}, []);
	return (
		<UserContext.Provider
			value={{
				auth,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;

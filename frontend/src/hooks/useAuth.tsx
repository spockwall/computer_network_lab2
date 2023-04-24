import { useContext, useEffect } from "react";
import UserContext from "../contexts/user";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../oauth.config";

const useAuth = () => {
	const userState = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		const account = localStorage.getItem("account");
		const password = localStorage.getItem("password");
		if (account !== loginValidation.account || password !== loginValidation.password) {
			localStorage.clear();
			navigate("/login");
		} else {
			localStorage.setItem("token", "youaresohandsome");
		}
	}, []);
	return { auth: userState.auth };
};

export default useAuth;

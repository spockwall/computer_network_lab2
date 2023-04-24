import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../oauth.config";

export default function Login(): JSX.Element {
	const { auth } = useAuth();
	const account = useRef("");
	const password = useRef("");
	const navigate = useNavigate();

	return (
		<div className="login-container">
			<div className="token-input-container">
				<label>accout</label>
				<input type="text" ref={account} />
			</div>
			<div className="token-input-container">
				<label>password</label>
				<input type="password" ref={password} />
			</div>
			<Button
				onClick={() => {
					const act = account.current.value;
					const pwd = password.current.value;
					if (act === loginValidation.account && pwd === loginValidation.password) {
						localStorage.setItem("account", act);
						localStorage.setItem("password", pwd);
						navigate("/");
						window.location.reload();
					} else {
						window.alert("login failed");
						account.current.value = "";
						password.current.value = "";
					}
				}}
			>
				login
			</Button>
		</div>
	);
}

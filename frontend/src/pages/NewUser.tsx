import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newUser } from "../feature/newUser";
import { getFlow } from '../feature/getFlow';

export default function NewUser(): JSX.Element {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const newAccount = useRef("");
	const newPassword = useRef("");
	const newQuota = useRef("");
	return (
		<>
			<div className="login-container">
				<div className="login-container-title">CREATE NEW USER</div>
				<div className="token-input-container">
					<label>accout</label>
					<input type="text" ref={newAccount} />
				</div>
				<div className="token-input-container">
					<label>password</label>
					<input type="text" ref={newPassword} />
				</div>
				<div className="token-input-container">
					<label>Quota</label>
					<input type="number" ref={newQuota} />
				</div>
				<Button
					onClick={async () => {
						const res = await newUser(
							newAccount.current.value,
							newPassword.current.value,
							newQuota.current.value
						);
						console.log(res);
						window.location.reload();
					}}
				>
					create new user
				</Button>
			</div>
		</>
	);
}

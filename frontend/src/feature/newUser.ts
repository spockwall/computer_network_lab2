import { server } from "../../oauth.config";

export const newUser = (account: string, password: string, quota: number) => {
	return fetch(server.localUrl + "/newuser", {
		method: "POST",
		headers: new Headers({
			"Content-Type": "application/json",
		}),
		body: JSON.stringify({
			account: account,
			password: password,
			quota: quota,
		}),
	})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
};

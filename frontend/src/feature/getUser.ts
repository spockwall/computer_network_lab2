import { server } from "../../oauth.config";

export const getUser = () => {
	return fetch(server.localUrl + "/getuser", {
		method: "GET",
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((err) => {
			console.log(err.message);
			return [];
		});
};

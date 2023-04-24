import {server } from "../../oauth.config";
import { decryptTokenFromCookie } from "./AES";

export const getFlow = () => {
	return fetch(server.localUrl+ "/getflow", {
		method: "GET",
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err.message);
			return [];
		});
};

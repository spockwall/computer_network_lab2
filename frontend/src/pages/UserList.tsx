import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FunctionBar from "../components/FunctionBar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import { getRepo } from "../feature/getFlow";
import useAuth from "../hooks/useAuth";
import usePagination from "../hooks/usePagination";
import { server } from "../../oauth.config";
import { getUser } from "../feature/getUser";

const userConfig = [
	{ Header: "ID", accessor: "id" },
	{ Header: "Username", accessor: "username" },
	{ Header: "Password", accessor: "value" },
	{ Header: "Attribute", accessor: "attribute" },
];

export default function UserList(): JSX.Element {
	const { auth } = useAuth();
	const [user, setUser] = useState<Array>([]);
	useEffect(() => {
		const func = async () => {
			const data = await getUser();
			setUser(data);
		};
		func();
	}, []);
	return (
		<>
			<Table data={user} columns={userConfig}></Table>
		</>
	);
	return;
}

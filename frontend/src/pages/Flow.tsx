import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import Table from "../components/Table";
import { useEffect, useRef, useState } from "react";
import { getFlow } from '../feature/getFlow';

const flowConfig = [
	{ Header: "Username", accessor: "username" },
	{ Header: "Start_Time", accessor: "acctstarttime" },
	{ Header: "Stop_Time", accessor: "acctstoptime" },
	{ Header: "Traffic_flow", accessor: "acctoutputoctets" },
];

export default function Flow(): JSX.Element {
	const { auth } = useAuth();
    const [flow, setFlow] = useState<Array>([]);
	useEffect( () => {
		const func = async () => {
			const a = await getFlow();
            console.log(a);
			setFlow(a);
		}
        func();
		let timer = setTimeout(func, 60000);

		return ()=>{
			clearTimeout(timer);
		}

	}, [])
	return (
		<>
			<div className="login-container">Refresh Per minute</div>
            <Table data={flow} columns={flowConfig}></Table>
		</>
	);
}

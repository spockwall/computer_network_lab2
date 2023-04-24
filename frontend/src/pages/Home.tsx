import useAuth from "../hooks/useAuth";

export default function Home(): JSX.Element {
	const { auth } = useAuth();
	const account = localStorage.getItem("account");
	return (
		<>
			<div className="hello">Hello {account} !!</div>
		</>
	);
}

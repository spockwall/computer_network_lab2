import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../feature/basicInfo/logout";
import good from "../assets/good.png";

export default function NavBar() {
	const { auth } = useAuth();
	const NavItem = (props) => {
		return (
			<div className="navitem">
				<Link to={props.url} style={{ textDecoration: "none" }} className="link">
					{props.children}{" "}
				</Link>
			</div>
		);
	};
	let navList = [
		{
			text: "Home",
			url: "/",
		},
		{
			text: "UserList",
			url: "/userlist",
		},
		{
			text: "Create",
			url: "/newuser",
		},
		{
			text: "Flow",
			url: "/getflow",
		},
	];

	return (
		<nav className="navbar">
			<div className="navbar-item-container">
				{auth ? (
					<>
						{navList.map((item) => (
							<NavItem key={item.url} url={item.url}>
								{item.text}
							</NavItem>
						))}
						<button className="logout btn-blue btn" onClick={logout}>
							logout
						</button>
					</>
				) : (
					<div>GOOD WEBSITE</div>
				)}
			</div>
		</nav>
	);
}

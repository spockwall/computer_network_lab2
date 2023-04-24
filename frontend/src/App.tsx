import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import NavBar from "./components/NavBar";
import "./css/nav.css";
import "./css/table.css";
import "./css/pagination.css";
import "./css/button.css";
import "./css/issue.css";
import "./css/bar.css";
import "./css/login.css";
import Flow from './pages/Flow';

function App() {
	return (
		<>
			<Router>
				<NavBar />
				<div id="body">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/userlist" element={<UserList />} />
						<Route path="/newuser" element={<NewUser />} />
						<Route path="/getflow" element={<Flow />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;

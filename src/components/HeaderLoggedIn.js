import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DispatchContext from "../DispatchContext";

function HeaderLoggedIn() {
	const navigate = useNavigate();
	const appDispatch = useContext(DispatchContext);

	function logOut() {
		appDispatch({ type: "logout" });
		navigate("/home");
	}
	return (
		<>
			<Link to="/create-tweet">Create Tweet</Link>
			<Link to="/tweets">Tweets</Link>
			<Link to="/users">Users</Link>
			<Link to="/profile">My Profile</Link>
			<button onClick={logOut}>Logout</button>
		</>
	);
}
export default HeaderLoggedIn;

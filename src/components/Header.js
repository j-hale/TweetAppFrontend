import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";
import StateContext from "../StateContext";

function Header() {
	const appState = useContext(StateContext);

	return (
		<div className="header">
			<div className="header-left">
				<Link to="/home">Tweet App</Link>
			</div>
			<div className="header-right">
				{appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
			</div>
		</div>
	);
}
//{loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
export default Header;

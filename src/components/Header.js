import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

function Header() {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	function homeClick() {
		appDispatch({ type: "selectPage", pageName: "home" });
	}

	return (
		<div className="header">
			<div className="header-left">
				<Link
					to="/home"
					onClick={homeClick}
					className={
						appState.pageSelected === "home" ? "selected" : "notSelected"
					}
				>
					Tweet App
				</Link>
			</div>
			<div className="header-right">
				{appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
			</div>
		</div>
	);
}
//{loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
export default Header;

import { Link } from "react-router-dom";
import React, { useContext } from "react";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function HeaderLoggedOut() {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	function loginClick() {
		appDispatch({ type: "selectPage", pageName: "login" });
	}

	function registerClick() {
		appDispatch({ type: "selectPage", pageName: "register" });
	}

	return (
		<>
			<Link
				to="/login"
				onClick={loginClick}
				className={
					appState.pageSelected === "login" ? "selected" : "notSelected"
				}
			>
				Login
			</Link>
			<Link
				to="/register"
				onClick={registerClick}
				className={
					appState.pageSelected === "register" ? "selected" : "notSelected"
				}
			>
				Register
			</Link>
		</>
	);
}
export default HeaderLoggedOut;

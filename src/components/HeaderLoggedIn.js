import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function HeaderLoggedIn() {
	const navigate = useNavigate();
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);
	const activeUser = JSON.parse(appState.activeUser);
	const username = activeUser.loginID;

	function logOut() {
		appDispatch({ type: "logout" });
		navigate("/home");
	}

	function createTweetClick() {
		appDispatch({ type: "selectPage", pageName: "create-tweet" });
	}

	function tweetsClick() {
		appDispatch({ type: "selectPage", pageName: "tweets" });
	}

	function usersClick() {
		appDispatch({ type: "selectPage", pageName: "users" });
	}

	function profileClick() {
		appDispatch({ type: "selectPage", pageName: "profile" });
	}

	return (
		<>
			<Link
				to="/create-tweet"
				onClick={createTweetClick}
				className={
					appState.pageSelected === "create-tweet" ? "selected" : "notSelected"
				}
			>
				Create Tweet
			</Link>
			<Link
				to="/tweets"
				onClick={tweetsClick}
				className={
					appState.pageSelected === "tweets" ? "selected" : "notSelected"
				}
			>
				Tweets
			</Link>
			<Link
				to="/users"
				onClick={usersClick}
				className={
					appState.pageSelected === "users" ? "selected" : "notSelected"
				}
			>
				Users
			</Link>
			<Link
				to={"/profile/" + username}
				onClick={profileClick}
				className={
					appState.pageSelected === "profile" ? "selected" : "notSelected"
				}
			>
				My Profile
			</Link>
			<span className="logout">
				<a onClick={logOut}>
					<u>Logout</u>
				</a>
			</span>
		</>
	);
}
export default HeaderLoggedIn;

import { React, useState, useContext, useEffect } from "react";
import HomeLoggedOut from "./HomeLoggedOut";
import HomeLoggedIn from "./HomeLoggedIn";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

function Home() {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	useEffect(() => {
		appDispatch({ type: "selectPage", pageName: "home" });
	}, []);

	return <>{appState.loggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />}</>;
}

export default Home;

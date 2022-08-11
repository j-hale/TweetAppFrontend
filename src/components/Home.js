import { React, useState, useContext } from "react";
import HomeLoggedOut from "./HomeLoggedOut";
import HomeLoggedIn from "./HomeLoggedIn";
import StateContext from "../StateContext";

function Home() {
	const appState = useContext(StateContext);

	return <>{appState.loggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />}</>;
}

export default Home;

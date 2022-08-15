import React, { useContext, useState, useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import { useImmerReducer } from "use-immer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import Tweets from "./components/Tweets";
import Profile from "./components/Profile";
import CreateTweet from "./components/CreateTweet";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import ReplyForm from "./components/ReplyForm";

function App() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem("activeUser")),
		activeUser: localStorage.getItem("activeUser"),
	};

	function reducer(draft, action) {
		switch (action.type) {
			case "login":
				localStorage.setItem("activeUser", JSON.stringify(action.responseData));
				draft.loggedIn = true;
				draft.activeUser = JSON.stringify(action.responseData);
				// console.log("Debugging lines:");
				// console.log(draft.activeUser);
				// console.log(JSON.parse(localStorage.getItem("activeUser")));
				break;
			case "logout":
				localStorage.removeItem("activeUser");
				draft.loggedIn = false;
				draft.activeUser = null;
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(reducer, initialState);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/reply/:targetTweetID" element={<ReplyForm />} />
						<Route path="/profile/:targetUsername" element={<Profile />} />
						<Route path="/users" element={<Users />} />
						<Route path="/tweets" element={<Tweets />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/create-tweet" element={<CreateTweet />} />
						<Route path="/home" element={<Home />} />
					</Routes>
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

export default App;

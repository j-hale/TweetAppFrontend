import { React, useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function Login() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	function handleCancel() {
		navigate("/home");
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await Axios.post(
				"http://localhost:8080/api/v1.0/tweets/login",
				{
					loginID: username,
					password: password,
				}
			);
			if (response.data) {
				appDispatch({ type: "login", responseData: response.data });
				navigate("/home");
			} else {
				console.log("Incorrect username/password");
			}
		} catch (error) {
			console.log("Failure to submit login request");
		}
	}

	return (
		<div className="login-page">
			<br />
			<h3>Login</h3>
			<br />
			<form onSubmit={handleSubmit}>
				<div className="login-form">
					<label>Username: </label>
					<input
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						placeholder="Enter Username Here"
						name="username"
					/>
					<br />
					<br />
					<label>Password: </label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Enter Password Here"
						name="password"
					/>
					<br />
					<br />
					<br />
					<button type="submit">Login</button>{" "}
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;

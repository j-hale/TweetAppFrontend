import { React, useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [incorrect, setIncorrect] = useState(false);
	const navigate = useNavigate();
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	function handleCancel() {
		navigate("/home");
	}

	function handleUsernameTyping(typing) {
		setUsername(typing);
		setIncorrect(false);
	}

	function handlePasswordTyping(typing) {
		setPassword(typing);
		setIncorrect(false);
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
				setIncorrect(true);
			}
		} catch (error) {
			console.log("Failure to submit login request");
		}
	}

	return (
		<div className="login-page">
			<br />

			<div className="minor-header-stripe">
				<br />
				<h3>Login</h3>
				<br />
			</div>

			{incorrect ? (
				<span className="error">Incorrect Username or Password</span>
			) : (
				""
			)}
			<br />
			<br />
			<form onSubmit={handleSubmit}>
				<div className="login-form">
					<label>Username: </label>
					<input
						onChange={(e) => handleUsernameTyping(e.target.value)}
						type="text"
						placeholder="Enter Username"
						name="username"
					/>
					<br />
					<br />
					<br />
					<label>Password: </label>
					<input
						onChange={(e) => handlePasswordTyping(e.target.value)}
						type="password"
						placeholder="Enter Password"
						name="password"
					/>
					<br />
					<br />
					<br />
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>{" "}
					<button type="submit">Login</button>
				</div>
			</form>
		</div>
	);
}

export default Login;

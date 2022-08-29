import { React, useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [forgottenPassword, setForgottenPassword] = useState("");
	const [incorrect, setIncorrect] = useState(false);

	function handleCancel() {
		navigate("/login");
	}

	function handleUsernameTyping(typing) {
		setUsername(typing);
		setIncorrect(false);
	}

	function handleEmailTyping(typing) {
		setEmail(typing);
		setIncorrect(false);
	}

	function handleSubmit(e) {
		e.preventDefault();
		fetchUser();
	}

	async function fetchUser() {
		try {
			const response = await Axios.get(
				"http://localhost:8080/api/v1.0/tweets/users/" + username
			);
			if (response.data) {
				if (response.data.email === email) {
					setForgottenPassword(response.data.password);
				} else {
					setIncorrect(true);
				}
			} else {
				console.log("There doesnt seem to be a user like that");
				setIncorrect(true);
			}
		} catch (error) {
			console.log("Failure to submit get user request");
		}
	}

	return (
		<div className="forgot-page">
			<br />

			<div className="minor-header-stripe">
				<br />
				<h3>Forgot Password?</h3>
				<br />
			</div>

			{incorrect ? (
				<span className="error">Incorrect Username and Email Combination</span>
			) : (
				""
			)}
			<br />
			<br />
			<form onSubmit={handleSubmit}>
				<div className="forgot-form">
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
					<label>Email: </label>
					<input
						onChange={(e) => handleEmailTyping(e.target.value)}
						type="email"
						placeholder="Enter Email"
						name="email"
					/>
					<br />
					<br />
					<br />
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>{" "}
					<button type="submit">Request Password</button>
				</div>
			</form>
			<br />
			<br />
			<span className="forgotten-password">{forgottenPassword}</span>
		</div>
	);
}

export default ForgotPassword;

import { React, useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const navigate = useNavigate();

	function handleCancel() {
		navigate("/home");
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (password == confirmPassword) {
			try {
				await Axios.post("http://localhost:8080/api/v1.0/tweets/register", {
					loginID: username,
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				});
				console.log("register request succesful");
				setUsername("");
				setEmail("");
				setFirstName("");
				setLastName("");
				setPassword("");
				setConfirmPassword("");
			} catch (error) {
				console.log("Failure to submit register request");
			}
		} else {
			alert("passwords do not match");
		}
	}

	return (
		<div className="register-page">
			<br />
			<h3>Register</h3>
			<br />
			<form onSubmit={handleSubmit}>
				<div className="register-form">
					<label>Username: </label>
					<input
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						placeholder="Enter Username"
						name="username"
					/>
					<br />
					<br />
					<label>Email: </label>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Enter Email Address"
						name="email"
					/>
					<br />
					<br />
					<label>First Name: </label>
					<input
						onChange={(e) => setFirstName(e.target.value)}
						type="text"
						placeholder="Enter First Name"
						name="firstName"
					/>
					<br />
					<br />
					<label>Last Name: </label>
					<input
						onChange={(e) => setLastName(e.target.value)}
						type="text"
						placeholder="Enter Last Name"
						name="lastName"
					/>
					<br />
					<br />
					<label>Password: </label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Enter Password"
						name="password"
					/>
					<br />
					<br />
					<label>Confirm Password: </label>
					<input
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						placeholder="Enter Password"
						name="confirmPassword"
					/>
					<br />
					<br />
					<br />
					<button type="submit">Register</button>{" "}
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default Register;

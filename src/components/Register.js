import { React, useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";

function Register() {
	const [errorText, setErrorText] = useState("");
	const navigate = useNavigate();

	const initialState = {
		username: {
			value: "",
			hasErrors: false,
			message: "",
			isUnique: false,
			checkCount: 0,
		},
		email: {
			value: "",
			hasErrors: false,
			message: "",
		},
		firstName: {
			value: "",
			hasErrors: false,
			message: "",
		},
		lastName: {
			value: "",
			hasErrors: false,
			message: "",
		},
		password: {
			value: "",
			hasErrors: false,
			message: "",
		},
		confirmPassword: {
			value: "",
			hasErrors: false,
			message: "",
		},
		errorText: "",
	};

	function reducer(draft, action) {
		switch (action.type) {
			case "usernameImmediately":
				draft.username.hasErrors = false;
				draft.username.value = action.value;
				if (
					draft.username.value.length > 30 ||
					draft.username.value.length < 1
				) {
					console.log("errors found and set here");
					draft.username.hasErrors = true;
					draft.username.message =
						"Your username must be between 1 and 30 characters";
				}
				if (
					draft.username.value !== "" &&
					!/^([a-zA-Z0-9]+)$/.test(draft.username.value)
				) {
					draft.username.hasErrors = true;
					draft.username.message =
						"Your username can only contain letters and numbers";
				}
				break;
			case "usernameUnique":
				if (!draft.username.hasErrors) {
					draft.username.checkCount++;
				}
				break;
			case "usernameNotUnique":
				draft.username.hasErrors = true;
				draft.username.message = "This username is already taken";
				break;
			case "emailImmediately":
				draft.email.hasErrors = false;
				draft.email.value = action.value;
				if (draft.email.value.length > 45 || draft.email.value.length < 1) {
					draft.email.hasErrors = true;
					draft.email.message =
						"Your email address must be between 1 and 45 characters";
				}
				break;

			case "firstNameImmediately":
				draft.firstName.hasErrors = false;
				draft.firstName.value = action.value;
				if (
					draft.firstName.value.length > 45 ||
					draft.firstName.value.length < 1
				) {
					draft.firstName.hasErrors = true;
					draft.firstName.message =
						"Your first name must be between 1 and 45 characters";
				}
				break;

			case "lastNameImmediately":
				draft.lastName.hasErrors = false;
				draft.lastName.value = action.value;
				if (
					draft.lastName.value.length > 45 ||
					draft.lastName.value.length < 1
				) {
					draft.lastName.hasErrors = true;
					draft.lastName.message =
						"Your last name must be between 1 and 45 characters";
				}
				break;

			case "passwordImmediately":
				draft.password.hasErrors = false;
				draft.password.value = action.value;
				if (
					draft.password.value.length > 45 ||
					draft.password.value.length < 1
				) {
					draft.password.hasErrors = true;
					draft.password.message =
						"Your password must be between 1 and 45 characters";
				}
				break;
			case "confirmPasswordImmediately":
				draft.confirmPassword.hasErrors = false;
				draft.confirmPassword.value = action.value;
				if (
					draft.confirmPassword.value.length > 45 ||
					draft.confirmPassword.value.length < 1
				) {
					draft.confirmPassword.hasErrors = true;
					draft.confirmPassword.message =
						"Your password must be between 1 and 45 characters";
				}
				break;
			case "cancel":
				navigate("/home");
				break;
			default:
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(reducer, initialState);

	useEffect(() => {
		if (state.username.value !== "") {
			const delay = setTimeout(() => dispatch({ type: "usernameUnique" }), 800);
			return () => clearTimeout(delay);
		}
	}, [state.username.value]);

	useEffect(() => {
		if (state.username.checkCount && state.username.checkCount !== 0) {
			async function fetchUser() {
				try {
					const response = await Axios.get(
						"http://localhost:8080/api/v1.0/tweets/users/" +
							state.username.value
					);
					if (response.data) {
						dispatch({ type: "usernameNotUnique" });
					} else {
						console.log("There doesnt seem to be a user like that");
					}
				} catch (error) {
					console.log("Failure to submit get user request");
				}
			}

			fetchUser();
		}
	}, [state.username.checkCount]);

	function handleCancel() {
		navigate("/home");
	}

	function emptyFieldsPresent() {
		if (
			state.username.value === "" ||
			state.email.value === "" ||
			state.firstName.value === "" ||
			state.lastName.value === "" ||
			state.password.value === "" ||
			state.confirmPassword.value === ""
		) {
			triggerImmediateValidation();
			return true;
		} else {
			return false;
		}
	}

	async function duplicateUsernameForceCheck() {
		try {
			const response = await Axios.get(
				"http://localhost:8080/api/v1.0/tweets/users/" + state.username.value
			);
			if (response.data) {
				return true;
			} else {
				console.log("There doesnt seem to be a user like that");
				return false;
			}
		} catch (error) {
			console.log("Failure to submit get user request");
			return false;
		}
	}

	function inputErrorsPresent() {
		// console.log("Testing values: ");
		// console.log("username: " + state.username.value);
		// console.log("email: " + state.email.value);
		// console.log("firstName: " + state.firstName.value);
		// console.log("lastName: " + state.lastName.value);
		// console.log("password: " + state.password.value);
		// console.log("confirmPassword: " + state.confirmPassword.value);

		if (
			state.username.hasErrors ||
			state.email.hasErrors ||
			state.firstName.hasErrors ||
			state.lastName.hasErrors ||
			state.password.hasErrors ||
			state.confirmPassword.hasErrors
		) {
			console.log("Input error return true");
			return true;
		}
		return false;
	}

	function triggerImmediateValidation() {
		dispatch({ type: "usernameImmediately", value: state.username.value });
		dispatch({ type: "emailImmediately", value: state.email.value });
		dispatch({ type: "firstNameImmediately", value: state.firstName.value });
		dispatch({ type: "lastNameImmediately", value: state.lastName.value });
		dispatch({ type: "passwordImmediately", value: state.password.value });
		dispatch({
			type: "confirmPasswordImmediately",
			value: state.confirmPassword.value,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (emptyFieldsPresent()) {
			return;
		}
		if (inputErrorsPresent()) {
			return;
		}
		if (await duplicateUsernameForceCheck()) {
			return;
		} else {
			setErrorText("");
		}
		handleSubmitAsync();
	}

	async function handleSubmitAsync() {
		if (state.password.value === state.confirmPassword.value) {
			try {
				await Axios.post("http://localhost:8080/api/v1.0/tweets/register", {
					loginID: state.username.value,
					firstName: state.firstName.value,
					lastName: state.lastName.value,
					email: state.email.value,
					password: state.password.value,
				});
				console.log("register request succesful");

				navigate("/login");
			} catch (error) {
				alert("Failure to register");
				console.log("Failure to submit register request");
			}
		} else {
			setErrorText("Passwords do not match");
		}
	}

	return (
		<div className="register-page">
			<br />

			<div className="minor-header-stripe">
				<br />
				<h3>Register</h3>
				<br />
			</div>

			<br />
			<form onSubmit={handleSubmit}>
				<div className="register-form">
					{state.username.hasErrors ? (
						<span className="error">{state.username.message}</span>
					) : (
						""
					)}
					<br />
					<label>Username: </label>
					<input
						onChange={(e) =>
							dispatch({ type: "usernameImmediately", value: e.target.value })
						}
						type="text"
						placeholder="Enter Username"
						name="username"
					/>
					{state.username.hasErrors ? <span className="error">*</span> : ""}
					<br />
					<br />
					{state.email.hasErrors ? (
						<span className="error">{state.email.message}</span>
					) : (
						""
					)}
					<br />
					<label>Email: </label>
					<input
						onChange={(e) =>
							dispatch({ type: "emailImmediately", value: e.target.value })
						}
						type="email"
						placeholder="Enter Email Address"
						name="email"
					/>
					{state.email.hasErrors ? <span className="error">*</span> : ""}
					<br />
					<br />
					{state.firstName.hasErrors ? (
						<span className="error">{state.firstName.message}</span>
					) : (
						""
					)}
					<br />
					<label>First Name: </label>
					<input
						onChange={(e) =>
							dispatch({ type: "firstNameImmediately", value: e.target.value })
						}
						type="text"
						placeholder="Enter First Name"
						name="firstName"
					/>
					{state.firstName.hasErrors ? <span className="error">*</span> : ""}
					<br />
					<br />
					{state.lastName.hasErrors ? (
						<span className="error">{state.lastName.message}</span>
					) : (
						""
					)}
					<br />
					<label>Last Name: </label>
					<input
						onChange={(e) =>
							dispatch({ type: "lastNameImmediately", value: e.target.value })
						}
						type="text"
						placeholder="Enter Last Name"
						name="lastName"
					/>
					{state.lastName.hasErrors ? <span className="error">*</span> : ""}
					<br />
					<br />
					{state.password.hasErrors ? (
						<span className="error">{state.password.message}</span>
					) : (
						""
					)}
					<br />
					<label>Password: </label>
					<input
						onChange={(e) =>
							dispatch({ type: "passwordImmediately", value: e.target.value })
						}
						type="password"
						placeholder="Enter Password"
						name="password"
					/>
					{state.password.hasErrors ? <span className="error">*</span> : ""}
					<br />
					<br />
					{state.confirmPassword.hasErrors ? (
						<span className="error">{state.confirmPassword.message}</span>
					) : (
						""
					)}
					<br />
					<label>Confirm Password: </label>
					<input
						onChange={(e) =>
							dispatch({
								type: "confirmPasswordImmediately",
								value: e.target.value,
							})
						}
						type="password"
						placeholder="Enter Password"
						name="confirmPassword"
					/>
					{state.confirmPassword.hasErrors ? (
						<span className="error">*</span>
					) : (
						""
					)}
					<br />
					<br />
					<span className="error">{errorText}</span>
					<br />
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>{" "}
					<button type="submit">Register</button>
				</div>
			</form>
		</div>
	);
}

export default Register;

import { React, useEffect, useState, useContext } from "react";
import StateContext from "../StateContext";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function CreateTweet() {
	const [body, setBody] = useState();
	const [tag, setTag] = useState();
	const appState = useContext(StateContext);
	const navigate = useNavigate();

	function handleCancel() {
		navigate("/home");
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (appState.activeUser != null) {
			const activeUser = JSON.parse(appState.activeUser);
			const username = activeUser.loginID;
			try {
				await Axios.post(
					"http://localhost:8080/api/v1.0/tweets/" + username + "/add",
					{
						body: body,
						tag: tag,
					}
				);
				console.log(appState.activeUser);
				console.log(username);
				console.log(body);
				console.log(tag);
				navigate("/tweets");
			} catch (error) {
				console.log("Failure to submit tweet post request");
			}
		} else {
			console.log("You must be logged in to post a tweet");
		}
	}

	return (
		<div className="create-tweet-page">
			<br />
			<h3>Create Tweet</h3>

			<div className="create-tweet-form">
				<hr />
				<form onSubmit={handleSubmit}>
					<textarea
						onChange={(e) => setBody(e.target.value)}
						placeholder="Enter Tweet Body"
						name="body"
					/>
					<br />
					<textarea
						onChange={(e) => setTag(e.target.value)}
						placeholder="Enter Tweet Tag"
						name="tag"
					/>
					<br />
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>{" "}
					<button type="submit">Post</button>{" "}
				</form>
				<hr />
			</div>
		</div>
	);
}

export default CreateTweet;

import { React, useEffect, useState, useContext } from "react";
import StateContext from "../StateContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

function ReplyForm() {
	const { targetTweetID } = useParams();
	const [targetUsername, setTargetUsername] = useState("");
	const [targetBody, setTargetBody] = useState("");
	const [body, setBody] = useState();
	const [tag, setTag] = useState();
	const appState = useContext(StateContext);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchTweet() {
			try {
				const response = await Axios.get(
					"http://localhost:8080/api/v1.0/tweets/tweet/" + targetTweetID
				);
				if (response.data) {
					setTargetUsername(response.data.user.loginID);
					setTargetBody(response.data.body);
				} else {
					console.log("There doesnt seem to be a tweet like that");
				}
			} catch (error) {
				console.log("Failure to submit get tweet request");
			}
		}
		fetchTweet();
	}, []);

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
					"http://localhost:8080/api/v1.0/tweets/" +
						username +
						"/reply/" +
						targetTweetID,
					{
						body: body,
						tag: tag,
					}
				);

				navigate("/tweets");
			} catch (error) {
				console.log("Failure to submit reply request");
			}
		} else {
			console.log("You must be logged in to reply to a tweet");
		}
	}

	return (
		<div className="create-tweet-page">
			<br />
			<h3>Reply to {targetUsername}'s tweet</h3>
			<p>{targetBody}</p>
			<br />
			<form onSubmit={handleSubmit}>
				<textarea
					onChange={(e) => setBody(e.target.value)}
					placeholder="Enter Reply Body"
					name="body"
				/>
				<br />
				<textarea
					onChange={(e) => setTag(e.target.value)}
					placeholder="Enter Reply Tag"
					name="tag"
				/>
				<br />
				<button type="button" onClick={handleCancel}>
					Cancel
				</button>{" "}
				<button type="submit">Post</button>{" "}
			</form>
		</div>
	);
}

export default ReplyForm;

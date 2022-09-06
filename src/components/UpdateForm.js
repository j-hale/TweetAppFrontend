import { React, useEffect, useState, useContext } from "react";
import StateContext from "../StateContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { APIBaseString } from "../Constants";

function UpdateForm() {
	const { targetTweetID } = useParams();
	const [targetUsername, setTargetUsername] = useState("");
	const [targetBody, setTargetBody] = useState("");
	const [targetTag, setTargetTag] = useState("");
	const [body, setBody] = useState();
	const [tag, setTag] = useState();
	const appState = useContext(StateContext);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchTweet() {
			try {
				const response = await Axios.get(
					APIBaseString + "tweet/" + targetTweetID
				);
				if (response.data) {
					setTargetUsername(response.data.user.loginID);
					setTargetBody(response.data.body);
					setTargetTag(response.data.tag);
					setBody(response.data.body);
					setTag(response.data.tag);
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
				await Axios.put(APIBaseString + username + "/update/" + targetTweetID, {
					body: body,
					tag: tag,
				});

				navigate("/tweets");
			} catch (error) {
				console.log("Failure to submit update request");
			}
		} else {
			console.log("You must be logged in to update a tweet");
		}
	}

	return (
		<div className="create-tweet-page">
			<br />
			<h3>Update your tweet</h3>
			<p>{targetBody}</p>
			<p>
				<strong>
					<i>{targetTag}</i>
				</strong>
			</p>
			<br />
			<form onSubmit={handleSubmit}>
				<textarea
					onChange={(e) => setBody(e.target.value)}
					value={body}
					name="body"
				/>
				<br />
				<textarea
					onChange={(e) => setTag(e.target.value)}
					value={tag}
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

export default UpdateForm;

import ReplyList from "./ReplyList";
import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import StateContext from "../StateContext";

function TweetTile(props) {
	const tweet = props.tweet;
	const [replyArray, setReplyArray] = useState([]);
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(tweet.userLikes.length);
	const appState = useContext(StateContext);
	const navigate = useNavigate();

	useEffect(() => {
		async function getReplyList() {
			try {
				const response = await Axios.get(
					"http://localhost:8080/api/v1.0/tweets/tweet" +
						tweet.tweetID +
						"/replies"
				);
				if (response.data) {
					setReplyArray(response.data);
				} else {
					console.log("There doesn't seem to be any replies");
				}
			} catch (error) {
				console.log("Failure to submit get replies request");
			}
		}

		getReplyList();
	}, []);

	useEffect(() => {
		if (appState.activeUser != null) {
			// console.log("Debug line");
			// console.log(appState.activeUser);
			const activeUser = JSON.parse(appState.activeUser);
			const username = activeUser.loginID;
			setLiked(false);
			for (var i = 0; i < tweet.userLikes.length; i++) {
				if (tweet.userLikes[i].loginID === username) {
					setLiked(true);
				}
			}
		}
	}, []);

	async function handleLike() {
		if (appState.activeUser != null) {
			const activeUser = JSON.parse(appState.activeUser);
			const username = activeUser.loginID;
			try {
				const response = await Axios.put(
					"http://localhost:8080/api/v1.0/tweets/" +
						username +
						"/like/" +
						tweet.tweetID
				);
				if (response.data) {
					setLikeCount(likeCount + 1);
					setLiked(true);
				} else {
					console.log("Like failed for some reason");
				}
			} catch (error) {
				console.log("Failure to submit get replies request");
			}
		} else {
			console.log("You must be logged in to like a tweet");
		}
	}

	function handleReply() {
		navigate("/reply/" + tweet.tweetID);
	}

	return (
		<div className="tweet-tile">
			<hr />
			<Link className="tweet-user" to={"/profile/" + tweet.user.loginID}>
				<strong>
					<u>{tweet.user.loginID}</u>
				</strong>
			</Link>
			<p>{tweet.body}</p>
			<p className="tweet-tag">
				<strong>
					<i>{tweet.tag}</i>
				</strong>
			</p>
			<p>
				Likes: <span>{likeCount}</span>{" "}
			</p>{" "}
			{liked ? "LIKED" : <button onClick={handleLike}>Like</button>}{" "}
			<button onClick={handleReply}>Reply</button>
			<p></p>
			<ReplyList replyArray={replyArray} />
			<hr />
		</div>
	);
}

export default TweetTile;

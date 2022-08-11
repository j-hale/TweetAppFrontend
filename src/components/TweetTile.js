import ReplyList from "./ReplyList";
import { useEffect, useState } from "react";
import Axios from "axios";

function TweetTile(props) {
	const tweet = props.tweet;
	const [replyArray, setReplyArray] = useState([]);

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

	//make a call to the api to get tweet's replies

	return (
		<div className="tweet-tile">
			<hr />
			<a href="#">{tweet.user.loginID}</a>
			<p>{tweet.body}</p>
			<p>{tweet.tag}</p>
			<p>
				Likes: <span>{tweet.userLikes.length}</span>{" "}
			</p>
			<ReplyList replyArray={replyArray} />
			<hr />
		</div>
	);
}

export default TweetTile;

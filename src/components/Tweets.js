import { useEffect, useState } from "react";
import TweetTile from "./TweetTile";
import Axios from "axios";
function Tweets() {
	//plan to load tweets: make the api call for all tweets the first time and put them in the array, then make an appropriate call again
	//if user types in the search bar
	const [tweetArray, setTweetArray] = useState([]);
	const [searchText, setSearchText] = useState("");

	async function getTweetList() {
		try {
			const response = await Axios.get(
				"http://localhost:8080/api/v1.0/tweets/all"
			);
			if (response.data) {
				setTweetArray(response.data);
			} else {
				console.log("There doesnt seem to be any tweets");
			}
		} catch (error) {
			console.log("Failure to submit get tweets request");
		}
	}

	useEffect(() => {
		getTweetList();
	}, []);

	async function handleSearch(e) {
		e.preventDefault();
		if (searchText.trim() === "") {
			getTweetList();
		} else {
			try {
				const response = await Axios.get(
					"http://localhost:8080/api/v1.0/tweets/" + searchText
				);
				if (response.data) {
					setTweetArray(response.data);
				} else {
					setTweetArray([]);
					console.log("There doesnt seem to be any tweets");
				}
			} catch (error) {
				console.log("Failure to submit get tweets request");
			}
		}
	}

	return (
		<div className="users-page">
			<h3>Tweets</h3>
			<br />
			<form action="#">
				<label>Search Tweets From a User:</label>{" "}
				<input
					type="text"
					placeholder="Username"
					name="searchText"
					onChange={(e) => setSearchText(e.target.value)}
				/>{" "}
				<button type="submit" onClick={handleSearch}>
					Search
				</button>
			</form>
			<br />
			<hr />
			<div className="tweets-list">
				{tweetArray.map((theTweet) => {
					return <TweetTile tweet={theTweet} />;
				})}
			</div>
			<hr />
		</div>
	);
}

export default Tweets;

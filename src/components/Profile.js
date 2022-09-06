import TweetTile from "./TweetTile";
import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import StateContext from "../StateContext";
import { useParams } from "react-router-dom";
import { APIBaseString } from "../Constants";

function Profile() {
	const appState = useContext(StateContext);
	const { targetUsername } = useParams();
	const [tweetArray, setTweetArray] = useState([]);
	const [retrievedUsername, setRetrievedUsername] = useState(
		"NO USER (" + targetUsername + ") FOUND"
	);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	useEffect(() => {
		async function fetchUserTweets() {
			try {
				const response = await Axios.get(APIBaseString + targetUsername);
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

		fetchUserTweets();
	}, [targetUsername]);

	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await Axios.get(
					APIBaseString + "users/" + targetUsername
				);
				if (response.data) {
					setRetrievedUsername(response.data.loginID);
					setFirstName(response.data.firstName);
					setLastName(response.data.lastName);
				} else {
					setTweetArray([]);
					console.log("There doesnt seem to be a user like that");
				}
			} catch (error) {
				console.log("Failure to submit get user request");
			}
		}

		fetchUser();
	}, [targetUsername]);

	return (
		<div className="profile-page">
			<div className="profile-tile">
				<hr />

				<h3>{retrievedUsername}</h3>
				<h4>
					{firstName} {lastName}
				</h4>
				<hr />
			</div>

			<div className="tweets-list">
				{tweetArray.map((theTweet) => {
					return <TweetTile tweet={theTweet} />;
				})}
			</div>
		</div>
	);
}

export default Profile;

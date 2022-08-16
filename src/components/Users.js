import React, { useEffect, useState, useContext } from "react";
import UserTile from "./UserTile";
import Axios from "axios";
function Users() {
	const [userArray, setUserArray] = useState([]);
	const [searchText, setSearchText] = useState("");

	async function getUserList() {
		try {
			const response = await Axios.get(
				"http://localhost:8080/api/v1.0/tweets/users/all"
			);
			if (response.data) {
				setUserArray(response.data);
			} else {
				console.log("Get request for users didnt work for some reason");
			}
		} catch (error) {
			console.log("Failure to submit get users request");
		}
	}

	useEffect(() => {
		getUserList();
	}, []);

	async function handleSearch(e) {
		e.preventDefault();
		console.log(searchText);
		if (searchText.trim() === "") {
			getUserList();
		} else {
			try {
				const response = await Axios.get(
					"http://localhost:8080/api/v1.0/tweets/users/search/" + searchText
				);
				if (response.data) {
					setUserArray(response.data);
				} else {
					setUserArray([]);
					console.log("There doesnt seem to be any users");
				}
			} catch (error) {
				console.log("Failure to submit get users request");
			}
		}
	}

	return (
		<div className="users-page">
			<h3>Users</h3>
			<br />
			<form action="#">
				<label>Search Users:</label>{" "}
				<input
					type="text"
					placeholder="Username"
					onChange={(e) => setSearchText(e.target.value)}
				/>{" "}
				<button type="submit" onClick={handleSearch}>
					Search
				</button>
			</form>
			<br />

			<div className="users-list">
				{userArray.map((theUser) => {
					return <UserTile user={theUser} />;
				})}
			</div>
		</div>
	);
}

export default Users;

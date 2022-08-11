import React, { useEffect, useState, useContext } from "react";
import UserTile from "./UserTile";
import Axios from "axios";
function Users() {
	const [userArray, setUserArray] = useState([]);

	useEffect(() => {
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

		getUserList();
	}, []);

	return (
		<div className="users-page">
			<h3>Users</h3>
			<br />
			<form action="#">
				<label>Search Users:</label>{" "}
				<input type="text" placeholder="Username" />{" "}
				<button type="submit">Search</button>
			</form>
			<br />
			<hr />
			<div className="users-list">
				{userArray.map((theUser) => {
					return <UserTile user={theUser} />;
				})}
			</div>
			<hr />
		</div>
	);
}

export default Users;

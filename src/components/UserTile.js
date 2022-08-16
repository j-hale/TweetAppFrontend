import { React, useEffect, useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

function UserTile(props) {
	const user = props.user;
	return (
		<div className="tweet-tile">
			<hr />
			<Link to={"/profile/" + user.loginID} className="tweet-user">
				<strong>
					<u>{user.loginID}</u>
				</strong>
			</Link>
			<p>
				{user.firstName} {user.lastName}
			</p>
			<hr />
		</div>
	);
}

export default UserTile;

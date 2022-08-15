import { React, useEffect, useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

function UserTile(props) {
	const user = props.user;
	return (
		<div className="user-tile">
			<hr />
			<Link to={"/profile/" + user.loginID}>{user.loginID}</Link>
			<p>
				{user.firstName} {user.lastName}
			</p>
			<hr />
		</div>
	);
}

export default UserTile;

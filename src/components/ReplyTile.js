import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function ReplyTile(props) {
	const reply = props.reply;
	const navigate = useNavigate();

	return (
		<div className="reply-tile">
			<Link to={"/profile/" + reply.user.loginID} className="reply-user">
				<u>{reply.user.loginID}</u>
			</Link>
			<p>{reply.body}</p>
			<p className="reply-tag">
				<strong>
					<i>{reply.tag}</i>
				</strong>
			</p>
		</div>
	);
}

export default ReplyTile;

function ReplyTile(props) {
	const reply = props.reply;
	return (
		<div className="reply-tile">
			<a href="#">{reply.user.loginID}</a>
			<p>{reply.body}</p>
			<p>{reply.tag}</p>
		</div>
	);
}

export default ReplyTile;

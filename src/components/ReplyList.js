import ReplyTile from "./ReplyTile";

function ReplyList(props) {
	const replyArray = props.replyArray;

	return (
		<div className="reply-list">
			<h4>Replies:</h4>
			{replyArray.map((theReply) => {
				return <ReplyTile reply={theReply} />;
			})}
		</div>
	);
}

export default ReplyList;

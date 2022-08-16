import ReplyTile from "./ReplyTile";

function ReplyList(props) {
	const replyArray = props.replyArray;

	return (
		<div className="reply-list">
			{replyArray.map((theReply) => {
				return (
					<>
						<ReplyTile reply={theReply} />
						<p></p>
					</>
				);
			})}
		</div>
	);
}

export default ReplyList;

import TweetTile from "./TweetTile";
function Profile() {
	const user = {
		userId: 1,
		loginID: "user1",
		firstName: "Cad",
		lastName: "Bane",
		email: "cb@email.co",
		password: "bobasux",
	};

	const tweetArray = [
		{
			tweetID: 1,
			body: "An old clone veteran tried to outdraw me again today.. *sigh*",
			tag: "dumbclones",
			user: {
				userId: 1,
				loginID: "user1",
				firstName: "Cad",
				lastName: "Bane",
				email: "cb@email.co",
				password: "bobasux",
			},
			userLikes: [
				{
					userId: 1,
					loginID: "user1",
					firstName: "Cad",
					lastName: "Bane",
					email: "cb@email.co",
					password: "bobasux",
				},
				{
					userId: 3,
					loginID: "user3",
					firstName: "Fennec",
					lastName: "Shand",
					email: "cb@email.co",
					password: "ilikeboba",
				},
			],
		},
		{
			tweetID: 2,
			body: "Republic? Empire? Who cares? I make money either way",
			tag: "ballin",
			user: {
				userId: 1,
				loginID: "user1",
				firstName: "Cad",
				lastName: "Bane",
				email: "cb@email.co",
				password: "bobasux",
			},
			userLikes: [
				{
					userId: 3,
					loginID: "user3",
					firstName: "Fennec",
					lastName: "Shand",
					email: "cb@email.co",
					password: "ilikeboba",
				},
			],
		},
	];

	return (
		<div className="profile-page">
			<a href="#">Generic Photo</a>
			<h3>{user.loginID}</h3>
			<h4>
				{user.firstName} {user.lastName}
			</h4>
			<hr />
			<div className="tweets-list">
				{tweetArray.map((theTweet) => {
					return <TweetTile tweet={theTweet} />;
				})}
			</div>
		</div>
	);
}

export default Profile;

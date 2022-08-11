function UserTile(props) {
	const user = props.user;
	return (
		<div className="user-tile">
			<hr />
			<a href="#">Generic Photo?</a>
			<p>{user.loginID}</p>
			<p>
				{user.firstName} {user.lastName}
			</p>
			<hr />
		</div>
	);
}

export default UserTile;

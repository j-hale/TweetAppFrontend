import { Link } from "react-router-dom";

function HeaderLoggedOut() {
	return (
		<>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
		</>
	);
}
export default HeaderLoggedOut;

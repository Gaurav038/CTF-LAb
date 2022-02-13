import { Route, Routes, Navigate } from "react-router-dom";
import AllUsers from "./components/AllUsers";
import AddUser from "./components/Profile/ProfileScreen";
import Signup from "./components/Singup";
import Login from "./components/Login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<AllUsers />} />}
			{user && <Route path="/update" exact element={<AddUser />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/signup" />} />
			<Route path="/update" element={<Navigate replace to="/signup" />} />
		</Routes>
	);
}

export default App;

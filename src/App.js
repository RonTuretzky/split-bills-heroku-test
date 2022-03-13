import { Route, Switch } from "react-router-dom";
import "./App.css";
import Meet from "./components/meet";
import Matches from "./components/matches";
import NavBar from "./components/navBar";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<main className="d-flex h-100 flex-column">
			<NavBar />
			<div className="col">
				<Switch>
					<Route exact path="/" component={Home} />
					<ProtectedRoute path="/meet" component={Meet} />
					<ProtectedRoute path="/matches" component={Matches} />
					<Route path="/signup" component={Signup} />
					<Route path="/login" component={Login} />
				</Switch>
			</div>
		</main>
	);
}

export default App;

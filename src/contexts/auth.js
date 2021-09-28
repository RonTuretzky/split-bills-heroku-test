import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

const TOKEN_KEY = "jwt-token";

// Attach JWT to axios
axios.interceptors.request.use(config => {
	const token = localStorage.getItem(TOKEN_KEY)
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, error => {
	return Promise.reject(error);
})

export const AuthContext = React.createContext();
export class AuthProvider extends React.Component {
	state = {
		currentUser: null,
		//loading: false,
	};
	constructor(props) {
		super(props);
		this.state.currentUser = this.getUserFromLocalStorage();
	}
	register = async (name, email, password) => {
		const { data } = await axios.post("/register", { name, email, password });
		localStorage.setItem(TOKEN_KEY, data.token);
		const user = jwt.decode(data.token);
		this.setState({ currentUser: user });
		return user;
	};
	login = async (email, password) => {
		const { data } = await axios.post("/login", { email, password });
		localStorage.setItem(TOKEN_KEY, data.token);
		const user = jwt.decode(data.token);
		this.setState({ currentUser: user });
		return user;
	};
	signout = () => {
		localStorage.removeItem(TOKEN_KEY);
		axios.defaults.headers.Authorization = undefined;
		this.setState({ currentUser: null });
	}
	getUserFromLocalStorage() {
		const token = localStorage.getItem(TOKEN_KEY);
		if (!token) {
			return null;
		}
		return jwt.decode(token);
	}
	componentDidMount() {
		const user = this.getUserFromLocalStorage()
		this.setState({ currentUser: user });
	}
	render() {
		const value = {
			currentUser: this.state.currentUser,
			register: this.register,
			login: this.login,
			signout: this.signout,
		};
		return (
			<AuthContext.Provider value={value}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

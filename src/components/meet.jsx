import React, { Component } from "react";

import meetTelHaiService from "../services/meetTelHaiService";
import { AuthContext } from "./../contexts/auth";
import TinderCard from "react-tinder-card";

class Meet extends Component {
	static contextType = AuthContext;
	state = {
		users: null,
		error: null
	};
	async componentDidMount() {
		const { data } = await meetTelHaiService.available(); // we fetch all unliked/undisliked users
		this.setState({ users: data });
	}
	getUserImage(user) {

		if (user.image) {
			
			return user.image
		}
		return `https://robohash.org/${user._id}`

	}
	getYeechor(){
		if(this.state.yeechor){
			return "✅";
		}
		else{
			return "❎";
		}
	}
	onSwipe = async (direction, user) => {
		await meetTelHaiService.like(direction === "right", user._id)
	}
	render() {
		if (this.state.users == null) {
			return <div>Loading...</div>
		}
		if (this.state.error) {
			return (<>
				<div> Sorry something is wrong </div>
				<div> {this.state.error}</div>
			</>);
		}

		return (
		<div>
			<br></br>
			<br></br>
			<p align="center">◀ימינה לדבר , שמאלה פחות▶</p>
			<br></br>
			<br></br>
			<div style={{display: 'flex',  justifyContent:'center', alignItems:'top', height: '80vh',border:"none"}}>
				<div className='cardContainer' style={{border:"none"}}>
					{this.state.users.map((user) =>
						<TinderCard className='swipe' key={user.name} onSwipe={(dir) => this.onSwipe(dir, user)} style={{border:"none"}}>
							<div style={{ backgroundImage: 'url(' + this.getUserImage(user) + ')' ,border:"none"}} className='card' >
							</div>
							<div className="position-relative">
								<div className="position-absolute top-0">
								<div className="card" style={{ width: "18rem",border:"none", }}>
								<h6 align="right">{user.name}</h6>
								<p align="right" >{user.profile}</p>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<p align="right"> {user.yeechor ? "✅" : "❎" } = ?מייחר.ת </p>
								</div>
								</div>
								
							</div>
							
						</TinderCard>
					)}
				</div>
			</div >
			
			</div>
		);
	}
}

export default Meet;
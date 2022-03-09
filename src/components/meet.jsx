import React, { Component } from "react";

import meetTelHaiService from "../services/meetTelHaiService";
// import Datingcards from "../Datingcards/Datingcards"
import { AuthContext } from "./../contexts/auth";
import TinderCard from "react-tinder-card";

class Meet extends Component {
	static contextType = AuthContext;
	state = {
		users: null,
		error: null
	};
	async componentDidMount() {
		const { data } = await meetTelHaiService.available();
		this.setState({ users: data });
	}
	getUserImage(user) {

		if (user.image) {
			return user.image
		}
		return `https://robohash.org/${user._id}`

	}
	onSwipe = async (direction, user) => {
		console.log({ direction, user })
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
				<div className='cardContainer'>
					{this.state.users.map((user) =>
						<TinderCard className='swipe' key={user.name} onSwipe={(dir) => this.onSwipe(dir, user)}>
							<div style={{ backgroundImage: 'url(' + this.getUserImage(user) + ')' }} className='card'>
								<h3>{user.name}</h3>
							</div>
						</TinderCard>
					)}
				</div>


				{/* <div className="position-relative ">
					{
						this.state.users.map(user => (<div className="position-absolute top-0">
							<div className="card" style={{ width: "18rem" }}>
								<img className="card-img-top" src={this.getUserImage(user)} alt="hi" />
								<div className="card-body">
									<div></div>
									<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								</div>
								<pre>{JSON.stringify(user, null, 2)}</pre>
							</div>
						</div>)
						)
					}
				</div> */}
			</div >
			// <Datingcards />
		);
	}
}

export default Meet;
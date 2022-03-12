import React, { Component } from "react";
import { AuthContext } from "../contexts/auth";
import meetTelHaiService from "../services/meetTelHaiService";

class Matches extends Component {
	static contextType = AuthContext;
	state = {
		matches: null,
		error: null
	};
	async componentDidMount() {
		try {
			const { data } = await meetTelHaiService.allMatches();
			this.setState({ matches: data });
		} catch (err) {
			this.setState(err);
		}
	}
	setStateOfMatches = () => {
		console.log("remounting");
		this.componentDidMount();
	};

	render() {
		if (this.state.matches === null) {
			return <p>loading...</p>;
		}
		if (this.state.error) {
			return <p> Sorry, something went wrong</p>
		}

		if (this.state.matches.length === 0) {
			return (
				<div className="row h-100 bg-danger">
					<div className="container">
						<h4 className="text-center">You still don't have any match
							<br></br>
							Click on "Meet" to make some</h4>
					</div>
				</div>
			);
		}

		return (
			<div className="container">
				<h4 className="text-center">Matches</h4>
				{this.state.matches.map((match, i) => (
					<div style={{maxWidth:"1000px",maxHeight:"75px"}} className="card p-2 m-2 border-light border-rounded" >
						<label as='a' image>
							{match.name}							{match.phone}
						</label>
					</div>))
				}
			</div>

		);
	}
}
export default Matches;

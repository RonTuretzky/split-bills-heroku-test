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
				<h4 className="text-center">Choose the match you would like to contact with</h4>
				{this.state.matches.map((match, i) => (
					<div className="card p-2 m-2 border-light border-rounded">
						<label as='a' image>
							{match.name}
						</label>
						<div>
							<button theme="pink" onClick={console.log}>
								Show Number
							</button>
						</div>
						<pre></pre>
					</div>))
				}
			</div>

		);
	}
}
export default Matches;

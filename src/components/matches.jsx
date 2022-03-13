import React, { Component } from "react";
import { AuthContext } from "../contexts/auth";
import meetTelHaiService from "../services/meetTelHaiService";

class Matches extends Component {
	static contextType = AuthContext;
	state = {
		matches: null,
		error: null
	};
	async componentDidMount() { //We fetch all available matches from handler, to present their data
		try {
			const { data } = await meetTelHaiService.allMatches();
			this.setState({ matches: data });
		} catch (err) {
			this.setState(err);
		}
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try{
			await this.contextType.delete();
		}
		catch (e){
			console.log(e)
		}
		this.props.history.push("/"); 
	  };
	
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
				<div className="row h-100 bg-success">
					<form
        				className=" bg-success"
            			onSubmit={this.handleSubmit}>
						<button
              				type="submit"
              				id="button-submit"
              				className="btn btn-success border "
            				>
              				מחיקת חשבון
            			</button>
					</form>

					<div className="container">
						<br></br>
						<br></br>
						<br></br>
						<h4 className="text-center text-white">!עדיין לא פגשת</h4>
						
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
							<br></br>
							 {match.name ? "✅" : "❎"}=מייחר.ת?
						</label>
					</div>))
				}
			</div>

		);
	}
}
export default Matches;



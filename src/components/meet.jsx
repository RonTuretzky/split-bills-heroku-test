import React, { Component } from "react";
import Datingcards from "../Datingcards/Datingcards"
// import { AuthContext } from "./../contexts/auth";

class Meet extends Component {

    render(){
        console.log("here at meet!")
        return(
            <div className="meet">
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card>
                {/* <Datingcards/> */}
            </div>
        );
    }
}

export default Meet;
import React, { Component } from "react";
import Card from "react-ui-cards";
import { Button} from 'react-bootstrap';
import Datingcards from "../Datingcards/Datingcards";
// import Datingcards from "../Datingcards/Datingcards"
// import { AuthContext } from "./../contexts/auth";

class Meet extends Component {
    state = {};
    render(){
        return(
            
            <Datingcards/>
            // <div className="meet">
            //     <Card style={{ width: '18rem' }}>
            //     <Card.Img variant="top" src="/homepagepic.jpg" />
            //     <Card.Body>
            //     <Card.Title>Card Title</Card.Title>
            //     <Card.Text>
            //     Some quick example text to build on the card title and make up the bulk of
            //     the card's content.
            //     </Card.Text>
            //     <Button variant="primary">Go somewhere</Button>
            //     </Card.Body>
            //     </Card>
            // </div>
        );
    }
}

export default Meet;
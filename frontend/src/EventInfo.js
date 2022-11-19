import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ChatBox from './ChatBox'
import API from './API';

function EventInfo(props) {
    const[event, setEvent] = useState({});
    useEffect(() => {
        API.getEvent(props.match.params.id).then(
            (response) => { 
                setEvent(response);
            });
    }, [])

    return(
        <Container fluid>
        <Row className="event-page">
            <Col sm={6} className = "col-filter">
                <div className="cardDiv card-elevation3 infoCard">
                    <Card className="infoCardContent">
                        <Card.Header><h1>{event.event_name} </h1></Card.Header>
                    <Card.Body className="eventInfoBody">
                        <div dangerouslySetInnerHTML={{ __html:event.description}} />
                        <p><b>Date and Time:</b> {event.date} </p>
                        {event.location?
                        <p><b>Location:</b>  {event.location.location_name} </p>:""}
                        <p><b>Contact Information:</b> {event.contact_email} , {event.contact_phone}</p>
                    </Card.Body>
                    </Card>
                </div>
             </Col>
            {props.user.full_name ?
            <Col sm={6} className = "col-results">
                <div className="infoCardContent">
                    <div className="cardDiv card-elevation3 infoCard">
                    <Card className="infoCardContent">
                    <Card.Header><h2> Reviews </h2></Card.Header>
                    <Card.Body>
                        <ChatBox user={props.user} event_id={event.event_id}/>
                    </Card.Body>
                    </Card>
                </div>
                </div>
            </Col> : "" }
        </Row>
    </Container>

 );
}

export default EventInfo;
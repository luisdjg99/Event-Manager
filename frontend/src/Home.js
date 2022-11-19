import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import API from './API';
import Modal from 'react-modal'
import noevent from './noevent.png';
//import MapPicker from 'react-google-map-picker'

function Home(props) {
    const [events, setEvents] = useState([]);
    const [categList, setCategList] = useState([]);
    const [univ, setUniv] = useState("");
    const [org, setOrg] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categ, setCateg] = useState("");


    function getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');      
        return month + '/' + day + '/' + year;
    }

    useEffect(() => {
        API.getCategories().then(
            (resp) => { 
                setCategList(resp.map((x, i) => <option key={i} value={x}>{x}</option>));
                var date = new Date();
                setStartDate(getFormattedDate(date))
                date.setDate(date.getDate() + 1);
                setEndDate(getFormattedDate(date))
                doSearch();
            });
    }, [])

    function doSearch(){
        API.getEvents({user: props.user, univ, org, startDate, endDate, categ}).then(
            (list) => {
                setEvents(list.length ? list.map((item) => <Event key={item.event_id} data={item}/>) :
                <div>
                <img className="notFoundImg" src={noevent} alt="empty state" />
                <h2 className="not-found">No match found</h2>
                </div> );
            });
    }

    return(
        <Container fluid>
            <Row className="event-page">
                <Col sm={4} className = "col-filter">
                    <h2> Filter by </h2>
                    <div className="cardDiv card-elevation3">
                        <Card>
                        <Card.Body>
                        <table className="table-full">
                            <tbody>
                            <tr>
                                <th>University: </th>
                                <td>
                                    <Form.Control placeholder="University Name" value={univ} onChange={(x) => setUniv(x.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th>Organization: </th>
                                <td>
                                    <Form.Control placeholder="Organization Name" value={org} onChange={(x) => setOrg(x.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <th>Start Date: </th>
                                <td>
                                    <Form.Control value={startDate} onChange={(x) => setStartDate(x.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <th>End Date: </th>
                                <td>
                                    <Form.Control value={endDate} onChange={(x) => setEndDate(x.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <th>Event Type: </th>
                                <td>
                                    <Form.Control as="select" value={categ} onChange={(x) => setCateg(x.target.value)}>
                                        <option value="">All</option>
                                        {categList}
                                    </Form.Control>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </Card.Body>
                        </Card>
                    </div>
                    <button type="button" className="btn btn-primary btn-search" onClick={doSearch}>Search</button>
                </Col>
                <Col sm={8} className = "col-results">
                    <div className="event-wrapper">
                        <h2> Upcoming Events </h2>
                        {events}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

function Event({data}) {
    return(
        <div className="cardDiv card-elevation3">
            <Card>
            <Card.Header as="h5">{data.event_name}</Card.Header>
            <Card.Body>
                {/*<Card.Title>Subtitle</Card.Title>*/}
                <Card.Text>
                Location: {data.loc.location_name}
                <br/>
                {/*<div dangerouslySetInnerHTML={{ __html:data.description}} />*/}
                Event Date: -
                {data.date}
                <NavLink exact className="btn btn-primary cardbtn" to={"/EventInfo/"+ data.event_id}> Event Details </NavLink>
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
}

export default Home;
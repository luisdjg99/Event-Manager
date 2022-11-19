import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Modal from 'react-modal'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import API from './API';
import noevent from './noevent.png';

function Organizations(props) {
    const [orgList, setOrgList] = useState([]);
    const [univ, setUniv] = useState({});
    const [org, setOrg] = useState("");
    const [myOrg, setMyOrg] = useState(false);

    const emptyOrg = {rso_name: '', description:''};
    const[newOrg, setNewOrg] = useState(emptyOrg);
    
    const [modalOrgIsOpen, setModalOrgIsOpen] = useState(false);
    const [modalEventIsOpen, setModalEventIsOpen] = useState(false);
    
    const emptyEvent = { rso_id: 0, event_name: '', event_type: '', category:'', description: '', date: '', contact_phone: '', contact_email: '' , latitude: '' , longitude: '' , locationName: '' }
    const [newEvent, setNewEvent] = useState(emptyEvent);

    const [userUniList, setUserUniList] = useState([]);

    const emptyMembers = [{ user_id: props.user.user_id, isAdmin: true}];
    const [rsoMembers, setRsoMembers] = useState(emptyMembers);
   
    function handleNewEventChange(event) { 
        setNewEvent({...newEvent, [event.target.name]: event.target.value})
    }   
    function handleNewOrgChange(event) { 
        setNewOrg({...newOrg, [event.target.name]: event.target.value})
    } 
    function openEventModal(org_id) { 
        setNewEvent({...emptyEvent, rso_id: org_id})
        setModalEventIsOpen(true)
    }

    function createOrg(){
        API.createOrg(newOrg, rsoMembers, props.user.university_id).then(() => {
            setModalOrgIsOpen(false)
            doSearch()
        });
    }

    function createEvent(){        
        API.createEvent(newEvent).then(() => setModalEventIsOpen(false));
    }

    function openOrgModal(){
        setRsoMembers(emptyMembers);
        setNewOrg(emptyOrg);
        setModalOrgIsOpen(true);
    }

    useEffect(() => {
        if (props.user.user_id) {
            
            API.getUniversity(props.user.university_id).then(
                (univ) => { 
                    setUniv(univ)
                    doSearch();
                });

            API.getUsersFromUni(props.user.university_id).then(
                (resp) => { 
                    setUserUniList(resp.map((x, i) => <option key={i} value={x.user_id}> {x.email} </option>));
                }); 
        }
        else
            props.history.push('/');
    }, [])

    function doSearch(){
        API.getOrgs({org, myOrg, user_id: props.user.user_id}).then(
            (list) => {
                setOrgList(list.length ? list.map((item) => <Orgs joinRso={joinRso} key={item.rso_id} data={item} openModal={() => openEventModal(item.rso_id)}/>) :
                <div>
                <img className="notFoundImg" src={noevent} alt="empty state" />
                <h2 className="not-found">No match found</h2>
                </div> );
            }
        );        
    }

    function joinRso(rso_id){
        API.joinRso({rso_id, user_id: props.user.user_id}).then(
            ()=> doSearch()
        );
    }

    const handleAddFields = () => {
        const values = [...rsoMembers];
        values.push({ user_id: '', isAdmin: false});
        setRsoMembers(values);
      };
    
    const handleRemoveFields = index => {
        const values = [...rsoMembers];
        values.splice(index, 1);
        setRsoMembers(values);
      };
    
    const handleChangeField = (event, index) => {
        const values = [...rsoMembers];
        var current = values[index];
        var obj = event.target;
        if (obj.name == "user_id")
            current.user_id = obj.value;
        else {
            values.forEach(x => x.isAdmin = false);
            current.isAdmin = obj.checked;
        }
        setRsoMembers(values);
      };

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
                                <th>Organization: </th>
                                <td>
                                    <Form.Control placeholder="Name" value={org} onChange={(x) => setOrg(x.target.value)}/>
                                </td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <th> </th><td>
                                <Form>
                                    <Form.Check 
                                        onChange={(x) => setMyOrg(x.target.checked)}
                                        checked={myOrg}
                                        type="switch"
                                        id="custom-switch"
                                        label="My Organizations Only"
                                    />
                                </Form></td>
                            </tr>
                            </tbody>
                        </table>
                        </Card.Body>
                        </Card>
                    </div>
                    <button type="button" className="btn btn-primary btn-search" onClick={doSearch}>Search</button>
                    <a type="button" className="btn btn-success btn-search" href="#" role="button" onClick={openOrgModal}> Register a new Organization</a>
                </Col>                         
                <Col sm={8} className = "col-results">
                    <div className="event-wrapper">
                        <h2> Organizations at {univ.uni_name} </h2>
                        {orgList}
                    </div>
                </Col>
            </Row>

            <Modal isOpen={modalOrgIsOpen} 
                        shouldCloseOnOverlayClick={(true)} 
                        onRequestClose={() => setModalOrgIsOpen(false)}
                        ariaHideApp={false}
                        style={{
                            overlay: {backgroundColor: 'rgba(112,128,144,0.90)'},
                            content: {height: '80%', width: '40%'}
                        }}>
                        <div className="modal-org">
                            <Form className="table-new-org">
                                <div>
                                    New Organization
                                </div>
                                <Form.Control name="rso_name" placeholder="Organization Name" value={newOrg.rso_name} onChange={handleNewOrgChange}/>
                                <Form.Control name="description" as="textarea"placeholder="Organization Purpose" rows={3} value={newOrg.description} onChange={handleNewOrgChange}/>
                                <fieldset>
                                        <Form.Group as={Row}>
                                        <Col >
                                            Members (choose an administrator)
                                                {rsoMembers.map((inputField, index) => (
                                                <Fragment key={`${inputField}~${index}`}>
                                                <Form.Row>
                                                    <Form.Group as={Col}>
                                                        <Form.Control as="select" name="user_id" value={inputField.user_id} onChange={(x) => handleChangeField(x, index)}>
                                                            <option value="">Select member's email</option>
                                                            {userUniList}
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Check type="radio" id={'admin_'+index} name="adminRadio" checked={inputField.isAdmin} onChange={(x) => handleChangeField(x, index)}/>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <button className="btn btn-primary btn-modal" type="button" onClick={() => handleAddFields()}>
                                                            +
                                                        </button>
                                                        <button disabled={inputField.isAdmin} className="btn btn-primary btn-modal" type="button" onClick={() => handleRemoveFields(index)}>
                                                            -
                                                        </button>
                                                    </Form.Group>
                                                </Form.Row>
                                                </Fragment>)) }
                                        </Col>
                                        </Form.Group>
                                </fieldset>
                            </Form>
                            <button className="btn btn-primary btn-modal" onClick={() => setModalOrgIsOpen(false)}> Cancel </button>
                            {rsoMembers.length >= 5 ? <button className="btn btn-primary btn-modal" onClick={createOrg}> Create </button>:""}
                        </div>
                    </Modal>
                    

            <Modal isOpen={modalEventIsOpen} 
                        shouldCloseOnOverlayClick={(true)} 
                        onRequestClose={() => setModalEventIsOpen(false)}
                        ariaHideApp={false}
                        style={{
                            overlay: {backgroundColor: 'rgba(112,128,144,0.90)'},
                            content: {height: '85%', width: '50%'}
                        }}>
                        <div className="modal-org">
                            <table className="table-new-event">
                                <tbody>
                                <tr><td>
                                    <div> New Event </div>
                                    
                                    <Form.Control name="event_name" placeholder="Event Title" value={newEvent.event_name} onChange={handleNewEventChange}/>
                                    <Form.Control name="event_type" placeholder="Event Type" value={newEvent.event_type} onChange={handleNewEventChange}/>
                                    <Form.Control name="category" placeholder="Category" value={newEvent.category} onChange={handleNewEventChange}/>
                                    <Form.Control name="description" as="textarea" placeholder="Event Description" rows={3} value={newEvent.description} onChange={handleNewEventChange}/>
                                    <Form.Control name="date" placeholder="Event Date" value={newEvent.eventdate} onChange={handleNewEventChange}/>
                                    <br/>
                                    <div> Location: </div>
                                    <Form.Control name="locationName" placeholder="Location Name" value={newEvent.locationName} onChange={handleNewEventChange}/>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                        <Form.Control name="latitude" placeholder="latitude" value={newEvent.latitude} onChange={handleNewEventChange}/>
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                        <Form.Control name="longitude" placeholder="longitude" value={newEvent.longitude} onChange={handleNewEventChange}/>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <div> Contact Info: </div>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                        <Form.Control name="contact_phone" placeholder="Phone Number" value={newEvent.contact_phone} onChange={handleNewEventChange}/>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                        <Form.Control name="contact_email" placeholder="Email Adress" value={newEvent.contact_email} onChange={handleNewEventChange}/>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                </td>
                                </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-primary btn-modal" onClick={() => setModalEventIsOpen(false)}> Cancel </button>
                            <button className="btn btn-primary btn-modal" onClick={createEvent}> Create </button>
                        </div>
                    </Modal>
                
        </Container>
    );
}

function Orgs({data, openModal, joinRso}) {
    return(
        <div className="cardDiv card-elevation3">
            <Card>
            <Card.Header as="h5">{data.rso_name}</Card.Header>
            <Card.Body>
                <Card.Text>
                {data.description}
                {data.isAdmin
                ? <button type="button" className="btn btn-success cardbtn" onClick={openModal}> Create New Event</button>
                : (data.isMember 
                    ? <p className="cardJoined">Joined</p>
                    : <button type="button" className="btn btn-success cardbtn" onClick={()=>joinRso(data.rso_id)}>Join</button>)}
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
}

export default Organizations;
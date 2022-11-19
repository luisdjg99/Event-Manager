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

function Universities(props) {
    const [uniList, setUniList] = useState([]);
    const [univ, setUniv] = useState({});
    const [uni, setUni] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const emptyUni = { university_id: 0, uni_name: '', location_id: '', description:''}
    const [newUni, setNewUni] = useState(emptyUni);

    useEffect(() => {
        loadUniversities();
    }, [])

    function loadUniversities(){
        setNewUni(emptyUni);
        API.getUniversities().then(
            (list) => { 
                setUniList(list.length ? list.map((item) => <Uni key={item.university_id} data={item}/>) :
                <div>
                <img className="notFoundImg" src={noevent} alt="empty state" />
                <h2 className="not-found">No Universities in the Database</h2>
                </div> );
            });  
    }
    function createUni(){
        API.createUni(newUni).then(() => {
            setModalIsOpen(false)
            loadUniversities()
        });
    }
    function handleNewUniChange(event) { 
        setNewUni({...newUni, [event.target.name]: event.target.value})
    } 
    
    return(
        <Container fluid>
            <Row className="event-page">
                                   
                <Col className = "col-results">
                    <div className="event-wrapper">
                        <h2> Universities <a type="button" className="btn btn-success" href="#" role="button" onClick={() => setModalIsOpen(true)}> Add New </a> </h2>
                        {uniList}
                    </div>
                </Col>
            </Row>

            <Modal isOpen={modalIsOpen} 
                        shouldCloseOnOverlayClick={(true)} 
                        onRequestClose={() => setModalIsOpen(false)}
                        ariaHideApp={false}
                        style={{
                            overlay: {backgroundColor: 'rgba(112,128,144,0.90)'},
                            content: {height: '60%', width: '40%'}
                        }}>
                        <div className="modal-org">
                            <Form className="table-new-org">
                                <div>
                                    New University
                                </div>
                                <Form.Control placeholder="University Name" name="uni_name" value={newUni.uni_name} onChange={handleNewUniChange}/>
                                <Form.Control as="textarea"placeholder="Description" rows={3} name="description" value={newUni.description} onChange={handleNewUniChange} />
                                <Form.Control placeholder="Number of Students" name="studentCount" value={newUni.studentCoungt} onChange={handleNewUniChange}/>
                                <Form.Control name="locationName" placeholder="Location Name" name="location_name" value={newUni.location_name} onChange={handleNewUniChange}/>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                        <Form.Control name="latitude" placeholder="latitude" name="latitude" value={newUni.latitude} onChange={handleNewUniChange} />
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                        <Form.Control name="longitude" placeholder="longitude" name="longitude" value={newUni.longitude} onChange={handleNewUniChange}/>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.File id="formcheck-api-custom" custom>
                                    <Form.File.Input isValid />
                                        <Form.File.Label data-browse="Upload">
                                            Upload a picture
                                        </Form.File.Label>
                                        <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                                    </Form.File>
                                
                            </Form>
                            <button className="btn btn-primary btn-modal" onClick={() => setModalIsOpen(false)}> Cancel </button>
                            <button className="btn btn-primary btn-modal" onClick={createUni}> Create </button>
                        </div>
                    </Modal>
                    

            
                
        </Container>
    );
}

function Uni({data}) {
    return(
        <div className="cardDiv card-elevation3">
            <Card>
            <Card.Header as="h5">{data.uni_name}</Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    {data.description}
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
}

export default Universities;
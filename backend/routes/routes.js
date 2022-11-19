var express = require('express');
var router = express.Router();
var controller = require('../controllers/controllers.js');

// create an account

router.post('/create-account', controller.create_account);

// authenticate credentials 

router.get('/authenticate', controller.authenticate);

// create event without an RSO, needs to be added to list of pending for super admin to decide

router.post('/create-event-rso', controller.create_event_with_rso);


// create event with RSO 

router.post('/create-event-norso', controller.create_event_without_rso);

//super admin approves or denies a request for an event without rso

router.post('/approve-event', controller.create_event_without_rso);

// add review to an event, includes rating and comment

router.post('/add-review', controller.add_review);

// edit review of an event

router.post('/add-review', controller.add_review);


// student joins an RSO

router.post('/join-rso', controller.add_user_to_rso);

// for a given user, get all available evets 

router.get('/get-user-events', controller.get_user_events);

// for someone who is not logged in, get all public events

router.get('/get-public-events', controller.get_public_events);

router.get('/get-universities', controller.get_universities);

router.get('/get-university', controller.get_university);

router.get('/get-university-users', controller.get_uiversity_users);

router.post('/create-event', controller.create_event_with_rso);


module.exports = router;
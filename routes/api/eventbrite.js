const express = require("express");
const router = express.Router();
const eventbrite = require("eventbrite").default
const keys = require('../../config/keys');
const apiFunctions = require("../../config/eventbrite_parser")
const sdk = eventbrite({token: keys.eventbriteAuth});

router.get("/attendees", (req, res) => {
    sdk.request('/events/130129525915/attendees/')
    .then(resp => {
    res.json({ tickets: apiFunctions.getUsers(resp) })})
    .catch(e=>res.json(e))
});
// organization id: 216034158017
router.get("/events", (req, res) => {
    sdk.request('/organizations/216034158017/events/?time_filter=current_future')
    .then(resp => {
    res.json({ events : apiFunctions.getEventList(resp) })})
    .catch(e=>res.json(e))
});



module.exports = router;
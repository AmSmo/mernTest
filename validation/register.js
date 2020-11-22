const Validator = require('validator');
const validText = require('./valid-text');



module.exports = function validateRegisterInput(data) {
    
    let errors = {};
    
    data.ticketId = validText(data.ticketId) ? data.ticketId : '';
    
    if (Validator.isEmpty(data.ticketId)) {
        errors.ticketId = 'Ticket Id field is required';
    }
    return {
                errors,
                isValid: Object.keys(errors).length === 0,
            };}


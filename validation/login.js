const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
    let errors = {};
    
    data.ticketId = validText(data.ticketId) ? data.ticketId : '';
    data.username = validText(data.username) ? data.username : '';
    

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
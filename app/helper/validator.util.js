const { errorResponse, successResponse } = require('./response.util.js');

// email validation
// source: https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js
const isEmailValid = (email) => {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email)
        return 'Email can not be empty.';

    if(email.length>254)
        return 'Maximum email lenght is 254.';

    var valid = emailRegex.test(email);
    if(!valid)
        return 'Invalid email format.';

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return 'Invalid email format.';

    var domainParts = parts[1].split(".");
    if(domainParts.some((part) => { return part.length>63; }))
        return 'Invalid email format.';

    return '';
}

const isPasswordValid = (password) => {
    let error = '';

    if(password.length < 8) error = 'Minimum password length is 8';

    return error;
}

exports.validateSignUpBody = (req, res, next) => {
    const { email, password } = req.body;

    // validate email and password
    const errorEmail = isEmailValid(email);
    if(errorEmail != ''){
        return res.status(400).json(errorResponse(errorEmail));
    }

    const errorPassword = isPasswordValid(password);
    if(errorPassword != ''){
        return res.status(400).json(errorResponse(errorPassword));
    }

    next();
}
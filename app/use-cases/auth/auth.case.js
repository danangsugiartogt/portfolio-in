const userAccess = require('../../data-access/users/index.access.js');

exports.addNewUser = async (email, password) => {
    const newUser = await userAccess.createUser(email, password);
    return newUser;
}
const User                  = require('../../models/user.model.js')
    , argon                 = require('argon2')
    , { operationResponse } = require('../../utils/response.util.js');

exports.createUser = async (email, password) => {
    // check user exist
    const existingUser = await User.findOne({ where: { email: email } });
    if(existingUser) return operationResponse(true, 'This email is already used.');

    try{
        console.log(password);
        const hashPassword = await argon.hash(password);
        await User.create({
            name: 'default',
            email: email,
            password: hashPassword,
            type: 'free'
        });

        return operationResponse(false, 'successfully created' );
    }catch(error){
        console.log(error);
        return operationResponse(true, error);
    }
}
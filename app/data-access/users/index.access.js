const User                  = require('../../models/user.model.js')
    , argon                 = require('argon2')
    , { operationResponse } = require('../../utils/response.util.js');

exports.createUser = async (email, password) => {
    // check user exist
    const existingUser = await User.findOne({ where: { email: email } });
    if(existingUser) return operationResponse(true, 400, '', 'This email is already used.');

    try{
        console.log(password);
        const hashPassword = await argon.hash(password);
        await User.create({
            name: 'default',
            email: email,
            password: hashPassword,
            type: 'free'
        });

        return operationResponse(false, 201, '', 'successfully created.' );
    }catch(error){
        return operationResponse(true, 500, '', error);
    }
}

exports.signIn = async (email, password) => {
    // check user exist
    const existingUser = await User.findOne({ where: { email: email } });
    if(!existingUser) return operationResponse(true, 404, '',`This email doesn't exits.`);

    try{
        const isMatched = await argon.verify(existingUser.password, password);
        if(!isMatched) return operationResponse(true, 400, '', `Incorrect password.`);

        return operationResponse(false, 200, { user: existingUser }, 'login successfully.');
    }catch(error){
        console.log(error);
        return operationResponse(true, 500, '', error);
    }
}

exports.getMe = async (email) => {
    try{
        const existingUser = await User.findOne({ where: { email: email } });
        if(!existingUser) return operationResponse(true, 404, '',`This user doesn't exits.`);

        const data = { email: existingUser.email, name: existingUser.name, accountType: existingUser.type };
        return operationResponse(false, 200, data, 'successfully.');
    }catch(error){
        console.log(error);
        return operationResponse(true, 500, '', error);
    }
}
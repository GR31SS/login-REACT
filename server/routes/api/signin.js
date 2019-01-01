const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    /*
     * Sign up
     */
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            password
        } = body;

        let {
            email
        } = body;

        if(!firstName) {
            return res.send({
                success: false,
                message: 'Error: Missing First name'
            });
        }
        if(!lastName) {
            return res.send({
                success: false,
                message: 'Error: Missing Last name'
            });
        }
        if(!email) {
            return res.send({
                success: false,
                message: 'Error: Missing Email'
            });
        }
        if(!password) {
            return res.send({
                success: false,
                message: 'Error: Missing Password'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, previousUsers) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists'
                });
            }
        });

        // Save the new User
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            return res.send({
                success: true,
                message: 'Account Created'
            });
        });
    });
    /*
     * Sign in
     */
    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const {
            password
        } = body;
        let {
            email
        } = body;

        if(!email) {
            return res.send({
                success: false,
                message: 'Error: Missing Email'
            });
        }
        if(!password) {
            return res.send({
                success: false,
                message: 'Error: Missing Password'
            });
        }

        email = email.toLowerCase();

        User.find({
            email: email
        }, (err, users) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            const user = users[0];
            if(!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            // Create User Session
            const userSession = new UserSession();

            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if(err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server Error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Valid Signin',
                    token: doc._id
                });
            });

        });
    });
}
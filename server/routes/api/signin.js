const User = require('../../models/User')

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
        })
        /*
         * Save the new User
         */
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
}
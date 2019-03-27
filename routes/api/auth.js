const express = require('express');
const router = express.Router();
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route POST api/auth
// @desc Auth the user
// @acess Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if ( ! email || ! password) {
        return res.status(400).json({
            msg: 'Please enter all fields.'
        });
    }

    User.findOne({ email })
        .then(user => {
            if ( ! user) return res.status(400).json({ msg: 'User does not exists.' });

            bcript.compare(password, user.password)
            .then(isMatch => {
                if ( ! isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (error, token) => {
                        if (error) throw error;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    }
                );
            });
        });
});

// @route GET api/auth/user
// @desc Get the user data
// @acess Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;

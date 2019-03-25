const express = require('express');
const router = express.Router();
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User model
const User = require('../../models/User');

// @route GET api/users
// @desc Get all users
// @acess Private
router.get('/', auth, (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users.map(user => {
            return user.name;
        })));
});

// @route POST api/users
// @desc Create a user
// @acess Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if ( ! name || ! email || ! password) {
        return res.status(400).json({
            msg: 'Please enter all fields.'
        });
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists.' });
        });

    const newUser = new User({
        name,
        email,
        password
    });

    bcript.genSalt(10, (error, salt) => {
        if (error) throw error;
        bcript.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;
            newUser.password = hash;
            newUser.save()
                .then(user => {
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
});

// @route DELETE api/users/:id
// @desc Delete a user
// @acess Private
router.delete('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user.id === req.user.id) {
                user.remove().then(() => res.json({ success: true }))
            }
        })
        .catch(error => res.status(404).json({ success: false }));
});

module.exports = router;

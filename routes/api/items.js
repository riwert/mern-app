const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all items
// @acess Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ add_date: -1 })
        .then(items => res.json(items));
});

// @route POST api/items
// @desc Create a item
// @acess Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        user: req.body.user
    });

    newItem
        .save()
        .then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete a item
// @acess Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(error => res.status(404).json({ success: false }));
});

module.exports = router;

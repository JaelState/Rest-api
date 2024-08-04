const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Read all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Read a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).send('Name and email are required');
        }
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, email } = req.body;
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('User not found');
        }
        if (!name || !email) {
            return res.status(400).send('Name and email are required');
        }

        user.name = name;
        user.email = email;

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        await user.remove();
        res.status(200).json({ msg: 'User deleted' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;

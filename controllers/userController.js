const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ status: 'success', data: { user: newUser } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 'success', data: { users } });
    } catch (err) {
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        res.status(200).json({ status: 'success', data: { user } });
    } catch (err) {
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        res.status(200).json({ status: 'success', data: { user: updatedUser } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(500).json({ status: 'fail', message: err.message });
    }
};

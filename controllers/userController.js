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
    const userId = req.params.userId;
    const updateData = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (updateData.currentPassword) {
            // Profile settings update
            if (updateData.currentPassword === user.password) { 
                user.email = updateData.email;
                user.password = updateData.newPassword;
            } else {
                return res.status(400).json({ success: false, message: 'Current password is incorrect' });
            }
        } else {
            // Profile update
            user.firstName = updateData.firstName;
            user.lastName = updateData.lastName;
            user.address = updateData.address;
            user.city = updateData.city;
            user.state = updateData.state;
            user.zipCode = updateData.zipCode;
            user.phone = updateData.phone;
        }

        await user.save();
        res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the user' });
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

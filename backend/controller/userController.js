const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const GenerateToken = require("../utils/generateToken")


// @desc Register new user
// @route POST /api/v1/route/signup
// @access public
exports.signup = asyncHandler(async (req, res, next) => {

    const { username, email, password } = req.body;
    if (!password || password.trim().length === 0) {
        return res.status(400).json({
            status: "failed",
            msg: "Password cannot be empty",
        });
    }

    if (password.trim().length < 5) {
        return res.status(400).json({
            status: "failed",
            msg: "Password must be at least 5 characters long",
        });
    }

    const user = await User.findOne({ email });
    if (user) {
        throw new Error("User Already Exists!");
    }

    const newUser = new User({ username, email, password });

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);

    const users = await newUser.save();
    res.json({
        status: "success",
        msg: "User registered successfully!",
        _id: newUser?.id,
        username: newUser?.username,
        email: newUser?.email,
        role: newUser?.role
    })
});


// @desc Login a user
// @route POST /api/v1/route/login
// @access public
exports.login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credientials!");
    }

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
        return res.status(400).json({ status: "failed", msg: "Invalid username or password" });
    }


    res.json({
        status: "success",
        msg: "Login successful",
        _id: user?.id,
        username: user?.username,
        email: user?.email,
        role: user?.role,
        token: GenerateToken(user)
    });
});


// @desc change role (Admin only)
// @route POST /api/v1/route/rolechange
// @access private (Only admin)
exports.updateRole = asyncHandler(async (req, res) => {
    const { userId, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ msg: "User not found!" });
    }

    user.role = role;
    await user.save();

    res.json({ msg: `User role updated to ${role}` });
});


// @desc view a user profile
// @route GET /api/v1/auth/viewProfile
// @access private
exports.viewProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user?.id).select("-password");
    res.json({
        status: "success",
        msg: "View Profile", user
    });
});


// @desc Update user profile
// @route PUT /api/v1/auth/updateProfile
// @access Private (logged-in users only)
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const { username, email, currentPassword, newPassword } = req.body;

    // Find the logged-in user
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    // Update username
    if (username) user.username = username;

    // Update email if different and not already in use
    if (email && email !== user.email) {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ msg: "Email already in use" });
        }
        user.email = email;
    }

    // Secure password change ( current password required)
    if (newPassword) {
        if (!currentPassword) {
            return res.status(400).json({ msg: "Please provide your current password" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
    }

    // Save updated user
    const updatedUser = await user.save();

    res.json({
        status: "success",
        msg: "Profile updated successfully",
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role, // optional
    });
});


// @desc    Admin view all users
// @route   GET /api/v1/route/admin/viewAllUsers
// @access  Private (Admin only)
exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    res.json({
        status: "success",
        msg: "Admin view all users",
        total: users.length,
        users,
    });
});


// @desc Admin update any user profile
// @route PUT /api/v1/route/admin/update/:id
// @access Private (Admin only)
exports.adminUpdateUser = asyncHandler(async (req, res, next) => {
    const { username, email, role } = req.body;

    // find user by id
    const user = await User.findById(req?.params?.id);

    if (!user) {
        return next(new Error("User not found"));
    }

    // admin can update basic info + role
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    const updatedUser = await user.save();

    res.json({
        status: "success",
        msg: "User profile updated by admin",
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
    });
});


// @desc Admin delete any user
// @route DELETE /api/v1/route/admin/delete/:id
// @access Private (Admin only)
exports.adminDeleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    await user.deleteOne();

    res.json({ msg: "User deleted successfully by admin" });
});

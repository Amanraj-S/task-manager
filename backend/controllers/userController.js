// userController.js
const Task = require("../models/Task");
const User = require("../models/User");

// Get all users with their task counts
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "member" }).select("-password");

        const usersWithTaskCounts = await Promise.all(
            users.map(async (user) => {
                // Ensure case/style matches what is stored in your DB ("Pending", "In Progress", "Completed")
                const [pendingTasks, inProgressTasks, completedTasks] = await Promise.all([
                    Task.countDocuments({ assignedTo: user._id, status: "Pending" }),
                    Task.countDocuments({ assignedTo: user._id, status: "In Progress" }),
                    Task.countDocuments({ assignedTo: user._id, status: "Completed" }),
                ]);

                return {
                    ...user.toObject(),
                    pendingTasks,
                    inProgressTasks,
                    completedTasks,
                };
            })
        );

        res.json(usersWithTaskCounts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getUsers, getUserById };

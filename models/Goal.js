const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    priority: {
        type: String,
        default: "Medium"
    },

    deadline: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },

    progress: {
        type: Number,
        default: 0
    },

    reflection: {
        learned: {
            type: String,
            default: ""
        },
        achieved: {
            type: String,
            default: ""
        },
        reflectionText: {
            type: String,
            default: ""
        }
    },

    difficulty: {
        type: String,
        default: ""
    },

    remaining: {
        type: String,
        default: ""
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Goal", goalSchema);
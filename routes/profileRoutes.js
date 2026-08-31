const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

router.get("/", async (req, res) => {
    try {
        const profile = await Profile.findOne().sort({ _id: -1 });
        if (!profile) {
            return res.status(404).json({ message: "No profile found" });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error("GET Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, email, phase } = req.body;

        if (!name || !email || !phase) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const profile = new Profile({ name, email, phase });
        await profile.save();

        res.status(201).json({
            message: "Profile saved successfully",
            profile
        });

    } catch (error) {
        console.error("POST Profile Error:", error);
        res.status(500).json({ message: "Profile save failed" });
    }
});

module.exports = router;
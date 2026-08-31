const express = require("express");

const router = express.Router();

const {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal
} = require("../controllers/goalController");


router.post("/", createGoal);

router.get("/", getGoals);

router.put("/:id", updateGoal);

router.delete("/:id", deleteGoal);


module.exports = router;
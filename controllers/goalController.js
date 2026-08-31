const Goal = require("../models/Goal");
const createGoal = async (req, res) => {

    try {

        const newGoal = new Goal({

            userId: req.body.userId,

            title: req.body.title,

            description: req.body.description,

            priority: req.body.priority,

            deadline: req.body.deadline,

            progress: req.body.progress || 0,

            status: req.body.status || "Pending",

            reflection: {

                learned: req.body.reflection?.learned || "",

                achieved: req.body.reflection?.achieved || "",

                reflectionText:
                    req.body.reflection?.reflectionText || ""
            },

            difficulty: req.body.difficulty || "",

            remaining: req.body.remaining || ""
        });


        const savedGoal = await newGoal.save();


        res.status(201).json(savedGoal);


    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Error creating goal",

            error: error.message
        });
    }
};

const getGoals = async (req, res) => {

    try {

        const userId = req.query.userId;


        if (!userId) {

            return res.status(400).json({

                message: "User ID is required"
            });
        }


        const goals = await Goal.find({

            userId: userId

        }).sort({ _id: -1 });


        res.json(goals);


    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Error fetching goals",

            error: error.message
        });
    }
};

const updateGoal = async (req, res) => {

    try {

        const updatedGoal = await Goal.findOneAndUpdate(

            {
                _id: req.params.id,

                userId: req.body.userId
            },

            {

                title: req.body.title,

                description: req.body.description,

                priority: req.body.priority,

                deadline: req.body.deadline,

                progress: req.body.progress,

                status: req.body.status,

                difficulty: req.body.difficulty,

                remaining: req.body.remaining,

                reflection: {

                    learned:
                        req.body.reflection?.learned || "",

                    achieved:
                        req.body.reflection?.achieved || "",

                    reflectionText:
                        req.body.reflection?.reflectionText || ""
                }
            },

            {
                new: true,

                runValidators: true
            }
        );


        if (!updatedGoal) {

            return res.status(404).json({

                message: "Goal not found"
            });
        }


        res.json(updatedGoal);


    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Error updating goal",

            error: error.message
        });
    }
};




const deleteGoal = async (req, res) => {

    try {

        const deletedGoal = await Goal.findOneAndDelete({

            _id: req.params.id,

            userId: req.query.userId
        });


        if (!deletedGoal) {

            return res.status(404).json({

                message: "Goal not found"
            });
        }


        res.json({

            message: "Goal deleted successfully"
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Error deleting goal",

            error: error.message
        });
    }
};



module.exports = {

    createGoal,

    getGoals,

    updateGoal,

    deleteGoal
};
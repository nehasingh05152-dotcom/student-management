const goalForm = document.getElementById("goalForm");

const userId = localStorage.getItem("userId");

if (!userId) {
    window.location.href = "login.html";
}
async function loadGoal() {

    try {

        const response = await fetch(`https://student-management-8ds2.onrender.com/goals?userId=${userId}`);

        if (!response.ok) {
            throw new Error("Did not fetch goals");
        }

        const goals = await response.json();

        if (goals.length === 0) {

            const savedGoal = document.getElementById("savedGoal");

            if (savedGoal) {
                savedGoal.style.display = "none";
            }

        return;
        }
        const goal = goals[0];

        displayGoal(goal);

    } catch (error) {

        console.error("Load Goal Error:", error);

    }
}

function displayGoal(goal) {

    const savedGoal = document.getElementById("savedGoal");


    if (!savedGoal) {
        return;
    }
    document.getElementById("showTitle").innerText =
        goal.title || "";

    document.getElementById("showDescription").innerText =
        goal.description || "";

    document.getElementById("showPriority").innerText =
        goal.priority || "Medium";

    document.getElementById("showDeadline").innerText =
        goal.deadline || "";

    savedGoal.style.display = "block";
}
goalForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const newGoal = {
        userId: userId,
        title:
            document.getElementById("title").value,
        description:
            document.getElementById("description").value,

        priority:
            document.getElementById("priority").value,

        deadline:
            document.getElementById("deadline").value,
        progress: 0,
        status: "Pending",

        reflection: {

            learned: "",

            achieved: "",

            reflectionText: ""
        },
        difficulty: "",
  remaining: ""
    };
    try {
        const response = await fetch("https://student-management-8ds2.onrender.com/goals", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newGoal)
        });


        if (!response.ok) {

            throw new Error(
                "Goal save nahi hua"
            );
        }
        const savedGoal = await response.json();
        displayGoal(savedGoal);
        goalForm.reset();

        alert(
            "🎯 Goal successfully save ho gaya!"
        );


    } catch (error) {

        console.error(
            "Save Goal Error:",
            error
        );
        alert(
            "❌ Goal save nahi hua!"
        );
    }

});


loadGoal();
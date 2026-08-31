let goal = null;


async function loadGoal() {
    try {

        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("User ID nahi mili. Please login again.");
            return;
        }

        const res = await fetch(
            `https://student-management-8ds2.onrender.com/goals?userId=${encodeURIComponent(userId)}`
        );

        if (!res.ok) {
            throw new Error(`Failed to load goals: ${res.status}`);
        }

        const goals = await res.json();

        if (!Array.isArray(goals)) {
            throw new Error("Goals data is not an array");
        }

        if (goals.length === 0) {
            alert("Pehle goal add karo!");
            return;
        }

        goal = goals[0];

        document.getElementById("progress").value =
            goal.progress || 0;

        document.getElementById("status").value =
            goal.status || "Pending";

        document.getElementById("reflection").value =
            goal.reflection?.reflectionText || "";

        document.getElementById("achievement").value =
            goal.reflection?.achieved || "";

        document.getElementById("difficulty").value =
            goal.difficulty || "";

        document.getElementById("remaining").value =
            goal.remaining || "";

    } catch (error) {

        console.error("Load Goal Error:", error);

        alert("Goal load nahi ho pa raha. Console check karo.");
    }
}


document.querySelector(".update-btn").addEventListener("click", async () => {

    if (!goal) {
        alert("Goal load nahi hua!");
        return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("User ID nahi mili. Please login again.");
        return;
    }

    const data = {

        userId: userId,

        progress: Number(
            document.getElementById("progress").value
        ),

        status:
            document.getElementById("status").value,

        difficulty:
            document.getElementById("difficulty").value,

        remaining:
            document.getElementById("remaining").value,

        reflection: {

            reflectionText:
                document.getElementById("reflection").value,

            achieved:
                document.getElementById("achievement").value,

            learned:
                goal.reflection?.learned || ""
        }
    };


    try {

        const res = await fetch(
            `https://student-management-8ds2.onrender.com/goals/${goal._id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        if (!res.ok) {
            throw new Error(`Update failed: ${res.status}`);
        }

        goal = await res.json();

        alert("💾 Update saved!");

    } catch (error) {

        console.error("Update Error:", error);

        alert("Goal update nahi hua!");
    }
});


document.querySelector(".delete-btn").addEventListener("click", async () => {

    if (!goal) {
        alert("Goal load nahi hua!");
        return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("User ID nahi mili. Please login again.");
        return;
    }


    try {

        const res = await fetch(
            `https://student-management-8ds2.onrender.com/goals/${goal._id}?userId=${encodeURIComponent(userId)}`,
            {
                method: "DELETE"
            }
        );


        if (!res.ok) {
            throw new Error(`Delete failed: ${res.status}`);
        }


        alert("🗑 Goal deleted!");

        location.href = "goals.html";


    } catch (error) {

        console.error("Delete Error:", error);

        alert("Goal delete nahi hua!");
    }
});


loadGoal();
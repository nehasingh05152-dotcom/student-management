async function loadDashboard() {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        window.location.href = "login.html";
        return;
    }

    try {

        let response = await fetch(
            `https://student-management-8ds2.onrender.com/goals?userId=${encodeURIComponent(userId)}`
        );

        if (!response.ok) {
            throw new Error("Did not fetch goals");
        }

        let goals = await response.json();

        let total = goals.length;


        let completed =
            goals.filter(
                goal => goal.status === "Completed"
            ).length;


        let pending =
            goals.filter(
                goal => goal.status !== "Completed"
            ).length;


        let progress = 0;


        if (total > 0) {

            progress =
                goals.reduce(
                    (sum, goal) =>
                        sum + Number(goal.progress || 0),
                    0
                ) / total;

        }


        document.getElementById("totalGoals").textContent =
            total;


        document.getElementById("completedGoals").textContent =
            completed;


        document.getElementById("pendingGoals").textContent =
            pending;


        document.getElementById("overallProgress").textContent =
            Math.round(progress) + "%";


        document.getElementById("progressText").textContent =
            Math.round(progress) + "%";


        document.getElementById("progressFill").style.width =
            Math.round(progress) + "%";


    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}


loadDashboard();
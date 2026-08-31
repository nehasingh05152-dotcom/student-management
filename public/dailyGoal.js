async function loadAllGoals() {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(
            `https://student-management-8ds2.onrender.com/goals?userId=${encodeURIComponent(userId)}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch goals");
        }

        const goals = await response.json();

        const allGoals = document.getElementById("allGoals");

        if (goals.length === 0) {

            allGoals.innerHTML =
                "<p>No goals found.</p>";

            return;
        }

        allGoals.innerHTML = goals.map(goal => `

            <div class="goal-card">

                <h3>${goal.title}</h3>

                <p>
                    ${goal.description || "No description"}
                </p>

                <p>
                    Priority:
                    ${goal.priority || "Medium"}
                </p>

                <p>
                    Status:
                    ${goal.status || "Pending"}
                </p>

                <p>
                    Progress:
                    ${goal.progress || 0}%
                </p>

                <p>
                    Deadline:
                    ${goal.deadline || "No deadline"}
                </p>

            </div>

        `).join("");

    } catch (error) {

        console.error(
            "Load Goals Error:",
            error
        );
    }
}


loadAllGoals();
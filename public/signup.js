let form = document.getElementById("signupForm");

form.addEventListener("submit", async function(e) {

    e.preventDefault();

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    try {

        let response = await fetch(
            "https://student-management-8ds2.onrender.com/auth/signup",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)
            }
        );

        let data = await response.json();

        alert(data.message);

        if (response.ok) {
            window.location.href = "login.html";
        }

    } catch (error) {

        console.error(
            "Error during signup:",
            error
        );

        alert(
            "Server response error. Please check backend connection."
        );
    }

});
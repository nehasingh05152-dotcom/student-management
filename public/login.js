let form = document.getElementById("loginForm");


form.addEventListener("submit", async function(e) {

    e.preventDefault();


    let user = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value
    };


    try {

        let response = await fetch(
            " /auth/login",
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
            localStorage.setItem(
                "userId",
                data.user._id
            );

            localStorage.setItem(
                "userName",
                data.user.name
            );

            localStorage.setItem(
                "userEmail",
                data.user.email
            );


            window.location.href =
                "student-dashboard.html";
        }


    } catch (error) {

        console.error(
            "Error during login:",
            error
        );

        alert(
            "Server error. Please check backend connection."
        );
    }

});
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("profileForm");

    const displayName = document.getElementById("display-name");
    const displayPhase = document.getElementById("display-phase");


    function updateCardUI(name, phase) {

        if (displayName && name) {
            displayName.innerText = name;
        }

        if (displayPhase && phase) {
            displayPhase.innerText = phase;
        }
    }


    function loadProfile() {

        const savedEmail = localStorage.getItem("userEmail");
        const savedName = localStorage.getItem("userName");

        if (savedEmail && document.getElementById("email")) {
            document.getElementById("email").value = savedEmail;
        }

        if (savedName && document.getElementById("name")) {
            document.getElementById("name").value = savedName;
        }

        updateCardUI(savedName, "phase 6");
    }


    loadProfile();


    if (form) {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const nameVal =
                document.getElementById("name").value;

            const emailVal =
                document.getElementById("email").value;

            const phaseVal =
                document.getElementById("phase").value;


            const profileData = {

                name: nameVal,

                email: emailVal,

                phase: phaseVal
            };


            try {

                const response = await fetch(
                    "https://student-management-8ds2.onrender.com/profile",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(profileData)
                    }
                );


                if (!response.ok) {

                    throw new Error(
                        `HTTP Error: ${response.status}`
                    );
                }


                localStorage.setItem(
                    "userName",
                    nameVal
                );

                localStorage.setItem(
                    "userEmail",
                    emailVal
                );


                updateCardUI(
                    nameVal,
                    phaseVal
                );


                alert(
                    "Profile updated successfully!"
                );


            } catch (error) {

                console.error(
                    "Error updating profile:",
                    error
                );

                alert(
                    "Server Error: Profile update nahi hua"
                );
            }

        });
    }
});
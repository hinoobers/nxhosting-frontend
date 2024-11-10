document.addEventListener('DOMContentLoaded', function() {

    if(localStorage.getItem("token")) {
        fetch("http://srv2.byenoob.com:5080/api/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                token: localStorage.getItem("token"),
            }),
        }).then(response => {
            return response.json();
        }
        ).then(data => {
            if(!data.success) {
                console.log("Token verification failed/expired, logging out...");
                localStorage.removeItem("token");
                window.location.reload();
            }
        }).catch(error => {
            console.error('Verification failed', error);
        });

        const parentAuth = document.getElementById("btns");
        const authBtns = document.getElementsByClassName("auth-btn");

        // hide
        for(let i = 0; i < authBtns.length; i++) {
            authBtns[i].style.display = "none";
        }

        // dashboard
        const dashboardBtn = document.createElement("a");
        dashboardBtn.href = "protected/dashboard.html";
        dashboardBtn.innerText = "Dashboard";
        parentAuth.appendChild(dashboardBtn);
    }

});
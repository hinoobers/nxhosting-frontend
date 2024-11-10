document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    const signupForm = document.querySelector('#signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;

            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                if(data.success) {
                    alert(data.error);
                } else {}
            }).catch(error => {
                console.error('Login failed', error);
            });
        });
    }

    if (signupForm) {
        console.log('Signup form detected');
        // Add your signup form handling code here
    }
});
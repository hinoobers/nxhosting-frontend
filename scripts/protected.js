// Check if the current page is protected
function isProtectedPage() {
    const protectedPages = ['/protected/'];
    return protectedPages.some(page => window.location.pathname.startsWith(page));
}

// Check if the user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

// Verify the token's validity
async function verifyToken() {
    try {
        const response = await fetch('http://srv2.byenoob.com:5080/api/verify', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                token: localStorage.getItem("token")
            }),
        });
        return (await response.json()).success;
    } catch (error) {
        console.error('Token verification failed:', error);
        return false;
    }
}

// Protect the page if needed
async function protectPage() {
    if (isProtectedPage() && !isLoggedIn() || !(await verifyToken())) {
        window.location.href = '/index.html';
    }
}

// Initialize protection logic on page load
window.addEventListener('load', protectPage);

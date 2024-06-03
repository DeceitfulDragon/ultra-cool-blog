// Login function
const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

// Logout function
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out');
    }
};

// Event listeners for login/logout buttons
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('#logout');
    const loginForm = document.querySelector('.login-form');

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', loginFormHandler);
    }
});

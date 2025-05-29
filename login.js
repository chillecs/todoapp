const loginUsers = [
    { username: 'admin', password: 'admin123'},
    { username: 'user', password: 'user123' }
];

// if already logged in, redirect to homepage
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedInUser')) {
        window.location.href = 'homepage.html';
    }
});

const loginDetails = localStorage.setItem('loginUsers', JSON.stringify(loginUsers));

const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('submitbtn');
const passwordField = document.getElementById('password');
const usernameField = document.getElementById('username');
const errorMessage = document.getElementById('errorMessage');
const logoutButton = document.getElementById('logoutbtn');
const addTaskBtn = document.getElementById('addTaskBtn');

loginButton.addEventListener('click', function(e) {
    e.preventDefault();
    const usernameValue = usernameField.value;
    const passwordValue = passwordField.value;
    const loginUsers = JSON.parse(localStorage.getItem('loginUsers')) || [];

    const user = loginUsers.find(user => user.username === usernameValue && user.password === passwordValue);
    if (!user) {
        usernameField.focus();
        errorMessage.innerText = 'Invalid username or password!';
        errorMessage.style.backgroundColor = 'rgb(245, 137, 137)';
        passwordField.value = '';
        usernameField.value = '';
    } else {
        loginButton.innerText = 'Redirecting...';
        setTimeout(() => {
            loginButton.disabled = true;
            window.location.href = 'homepage.html';
        }, 2000);
    }
});

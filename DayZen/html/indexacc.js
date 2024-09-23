// When the page loads, retrieve the value from localStorage
document.addEventListener('DOMContentLoaded', function() {

    const name = localStorage.getItem('username');

    if (name) {
      document.querySelector('.welcome').textContent = `Welcome, ${name}!`;
    } else {
      document.querySelector('.welcome').textContent = 'Welcome, Guest!';
    }

   
  });
  
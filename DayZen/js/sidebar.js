// Sidebar toggle functionality
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.getElementById('sidebar');

// Toggle sidebar open/close
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
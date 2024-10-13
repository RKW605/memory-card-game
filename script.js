// script.js

// Function to set the theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        document.getElementById('themeButton').innerHTML = '🌙'; // Set to moon icon
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        document.getElementById('themeButton').innerHTML = '☀️'; // Set to sun icon
    }
}

// Check local storage for theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('light'); // Default theme
    }

    // Theme switcher functionality
    const themeButton = document.getElementById('themeButton');
    themeButton.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    // Home button functionality
    const homeButton = document.getElementById('homeButton');
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Navigate to home page
    });

    // Difficulty buttons functionality
    const difficultyButtons = document.querySelectorAll('.difficulty-button');
    difficultyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const difficulty = event.target.getAttribute('data-difficulty');
            window.location.href = `${difficulty}.html`; // Navigate to the appropriate difficulty page
        });
    });
});

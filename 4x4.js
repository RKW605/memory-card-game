const emojis = [
    '🍎', '🍌', '🍒', '🍇', 
    '🍉', '🍊', '🍋', '🥭', 
];

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let timerInterval;
let seconds = 0;
let timerStarted = false; // To track if the timer has already started

// Timer elements
const timerElement = document.getElementById('timer');
const board = document.getElementById('board');

// Home button functionality
document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect to home page
});

// Dark and light mode toggle
document.getElementById('modeToggle').addEventListener('change', function () {
    const isDarkMode = this.value === 'dark';
    document.body.classList.toggle('dark-mode', isDarkMode);
    timerElement.style.color = isDarkMode ? '#FFD700' : '#000080'; // Yellow in dark, navy in light
});

// Function to start the timer
function startTimer() {
    if (timerStarted) return; // Don't restart if timer is already running
    timerStarted = true; // Timer started
    
    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

// Function to update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerElement.innerText = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Function to create the board
function createBoard() {
    const shuffledEmojis = shuffle([...emojis, ...emojis].slice(0, 16)); // Duplicate emojis for pairs
    shuffledEmojis.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

// Function to shuffle emojis
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to flip the card
function flipCard() {
    if (lockBoard) return; // Prevent flipping if board is locked
    if (this === firstCard) return; // Prevent flipping the same card
    if (this.classList.contains('matched')) return; // Prevent flipping matched cards

    this.classList.add('flipped'); // Add flipped class
    this.innerHTML = this.dataset.emoji; // Reveal the emoji
    startTimer(); // Start the timer when the first card is clicked

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Function to check for a match
function checkForMatch() {
    const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    isMatch ? disableCards() : unflipCards();
}

// Function to disable matched cards
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();

    // Check if all cards are matched
    const allCards = document.querySelectorAll('.card');
    const matchedCards = document.querySelectorAll('.card.matched');
    
    if (allCards.length === matchedCards.length) {
        alert('Congratulations! You have matched all the cards!'); // Victory message
        clearInterval(timerInterval); // Stop the timer when game is won
    }
}

// Function to unflip unmatched cards
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = ''; // Hide emoji
        secondCard.innerHTML = ''; // Hide emoji
        resetBoard();
    }, 1000);
}

// Function to reset board state
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Initialize the game
createBoard();

const words = ["javascript", "hangman", "coding", "programming", "developer"];
let selectedWord = "";
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6;
let attempts = 0;

const elements = {
    wordDisplay: document.getElementById("wordDisplay"),
    wrongLettersDisplay: document.getElementById("wrongLetters"),
    hangmanImage: document.getElementById("hangman"),
    letterInput: document.getElementById("letterInput"),
    guessButton: document.getElementById("guessButton"),
    restartButton: document.getElementById("restartButton"),
    messageDisplay: document.getElementById("message")
};

function initializeGame() {
    selectedWord = getRandomWord();
    guessedLetters = [];
    wrongLetters = [];
    attempts = 0;
    updateDisplay();
    elements.messageDisplay.textContent = "";
    elements.restartButton.style.display = "none";
    elements.guessButton.disabled = false;
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function updateDisplay() {
    elements.wordDisplay.textContent = getWordDisplay();
    elements.wrongLettersDisplay.textContent = `Wrong Letters: ${wrongLetters.join(", ")}`;
    updateHangmanImage();
    checkGameStatus();
}

function getWordDisplay() {
    return selectedWord.split("").map(letter => (guessedLetters.includes(letter) ? letter : "_")).join(" ");
}

function updateHangmanImage() {
    elements.hangmanImage.src = `./assets/images/hangman${attempts}.png`; // Ensure you have images named hangman0.png, hangman1.png, etc.
}

function checkGameStatus() {
    if (attempts >= maxAttempts) {
        elements.messageDisplay.textContent = `Game Over! The word was "${selectedWord}".`;
        endGame();
    } else if (!elements.wordDisplay.textContent.includes("_")) {
        elements.messageDisplay.textContent = "Congratulations! You've guessed the word!";
        endGame();
    }
}

function endGame() {
    elements.guessButton.disabled = true;
    elements.restartButton.style.display = "inline";
}

function handleGuess() {
    const letter = elements.letterInput.value.toLowerCase();
    elements.letterInput.value = "";

    if (isValidGuess(letter)) {
        if (selectedWord.includes(letter)) {
            guessedLetters.push(letter);
        } else {
            wrongLetters.push(letter);
            attempts++;
        }
        updateDisplay();
    }
}

function isValidGuess(letter) {
    return letter && !guessedLetters.includes(letter) && !wrongLetters.includes(letter);
}

// Event Listeners
elements.guessButton.addEventListener("click", handleGuess);
elements.restartButton.addEventListener("click", initializeGame);

// Start the game for the first time
initializeGame();
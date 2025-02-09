const words = ["javascript", "hangman", "coding", "programming", "developer"];
let selectedWord = "";
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6;
let attempts = 0;

const wordDisplay = document.getElementById("wordDisplay");
const wrongLettersDisplay = document.getElementById("wrongLetters");
const hangmanImage = document.getElementById("hangman");
const letterInput = document.getElementById("letterInput");
const guessButton = document.getElementById("guessButton");
const restartButton = document.getElementById("restartButton");
const messageDisplay = document.getElementById("message");

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongLetters = [];
    attempts = 0;
    updateDisplay();
    messageDisplay.textContent = "";
    restartButton.style.display = "none";
}

function updateDisplay() {
    wordDisplay.textContent = selectedWord.split("").map(letter => (guessedLetters.includes(letter) ? letter : "_")).join(" ");
    wrongLettersDisplay.textContent = `Wrong Letters: ${wrongLetters.join(", ")}`;
    hangmanImage.src = `hangman${attempts}.png`;
    
    if (attempts >= maxAttempts) {
        messageDisplay.textContent = `Game Over! The word was "${selectedWord}".`;
        guessButton.disabled = true;
        restartButton.style.display = "inline";
    } else if (!wordDisplay.textContent.includes("_")) {
        messageDisplay.textContent = "Congratulations! You've guessed the word!";
        guessButton.disabled = true;
        restartButton.style.display = "inline";
    }
}

guessButton.addEventListener("click", () => {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = "";
    
    if (letter && !guessedLetters.includes(letter) && !wrongLetters.includes(letter)) {
        if (selectedWord.includes(letter)) {
            guessedLetters.push(letter);
        } else {
            wrongLetters.push(letter);
            attempts++;
        }
        updateDisplay();
    }
});

restartButton.addEventListener("click", startGame);

startGame();
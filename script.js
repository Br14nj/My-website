const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const hint = document.getElementById("hint"); // Grab hint container
const submitBtn = document.getElementById("submitGuess");
const restartBtn = document.getElementById("restartGame");

function displayHint() {
  hint.textContent = 🕵️ Hint: The word starts with '${secretWord[0].toUpperCase()}' and has ${secretWord.length} letters.;
}

function checkGuess() {
  let guess = input.value.trim().toLowerCase();

  if (guess === "") {
    message.textContent = Incorrect guess. You have ${attemptsLeft - 1} attempts left. Try again!;
    attemptsLeft--;
  } else if (guess === secretWord) {
    message.textContent = "🎉 Congratulations! You guessed the secret word!";
    document.body.style.backgroundColor = "#c8e6c9";
    hint.textContent = "";
    endGame();
  } else {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      message.textContent = Incorrect guess. You have ${attemptsLeft} attempts left. Try again!;
    } else {
      message.textContent = ❌ Game over! The secret word was '${secretWord}'.;
      document.body.style.backgroundColor = "#ffcdd2";
      hint.textContent = "";
      endGame();
    }
  }

  input.value = "";
  if (attemptsLeft > 0) {
    displayHint(); // Show hint only if game is still ongoing
  }
}

function endGame() {
  submitBtn.disabled = true;
  input.disabled = true;
  restartBtn.style.display = "inline-block";
}

function restartGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  attemptsLeft = 5;
  console.log("New Secret Word:", secretWord);
  message.textContent = "";
  hint.textContent = "";
  input.value = "";
  input.disabled = false;
  submitBtn.disabled = false;
  restartBtn.style.display = "none";
  document.body.style.backgroundColor = "white";
  displayHint(); // Show new hint for restarted game
}

submitBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", restartGame);
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

displayHint(); // Show initial hint
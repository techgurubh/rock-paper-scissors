const choices = document.querySelectorAll(".choice");
const choicesDiv = document.querySelector(".choices");
const battle = document.getElementById("battle");

const playerHand = document.getElementById("playerHand");
const computerHand = document.getElementById("computerHand");

const result = document.getElementById("result");
const userScoreEl = document.getElementById("userScore");
const compScoreEl = document.getElementById("compScore");

const sounds = {
  click: document.getElementById("clickSound"),
  win: document.getElementById("winSound"),
  lose: document.getElementById("loseSound"),
  draw: document.getElementById("drawSound")
};

let userScore = 0;
let compScore = 0;

const options = ["rock", "paper", "scissors"];

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    sounds.click.play();
    startBattle(choice.dataset.choice);
  });
});

function startBattle(userChoice) {
  choicesDiv.style.display = "none";
  battle.classList.remove("hidden");
  result.textContent = "";

  const compChoice = options[Math.floor(Math.random() * 3)];

  playerHand.src = "images/rock.png";
  computerHand.src = "images/rock.png";

  playerHand.classList.add("shake");
  computerHand.classList.add("shake");

  setTimeout(() => {
    playerHand.classList.remove("shake");
    computerHand.classList.remove("shake");

    playerHand.src = `images/${userChoice}.png`;
    computerHand.src = `images/${compChoice}.png`;

    showResult(userChoice, compChoice);

    setTimeout(resetGame, 2000);
  }, 2500);
}

function showResult(user, comp) {
  if (user === comp) {
    result.textContent = "🤝 Draw!";
    sounds.draw.play();
    return;
  }

  const win =
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper");

  if (win) {
    userScore++;
    result.textContent = "🎉 You Win!";
    sounds.win.play();
  } else {
    compScore++;
    result.textContent = "😢 You Lose!";
    sounds.lose.play();
  }

  userScoreEl.textContent = userScore;
  compScoreEl.textContent = compScore;
}

function resetGame() {
  battle.classList.add("hidden");
  choicesDiv.style.display = "flex";
}

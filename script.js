
var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0; //initially first player's turn
var gameEnd = false;
var diceImage = document.querySelector(".dice");

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function newGame() {
    //reset total score
    document.querySelector("#score--0").textContent = 0;
    document.querySelector("#score--1").textContent = 0;

    //reset current score
    document.querySelector("#current--0").textContent = 0;
    document.querySelector("#current--1").textContent = 0;

    //reset the names
    document.querySelector(`#name--0`).textContent = "Player 1";
    document.querySelector(`#name--1`).textContent = "Player 2";

    //remove the winner class to show default 
    document.querySelector(`.player--0`).classList.remove("player--winner");
    document.querySelector(`.player--1`).classList.remove("player--winner");

    //make player 1 active player
    document.querySelector(`.player--0`).classList.remove("player--active");
    document.querySelector(`.player--0`).classList.add("player--active");
    document.querySelector(`.player--1`).classList.remove("player--active");

    gameEnd = false;
    scores[0] = 0;
    scores[1] = 0;
    roundScore = 0;
    activePlayer = 0;
    diceImage.style.display = "none";
}

newGame();

function changeTurn() {

    //show the total score and change the active player + interface
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    activePlayer = (activePlayer == 0) ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
    roundScore = 0;
}

var diceBtn = document.querySelector(".btn--roll");
diceBtn.addEventListener("click", () => {
    if (!gameEnd) {
        //make the dice visible and change according to dice number
        diceImage.style.display = "block";
        let diceScore = rollDice();
        diceImage.src = `dice-${diceScore}.png`;

        //if 1 is rolled, change active player
        if (diceScore == 1) {
            scores[activePlayer] = 0;
            changeTurn();
            return;
        }

        //if anything rolled other than 1, calculate score
        roundScore = roundScore + diceScore;
        console.log(roundScore);
        document.querySelector(`#current--${activePlayer}`).textContent = roundScore;
    }

});

var holdBtn = document.querySelector(".btn--hold");
holdBtn.addEventListener("click", () => {

    if (!gameEnd) {
        //add current score to total score
        scores[activePlayer] += roundScore;

        //determine winner
        if (scores[activePlayer] >= 50) {
            document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`#name--${activePlayer}`).textContent = "WINNER!!";
            gameEnd = true;

            return;
        }
        changeTurn();

    }

});

var newGameBtn = document.querySelector(".btn--new");
newGameBtn.addEventListener("click", newGame);
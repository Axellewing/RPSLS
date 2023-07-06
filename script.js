const OPTIONS = [
    {
        name: "rock",
        url: "./assets/icons/rock.svg",
        wins: ["scissors", "lizard"]
    },
    {
        name: "paper",
        url: "./assets/icons/paper.svg",
        wins: ["rock", "spock"]
    },
    {
        name: "scissors",
        url: "./assets/icons/scissors.svg",
        wins: ["paper", "lizard"]
    },
    {
        name: "lizard",
        url: "./assets/icons/lizard.svg",
        wins: ["spock", "paper"]
    },
    {
        name: "spock",
        url: "./assets/icons/spock.svg",
        wins: ["scissors", "rock"]
    },
];

const OUTCOMES = [
    {
        text: 'Scissors cuts paper.',
        winner: 'scissors',
        loser: 'paper'
    },
    {
        text: 'Paper covers rock.',
        winner: 'paper',
        loser: 'rock'
    },
    {
        text: 'Rock crushes lizard.',
        winner: 'rock',
        loser: 'lizard'
    },
    {
        text: 'Lizard poisons Spock.',
        winner: 'lizard',
        loser: 'spock'
    },
    {
        text: 'Spock smashes scissors.',
        winner: 'spock',
        loser: 'scissors'
    },
    {
        text: 'Scissors decapitates lizard.',
        winner: 'scissors',
        loser: 'lizard'
    },
    {
        text: 'Lizard eats paper.',
        winner: 'lizard',
        loser: 'paper'
    },
    {
        text: 'Paper disproves Spock.',
        winner: 'paper',
        loser: 'spock'
    },
    {
        text: 'Spock vaporizes rock.',
        winner: 'spock',
        loser: 'rock'
    },
    {
        text: 'Rock crushes scissors.',
        winner: 'rock',
        loser: 'scissors'
    }
];

const titleScreen = document.querySelector(".title-screen");
const gameContainer = document.querySelector(".game");
const difficultyButtons = document.querySelectorAll(`[data-difficulty]`);
const gameEnded = document.querySelector(".game-ended");
const displayGameWinner = document.querySelector(".final-winner");
const resetButton = document.querySelector(".play-again");


let difficulty = "normal";
let playerChoice = "";
let winner = "";

let round = 0;
let playerScore = 0;
let computerScore = 0;

const displayPlayerScore = document.querySelector(".player-score");
const displayComputerScore = document.querySelector(".computer-score");

const displayPlayerScoreFinal = document.querySelector(".player-score-final");
const displayComputerScoreFinal = document.querySelector(".computer-score-final");

let roundWinner = document.querySelector(".round-winner ");

//When player selects a difficulty
//the difficulty is updated and we remove the title screen
//and display the main game
difficultyButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        titleScreen.classList.remove("active");
        gameContainer.classList.add("active");
        difficulty = button.dataset.difficulty;
    });
});

//Text that displays who won and why
const displayText = document.querySelector(".display-text");

//Hand that won the round
let winningHand = "";
//Hand that lost the round
let losingHand = "";

//Icon gets displayed based on player selection
const playerIcon = document.querySelector("#player-choice");
//Icon gets displayed based on computer selection
const computerIcon = document.querySelector("#computer-choice");

//Selects all the available choices with special data-value attribute
const choices = document.querySelectorAll(`[data-value]`);

//Function adds an event listener that fires every time one of the 
//Icons is clicked
choices.forEach(function(choice) {
    choice.addEventListener("click", function() {
        //player choice gets updated to the selected value
        playerChoice = choice.dataset.value;

        //Calls function to see who won
        handleCheck(playerChoice, getComputerChoice(playerChoice));
    });
});

//Custom Game Modes
//Player always wins
function playerAlwaysWins(player) {
    let randomChoice = Math.floor(Math.random() * 2);
    let result = "";

    OPTIONS.forEach(function(option) {
        if (option.name === player) {
            result = option.wins[randomChoice];
        }
    });

    return result;
}

//Player has 66% chance of winning
function EasyMode(player) {
    let probability = Math.random().toFixed(2);

    if(probability <= 0.66) {
        return playerAlwaysWins(player);
    } else {
        return NormalMode();
    }

}

//Player has 50/50 chance of winning
function NormalMode () {
    let random = Math.floor(Math.random() * OPTIONS.length);
    console.log("Normal Mode");
    return OPTIONS[random].name;
}

//Computer always wins
function ImpossibleMode(player) {
    let randomChoice = Math.floor(Math.random() * 2);
    let result = OPTIONS.filter(option => option.wins.includes(player));
    console.log("Impossible Mode");
    return result[randomChoice].name;
}

//Computer wins 66% of the time
function HardMode(player) {
    let probability = Math.random().toFixed(2);

    if (probability <= 0.66) {
        return ImpossibleMode(player);
    } else {
        return NormalMode(player);
    }
}

//Computer always throws 'spock'
//Reference to The Big Bang Theory
function SheldonCooper() {
    let result = OPTIONS.filter((option) => option.name === "spock");

    return result[0].name;
}


function getComputerChoice(player) {

    let choice = "";

    //computer selection based on difficulty
    if (difficulty === "easy") {
        choice = EasyMode(player);
    }
    if (difficulty === "normal") {
        choice = NormalMode();
    }
    if (difficulty === "hard") {
        choice = HardMode(player);
    }
    if (difficulty === "impossible") {
        choice = ImpossibleMode(player);
    }
    if (difficulty === "sheldon") {
        choice = SheldonCooper();
    }

    return choice;
}

//Runs every time the player selects an option
//and checks to see who won the round
function handleCheck(player, computer) {

    //displays the players and computer choice to the DOM
    OPTIONS.forEach(function(option) {
        if (option.name === player) {
            playerIcon.src = option.url;
        }
        if (option.name === computer) {
            computerIcon.src = option.url;
        }
    });

    //Check to see who won if it is not a draw
    if (player !== computer) {
        OPTIONS.forEach((option) => {
            if (option.name === player) {
                if (option.wins.find((value) => value === computer)) {
                    winner = "Player";
                    roundWinner.innerText = "Player Won!";
                    playerScore++;
                    winningHand = player;
                    losingHand = computer;
                    displayPlayerScore.innerText = playerScore;
                } else {
                    winner = "Computer";
                    roundWinner.innerText = "Computer Won!";
                    winningHand = computer;
                    losingHand = player;
                    computerScore++;
                    displayComputerScore.innerText = computerScore;
                }
            }
        });
    } else {
        //If the round ended in a draw, update the display text and the winner accordingly
        winner = "DRAW";
        winningHand = "";
        losingHand = "";
    }

    //Sets the display text to explain who won and why
    if(winningHand !== "" && losingHand !== "") {
        OUTCOMES.forEach((outcome) => {
            if(outcome.winner === winningHand && outcome.loser === losingHand) {
                displayText.innerText = outcome.text;
            }
        });
    } else {
        //If both player and computer have the same choice
        //rounds ends in a draw
        displayText.innerText = "Round ended in a Draw";
        roundWinner.innerText = "No Winner";
    }

    //Every time this function runs, it updates the round count by 1
    round++;

    //If the round reaches 5, check to see who won and go to the ending screen
    if(round === 5) {
        //If the computer score and player score are not the same, see who won
        if(computerScore !== playerScore) {
            winner = computerScore > playerScore ? "Computer" : "Player";
            displayGameWinner.innerText = "Game ended in " + winner + " Victory";
        }else {
            //If compter and player score are the same, game ended in a draw
            winner = "DRAW";
            displayGameWinner.innerText = "Game ended in a Draw";
        }
        //Remove the game container and display the end game container
        gameContainer.classList.remove("active");
        gameContainer.classList.add("disabled");
        gameEnded.classList.add("active");
        //Display the final scores of the player and the computer
        displayPlayerScoreFinal.innerText = playerScore;
        displayComputerScoreFinal.innerText = computerScore;
    }
}

//Reset the game
//This function resets everything back to it's default values
resetButton.addEventListener("click", function() {
    playerScore = 0;
    computerScore = 0;
    winner = "";
    round = 0;
    gameEnded.classList.remove("active");
    gameContainer.classList.remove("active");
    gameContainer.classList.add("disabled");
    titleScreen.classList.add("active");
    displayComputerScore.innerText = 0;
    displayPlayerScore.innerText = 0;
    roundWinner.innerText = "";
    playerIcon.src = "./assets/icons/placeholder.svg";
    computerIcon.src = "./assets/icons/placeholder.svg";
});
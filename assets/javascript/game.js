// VARIABLES

//The array of words that will be chosen at random
var words = ["test", "hello", "world"]

//Start with score of 0
var score = 0

//Start with empty secretWord and secretDisplay variables
var secretWord = ""
var secretDisplay = ""
var workshop = ""

//Start with empty lettersGuessed and wrongLetters string/array
var lettersGuessed = ""
var wrongLetters = []
var numGuesses = 8
var numWins = 0

//FUNCTIONS

//Function to choose the word
function chooseWord() {
    secretWord = words[Math.floor(Math.random()*words.length)];
}

//Function to create display word
function createDisplay() {
	for (i = 0; i < secretWord.length; i++) {
	secretDisplay = secretDisplay + "_"
    }
    }

//Function to update the secretWord
function updateWord() {
    var workshop = ""
    for (i = 0; i < secretWord.length; i++) {
        if (lettersGuessed.includes(secretWord[i])) {
            workshop = workshop + secretWord[i]
        }
        else {
            workshop = workshop + "_"
        }
    }
}

//Function to display word in DOM
function updateDisplay() {
    document.getElementById("display").innerHTML = secretDisplay;
    document.getElementById("lettersGuessed").innerHTML = lettersGuessed
}

//Function to update number of guesses
function updateGuesses() {
    document.getElementById("guesses").innerHTML = "Guesses: " + numGuesses
}

//Function to check if word is guessed
function isWordGuessed() {
    for (i = 0; i < secretWord.length; i++) {
        if ((lettersGuessed.includes(secretWord[i])) === false) {
            return false;
        }
    }
    numWins++
    console.log(numWins);
    document.getElementById("wins").innerHTML = "Wins: " + numWins;
    return true;
}

//Function to wait ms milliseconds
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

//Function to start a new game
function newGame() {
    chooseWord();
    secretDisplay = "";
    workshop = "";
    lettersGuessed = "";
    numGuesses = 8;
    updateGuesses();
    createDisplay();
    updateDisplay();
}

//MAIN PROCESS

chooseWord();
createDisplay();
updateDisplay();

//When user presses key
document.onkeyup = function(event) {

//If this is a letter that has not been previously guessed
    if (lettersGuessed.includes(event.key) === false) {
        guess = event.key;

//Add the letter to list of guessed letters
        lettersGuessed = lettersGuessed + guess

//If the letter is not in the word
        if (secretWord.includes(guess) === false) {
            numGuesses -= 1;
            updateGuesses();

//If the user is out of guesses
//Also, this clause is not currently being tested because a new game starts immediately when numGuesses = 0
            if (numGuesses === 0) {
                var guessDOM = document.getElementById("guesses");
                var youLose = document.createElement("div");
                youLose.textContent = "You lose haha you suck";
                guessDOM.appendChild(youLose);
            }
        }
        
        var workshop = ""

//Function to update which "secret word" letters are displayed in DOM        
        for (i = 0; i < secretWord.length; i++) {
            if (lettersGuessed.includes(secretWord[i])) {
            workshop = workshop + secretWord[i]
            }
        
            else {
            workshop = workshop + "_"
            }
        }
//Convert "workshop" to secretDisplay which is the variable that will be shown
    secretDisplay = workshop
    updateDisplay()

//This is causing problems right now. Basically when I try to use the wait function, it doesn't complete the last "updateGuess" and say "haha you suck"... will come back to this later
    // if (isWordGuessed() || document.getElementById("guesses").innerHTML === "Guesses: 0<div>You lose haha you suck</div>") {
    //     wait(3000);

    if (isWordGuessed() || numGuesses === 0) {
        newGame();
    }
}
}


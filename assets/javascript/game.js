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
var wrongLetters = ""
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
    document.getElementById("lettersGuessed").innerHTML = wrongLetters
}

//Function to ensure key is part of alphabet
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
    // return str.toLowerCase() != str.toUpperCase();
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
    return true;
}

//Function to update wins
function updateWins() {
    numWins++
    document.getElementById("wins").innerHTML = "Wins: " + numWins;
}

//Function to wait ms milliseconds
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

 //Function to play audio
function playSound(){
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay"> <source src="./assets/audio/cheer.mp3" type="audio/mp3"> </audio>';
  }

//Function to start a new game
function newGame() {
    chooseWord();
    secretDisplay = "";
    workshop = "";
    lettersGuessed = "";
    wrongLetters = "";
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
    if (lettersGuessed.includes(event.key) === false && isLetter(event.key)) {
        guess = event.key;
        guess = guess.toLowerCase();

//Add the letter to list of guessed letters
        lettersGuessed = lettersGuessed + guess

//If the letter is not in the word
        if (secretWord.includes(guess) === false) {
            numGuesses -= 1;
            wrongLetters = wrongLetters + guess.toUpperCase() + " "
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

    if (isWordGuessed()) {
        var cheer = document.getElementById("cheer");
        playSound(cheer);
        updateWins();
        newGame();
    }

    if (numGuesses === 0) {
        newGame();
    }

}
}


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
}

//Function to update number of guesses
function updateGuesses() {
    document.getElementById("guesses").innerHTML = "Guesses: " + guess
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
    document.getElementById("wins").innerHTML = numWins;
    return true;
}

//Function to start a new game
function newGame() {
    chooseWord();
    secretDisplay = "";
    workshop = "";
    lettersGuessed = "";
    numGuesses = 8;
    createDisplay();
    updateDisplay();
}

//MAIN PROCESS

chooseWord();
createDisplay();
updateDisplay();

document.onkeyup = function(event) {
    if (lettersGuessed.includes(event.key) === false) {
        guess = event.key;
        lettersGuessed = lettersGuessed + guess
        console.log(guess);
        console.log(lettersGuessed);
        if (secretWord.includes(guess) === false) {
            numGuesses -= 1;
            console.log(numGuesses)
            if (numGuesses === 0) {
                document.getElementById("guesses").textContent = "You're out of guesses haha you suck";
            }
        }
        var workshop = ""
        for (i = 0; i < secretWord.length; i++) {
            if (lettersGuessed.includes(secretWord[i])) {
            workshop = workshop + secretWord[i]
            }
        
            else {
            workshop = workshop + "_"
            }
        }


    
    secretDisplay = workshop
    // workshop = ""
    updateDisplay()

    if (isWordGuessed()) {
        newGame();
    }
}
}


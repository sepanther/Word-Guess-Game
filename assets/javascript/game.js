// VARIABLES

//The array of words that will be chosen at random
var words = ["test"]

//Start with score of 0
var score = 0

//Start with empty secretWord and secretDisplay variables
var secretWord = ""
var secretDisplay = ""

//Start with 

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

//Function to display word in DOM
function updateDisplay() {
    document.getElementById("display").innerHTML = secretDisplay;
}

//Function to update number of guesses
function updateGuesses() {
    document.querySelector("guesses").innerHTML = "Guesses: " + guess
}

//Function to update letters guessed
function updateLettersGuessed() {

}

//MAIN PROCESS

chooseWord();
createDisplay();
updateDisplay();



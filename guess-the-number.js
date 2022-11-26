/*
Guess the number game, Auden Woolfson

TODO:
    - add functions for ending and starting rounds for a sort of states paridigm
    - build a section for best rounds based on a users rounds with
    the lowest ratio of guesses to range
    -handle different users
*/


let guessCount=0;
let currentNumber;

function generateNumber() {
    //starts a round
    let lowerBound = parseInt(document.getElementById("lower-bound-input").value);
    let upperBound = parseInt(document.getElementById("upper-bound-input").value);
    currentNumber = randInt(lowerBound, upperBound);

    let signs = decideSign(lowerBound, upperBound);
    document.getElementById("numberReveal").innerHTML 
    = `${lowerBound}` + " " + signs[0] +  " ? " + signs[1] + " " + `${upperBound}`;

    //document.getElementById("currentNumber").innerHTML = `${currentNumber}`;
    //above line used for testing
    guessCount = 0;
    updateGuessCounter();
    document.getElementById("messages").innerHTML = "";
}

function decideSign(lower, upper) {
    //logic for signs used in numberReveal element
    let signs = ["", ""];
    if (lower > upper) {
        signs[1] = ">";
        if ((lower - upper) == 1) {
            signs[0] = String.fromCharCode(8805);
        } else {
            signs[0] = ">";
        }
    } else {
        signs = [String.fromCharCode(8804), String.fromCharCode(8804)];
    }
    return signs;
}

function randInt(lowerBound, upperBound) {
    //quick way to get a random integer
    let randomNumber = parseInt(Math.floor(Math.random() * (upperBound+1-lowerBound)) + lowerBound);
    return randomNumber;
}

function guess() {
    //activates upon the user pressing the guess button
    guessCount += 1;
    updateGuessCounter();
    let currentGuess = parseInt(document.getElementById("guess-number-input").value);
    if (currentGuess == currentNumber) {
        correctGuessSequence();
    } else {
        document.getElementById("messages").innerHTML = "Wrong, guess again :(";
    }
}

function updateGuessCounter() {
    let generateNumber = document.getElementById("counter").innerHTML = guessCount;
}

function correctGuessSequence() {
    let totalGuesses = guessCount;
    let guessGrammar = "";
    if (totalGuesses==1) {
        guessGrammar="guess";
    } else {
        guessGrammar="guesses";
    }
    document.getElementById("messages").innerHTML 
    = "Correct! You got it in " + String(totalGuesses) 
    + " " + guessGrammar + ", press \"generate a new number\" to go again!";

    //endRound();
}

function giveUp() {
    //activates upon the user pressing the give up button
    let numberRevealElement = String(document.getElementById("numberReveal").innerHTML);
    let numRevealArray = numberRevealElement.split(" ");
    console.log(numRevealArray);
    numRevealArray[2] = currentNumber;
    console.log(numRevealArray[2]);

    numberRevealElement = "";
    for (let i = 0; i < numRevealArray.length; i++) {
        //rebuild element with real currentNumber value instead of question mark
        numberRevealElement += String(numRevealArray[i]);
    }

    document.getElementById("numberReveal").innerHTML = numberRevealElement;

    let timesGrammar;

    if (guessCount == 1) {
        timesGrammar = "time";
    } else {
        timesGrammar = "times";
    }

    document.getElementById("messages").innerHTML
    = "Shame on you. Looks like mama raised a quitter. And you only guessed "
    + `${guessCount}` + " "
    + timesGrammar + ". Press \"generate a new number\" to try again."

    //endRound();
}

function endRound() {
    //change to the in between rounds state

}
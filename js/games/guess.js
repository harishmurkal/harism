'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '✔✔ You Guessed it!';
console.log(document.querySelector('.message').textContent);
//document.querySelector('message').textContent = '✔✔ Done';

document.querySelector('.scroll-display-number').textContent = 13;
console.log(document.querySelector('.scroll-display-number').textContent);

document.querySelector('#guess-id').value = 16;
console.log(document.querySelector('#guess-id').value);
*/
let secretNumber = Math.trunc(Math.random()*20) + 1;
let score = 20;
let highScore = 0;

// var valDisplayElement = document.getElementById('guess-id')
// var dispvaltooltip = new bootstrap.Tooltip(valDisplayElement, {
//     boundary: 'window'
//   })

// Logic for play Again logic start
function playAgain() {
    score = 20;
    document.querySelector('.scroll-display-number').textContent = "11";
    document.querySelector('.myscore-val').textContent = score;
    secretNumber = Math.trunc(Math.random()*20) + 1;
    document.querySelector('.message').textContent = '💌💌 Not received any number.';
    document.querySelector('.guessing-result-class').style.backgroundColor = '#EE82EE';
    document.querySelector('.scroll-display-number').style.backgroundColor = '#EE82EE';
    document.querySelector('.scroll-display-number').style.fontSize = '6em';
    document.querySelector('.scroll-display-number').style.fontWeight = 'normal';
    document.getElementById('check-id').disabled = false;
    document.getElementById('guess-id').disabled = false;
    document.querySelector('.scroll-display-number').textContent = '---';
    document.querySelector('#guess-id').value = '';
    clearHistory();
}

// Function to display SUCCESS and FAILURE patterns
function displayPattern(resultValue) {
    if (resultValue === "success") {
        document.querySelector('.message').textContent = '💪💪 BOOM! You guessed!';
        //document.querySelector('.guessing-result-class').style.backgroundColor = '#60b347';
        document.querySelector('.scroll-display-number').style.backgroundColor = '#60b347';
    } else {    //failure case
        document.querySelector('.message').textContent = '😢😢Lost the game. Try Again!';
        //document.querySelector('.guessing-result-class').style.backgroundColor = '#ff4047';
        document.querySelector('.scroll-display-number').style.backgroundColor = '#ff4047';
    }
    document.querySelector('.scroll-display-number').style.fontSize = '7em';
    document.querySelector('.scroll-display-number').style.fontWeight = 'bolder';
    document.getElementById('check-id').disabled = true;
    document.getElementById('guess-id').disabled = true;
}

//Display scroll number
function displayScrollValue (scrollVal) {
    document.querySelector('.scroll-display-number').textContent = scrollVal;
}

let histGuessNumbers = [];

let histHighScores = [];

function clearHistory() {
    histGuessNumbers = [];
    let clearIndex;
    for (clearIndex = 20; clearIndex > 0; clearIndex--) {
        let historyElem = `.history-${clearIndex-1}`;
        document.querySelector(historyElem).textContent = '';
    }
}

function clearHistHighScores() {
    histHighScores = [];
}

function updateHistoryHighScores(hsValue) {
    const histHighScoreLen = histHighScores.push(hsValue);
}

function updateHistory(currentValue) {
    const histLen = histGuessNumbers.push(currentValue);
    let i;
    for (i = histLen; i > 0; i--) {
        let historyElem = `.history-${histLen-i}`;
        let histSize = 3 - (0.1*(histLen-i));
        let histSizeEm = `${histSize}em`;
        //console.log(histSizeEm);
        //console.log(historyElem);
        document.querySelector(historyElem).textContent = histGuessNumbers[i-1];
        document.querySelector(historyElem).style.fontSize=histSizeEm;
    } 
    
    //let history = score - 1;
    //let historyElem = `.history-${history}`;
    //console.log(historyElem);
    //document.querySelector(historyElem).textContent = currentValue;
    //document.querySelector(historyElem).classList.add(historyElem);
    //let histSize = 3 - (0.1*score);
    //let histSizeEm = `${histSize}em`;
    //console.log(histSizeEm);
    //document.querySelector(historyElem).style.fontSize=histSizeEm;
}

// Logic for guess-id logic start
function displayResult (inputVal) {
    document.querySelector('.scroll-display-number').textContent = '---';
    document.querySelector('.myhighscore-val').textContent = highScore;
    updateHistory(inputVal);
    if (!inputVal) {
        if (0 === inputVal) {
            document.querySelector('.message').textContent = '❌ Zero is not a valid number';
        } else {
            document.querySelector('.message').textContent = '💌💌 Not received any number';
        }
    } else if (1 > inputVal) {
        document.querySelector('.message').textContent = '❌ Do not enter negative number';
    } else if (20 < inputVal) {
        document.querySelector('.message').textContent = '❌ Enter number less than equal to 20';
    } else {
        document.querySelector('.scroll-display-number').textContent = inputVal;
        if (secretNumber === inputVal) {
            updateHistoryHighScores(score);
            if (score > highScore) {
                highScore = score;
                let allOccuranceHsElement = document.querySelectorAll('.myhighscore-val');
                for (let i=0; i<allOccuranceHsElement.length ; i++) {
                    allOccuranceHsElement[i].textContent = highScore;
                }
                //document.querySelectorAll('.myhighscore-val').textContent = highScore;
            }
            displayPattern("success");
        } else {
            score--;
            if (0 >= score) {
                displayPattern("failure");    
            } else {
                if (secretNumber > inputVal) {
                    document.querySelector('.message').textContent = 'Try a greater number';
                } else {
                    document.querySelector('.message').textContent = 'Try a smaller number';
                }    
            }
        } 
        document.querySelector('.myscore-val').textContent = score;
    }
}

const handleClick = function() {
    const inputVal = Number(document.querySelector('#guess-id').value);
    //console.log(inputVal);
    displayResult(inputVal);
}

const handleScrollClick = function() {
    const inputVal = Number(document.querySelector('#guess-id').value);
    //console.log(inputVal);
    displayScrollValue(inputVal);
}

document.querySelector('#again-id').addEventListener('click', playAgain);
document.querySelector('#check-id').addEventListener('click', handleClick);
document.querySelector('#guess-id').addEventListener('click', handleScrollClick);
document.querySelector('#guess-id').addEventListener('touchmove', handleScrollClick);
document.querySelector('#guess-id').addEventListener('dblclick', handleClick);

// Logic for input by pressing "Enter" key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        handleClick();
    }
});
'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '✔✔ You Guessed it!';
console.log(document.querySelector('.message').textContent);
//document.querySelector('message').textContent = '✔✔ Done';

document.querySelector('.guessing-display-number').textContent = 13;
console.log(document.querySelector('.guessing-display-number').textContent);

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
    document.querySelector('.guessing-display-number').style.backgroundColor = '#EE82EE';
    document.querySelector('.guessing-display-number').style.fontSize = '1em';
    document.querySelector('.guessing-display-number').style.fontWeight = 'normal';
    document.getElementById('check-id').disabled = false;
    document.getElementById('guess-id').disabled = false;
    document.querySelector('.guessing-display-number').textContent = '---';
    document.querySelector('#guess-id').value = '';
}

// Function to display SUCCESS and FAILURE patterns
function displayPattern(resultValue) {
    if (resultValue === "success") {
        document.querySelector('.message').textContent = '💪💪 BOOM! You guessed!';
        //document.querySelector('.guessing-result-class').style.backgroundColor = '#60b347';
        document.querySelector('.guessing-display-number').style.backgroundColor = '#60b347';
    } else {    //failure case
        document.querySelector('.message').textContent = '😢😢Lost the game. Try Again!';
        //document.querySelector('.guessing-result-class').style.backgroundColor = '#ff4047';
        document.querySelector('.guessing-display-number').style.backgroundColor = '#ff4047';
    }
    document.querySelector('.guessing-display-number').style.fontSize = '3em';
    document.querySelector('.guessing-display-number').style.fontWeight = 'bolder';
    document.getElementById('check-id').disabled = true;
    document.getElementById('guess-id').disabled = true;
}

//Display scroll number
function displayScrollValue (scrollVal) {
    document.querySelector('.scroll-display-number').textContent = scrollVal;
}

// Logic for guess-id logic start
function displayResult (inputVal) {
    document.querySelector('.guessing-display-number').textContent = '---';
    document.querySelector('.myhighscore-val').textContent = highScore;
    
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
        document.querySelector('.guessing-display-number').textContent = inputVal;
        if (secretNumber === inputVal) {
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
    console.log(inputVal);
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
document.querySelector('#guess-id').addEventListener('dblclick', handleClick);

// Logic for input by pressing "Enter" key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        handleClick();
    }
});
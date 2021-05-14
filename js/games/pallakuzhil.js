'use strict';
//Const declarationns
const maxKuzhis = 14;
const seedsPerKuzhis = 5;
const clockWiseDirection = true;
const gameSpeed = 10; //in ms
let next = clockWiseDirection ? +1 : -1;

const board1Elem = document.querySelector('.board-1-class');
const board2Elem = document.querySelector('.board-2-class');
const playerNameDispElem = document.querySelector('.player-name-class');
const inHandElem = document.querySelector('.game-inhand-class');

function setInHand(num) {
    //inhand
    inHandElem.innerHTML = `
    <div class="kuzhi-value-class">${num}</div>
    <img src="../img/seed${num}.png" alt="seeds ${num}" srcset="">
    `;    
}

function resetKuzhiContents() {
    kuzhiContents = [];
    for (let i = 0; i < maxKuzhis; i++) {
        kuzhiContents.push({isPeethal: false, total: seedsPerKuzhis});
    }    
}

let kuzhiContents = [];
resetKuzhiContents();


//init Layout
const initLayout = function () {    
    //inhand
    setInHand(0);

    //board-1 for player-0
    for (let i = 0; i < maxKuzhis/2; i++) {
        let kuzhiHtml = `
        <div class="col col-sm-1 kuzhi-class" id="kuzhi-id-${i}">
        <div class="kuzhi-value-class">${seedsPerKuzhis}</div>
        <img src="../img/seed${seedsPerKuzhis}.png" alt="contains ${i}" srcset="">
        </div>
        `
        board1Elem.innerHTML+= kuzhiHtml;            
    }
    //board-2 for player-1
    for (let i = maxKuzhis-1; i >= maxKuzhis/2; i--) {
        let kuzhiHtml = `
        <div class="col col-sm-1 kuzhi-class" id="kuzhi-id-${i}">
        <div class="kuzhi-value-class">${seedsPerKuzhis}</div>
        <img src="../img/seed${seedsPerKuzhis}.png" alt="contains ${i}" srcset="">
        </div>
        `
        board2Elem.innerHTML+= kuzhiHtml;   
    }
};

//Game variables
let playerScores, activePlayer, lastPlayedPlayer, gameInprogress, waitingForUserInput, gameEnded, pawnsInHand;

initLayout();

//Player elements
const playersElems = [];
playersElems.push(document.querySelector('.player-0'));
playersElems.push(document.querySelector('.player-1'));

//Kuzhis elements
const kuzhisElems = [];
for (let i = 0; i < maxKuzhis; i++) {
    kuzhisElems.push(document.querySelector(`#kuzhi-id-${i}`))
}

//Game control elements
const startElem = document.querySelector('.btn-start-class');
const userMessageElem = document.querySelector('.user-message-class');
const scoreDisplayElem = document.querySelector('.scores-display-class');
const collectRemainderElem = document.querySelector('.btn-collect-class');

//Reset board function
const resetBoard = function () {
    setInHand(0);
    //Kuzhil contents clears
    for (let i=0; i<kuzhisElems.length ; i++) {
        let initKuzhiContent = `<div class="kuzhi-value-class">${seedsPerKuzhis}</div><img src="../img/seed${seedsPerKuzhis}.png" alt="contains ${i}" srcset="">`
        kuzhisElems[i].innerHTML = initKuzhiContent;
    }
};

//Clear board function
const clearBoard = function () {
    setInHand(0);
    //Kuzhil contents clears
    for (let i=0; i<kuzhisElems.length ; i++) {
        let zeroKuzhiContent = `<div class="kuzhi-value-class">0</div><img src="../img/seed0.png" alt="contains 0" srcset="">`
        kuzhisElems[i].innerHTML = zeroKuzhiContent;
    }
};

// Starting conditions
const init = function () {
    //const initialScore = seedsPerKuzhis * maxKuzhis/2;
    playerScores = [0, 0];    //7-cells * 5-seed = 35
    activePlayer = 0;   //player-0 is set active by default
    pawnsInHand = 0;
    gameInprogress = false;
    waitingForUserInput = true;
    gameEnded = true;
    resetBoard();
    board1Elem.classList.remove('board-when-waiting-class');
    board2Elem.classList.remove('board-when-waiting-class');
    resetKuzhiContents();
};
init();

function removeListenersForUserInputs() {
    board1Elem.classList.remove('board-when-waiting-class');
    board2Elem.classList.remove('board-when-waiting-class');

    for (let i = 0; i < kuzhisElems.length; i++) {
        kuzhisElems[i].removeEventListener("click", userSelectKuzhi);
        kuzhisElems[i].removeEventListener("dblclick", userSelectKuzhi);
        kuzhisElems[i].removeEventListener("touchend", userSelectKuzhi);
    }
};

function validInput(selectedCellId) {
    //console.log(kuzhiContents[selectedCellId]);
    //if not a peethal
    //if not a empty
    if (kuzhiContents[selectedCellId].isPeethal) {
        return false;
    } else if (kuzhiContents[selectedCellId].total === 0) {
        return false;
    } else {
        return true;
    }
}

function setKuzhiPeethal(cellId) {
    kuzhiContents[cellId].total = 0;
    kuzhiContents[cellId].isPeethal = true;
    //Kuzhil peethal image set
    let kuzhiContentPeethal = `<div class="kuzhi-value-class">XXX</div><img src="../img/peethal.png" alt="peethal" srcset="">`
    kuzhisElems[cellId].innerHTML = kuzhiContentPeethal;
}

function setKuzhiContent(cellId, value) {
    kuzhiContents[cellId].total = value;
    //Kuzhil image set
    if (value >= 15) {
        let setKuzhiContentVal = `<div class="kuzhi-value-class">${value}</div><img src="../img/seedmany.png" alt="contains ${value}" srcset="">`
        kuzhisElems[cellId].innerHTML = setKuzhiContentVal;    
    } else {
        let setKuzhiContentVal = `<div class="kuzhi-value-class">${value}</div><img src="../img/seed${value}.png" alt="contains ${value}" srcset="">`
        kuzhisElems[cellId].innerHTML = setKuzhiContentVal;
    }
}

function incrementActivePlayerScore(value) {
    playerScores[activePlayer] += value;
    scoreDisplayElem.textContent = `Score: Player-0 = ${playerScores[0]} Player-1 = ${playerScores[1]}`;
}

function checkPlayer1boardEmpty() {
    for (let i = maxKuzhis-1; i >= maxKuzhis/2; i--) {
        if (kuzhiContents[i].total !== 0) {
            return false;
        }
    }
    return true;
}

function checkPlayer0boardEmpty() {
    for (let i = 0; i < maxKuzhis/2; i++) {
        if (kuzhiContents[i].total !== 0) {
            return false;
        }
    }
    return true;
}

function getPlayer1RemainingSeeds() {
    let tot = 0;
    for (let i = maxKuzhis-1; i >= maxKuzhis/2; i--) {
        tot += kuzhiContents[i].total;
    }
    return tot;
}

function getPlayer0RemainingSeeds() {
    let tot = 0;
    for (let i = 0; i < maxKuzhis/2; i++) {
        tot += kuzhiContents[i].total;
    }
    return tot;
}

function setLayout(numOfKuzhis0, numOfKuzhis1) {    
    //inhand
    setInHand(0);
    resetKuzhiContents();

    //board-1 for player-0
    for (let i = 0; i < maxKuzhis/2; i++) {
        if (i < numOfKuzhis0) {
            setKuzhiContent(i, seedsPerKuzhis);
        } else {
            //peethal
            setKuzhiPeethal(i);
        }
    }
    //board-2 for player-1
    for (let i = maxKuzhis-1; i >= maxKuzhis/2; i--) {
        if (i > (maxKuzhis - numOfKuzhis1 - 1)) {
            setKuzhiContent(i, seedsPerKuzhis);
        } else {
            //peethal
            setKuzhiPeethal(i);
        }
    }    
};

function declarePlayerWon(player) {
    userMessageElem.textContent = `Players-${player} Won the game...`;
}

function reArrangeBoard() {
    lastPlayedPlayer = activePlayer;
    console.log('before re-arraning: Player-0 score: ', playerScores[0]);
    console.log('before re-arraning: Player-1 score: ', playerScores[1]);

    let activeNumOfboard0 = Math.floor(playerScores[0]/seedsPerKuzhis);
    let lplayer0score = playerScores[0]%seedsPerKuzhis;
    if (activeNumOfboard0 > maxKuzhis/2) {
        lplayer0score += (activeNumOfboard0 - maxKuzhis/2)*seedsPerKuzhis;
        activeNumOfboard0 = maxKuzhis/2;
    }
    
    let activeNumOfboard1 = Math.floor(playerScores[1]/seedsPerKuzhis);
    let lplayer1score = playerScores[1]%seedsPerKuzhis;
    if (activeNumOfboard1 > maxKuzhis/2) {
        lplayer1score += (activeNumOfboard1 - maxKuzhis/2)*seedsPerKuzhis;
        activeNumOfboard1 = maxKuzhis/2;
    }

    playerScores[0] = 0;
    incrementPlayer0Score(lplayer0score);
    playerScores[1] = 0;
    incrementPlayer1Score(lplayer1score);

    console.log('Player-0 score: ', playerScores[0]);
    console.log('Player-1 score: ', playerScores[1]);
    console.log('Player-0 board has ', activeNumOfboard0, ' kuzhis');
    console.log('Player-1 board has ', activeNumOfboard1, ' kuzhis');

    if (activeNumOfboard0 <= 0) {
        //Player-1 has won
        declarePlayerWon(1);
    } else if (activeNumOfboard1 <= 0) {
        //Player-0 has won
        declarePlayerWon(0);
    } else {
        setLayout(activeNumOfboard0, activeNumOfboard1);
        console.log('calling startPlayer() ', lastPlayedPlayer);
        startPlayer(lastPlayedPlayer);
    }
}

function incrementPlayer1Score(value) {
        playerScores[1] += value;
        scoreDisplayElem.textContent = `Score: Player-0 = ${playerScores[0]} Player-1 = ${playerScores[1]}`;
}

function incrementPlayer0Score(value) {
    playerScores[0] += value;
    scoreDisplayElem.textContent = `Score: Player-0 = ${playerScores[0]} Player-1 = ${playerScores[1]}`;
}

function checkAndswitchPlayer() {

    if (checkPlayer0boardEmpty()) {
        console.log('Player-0 board is empty. Re-arrange the board.');
        incrementPlayer1Score(getPlayer1RemainingSeeds());
        removeListenersForUserInputs();
        clearBoard();        
        reArrangeBoard();
    } else if (checkPlayer1boardEmpty()){
        console.log('Player-1 board is empty. Re-arrange the board.');
        incrementPlayer0Score(getPlayer0RemainingSeeds());
        removeListenersForUserInputs();
        clearBoard();
        reArrangeBoard();
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    console.log('switched player: player now, ', activePlayer);
    activateActivePlayerOnBoard();
    listenForUserInputs();
}

function startPlayer(playerNum) {
    activePlayer = playerNum;
    console.log('new round: switched player: player now, ', activePlayer);
    activateActivePlayerOnBoard();
    listenForUserInputs();    
}

function setPawnsInHand(tot) {
    pawnsInHand = tot;
    setInHand(pawnsInHand);
}

function getPawnsInHand() {
    return pawnsInHand;
}
function incrPawnsInHand(val) {
    pawnsInHand += val;
    setInHand(pawnsInHand);

}
function decrPawnsInHand(val) {
    pawnsInHand -= val;
    setInHand(pawnsInHand);
}

async function runGame(id) {
    let selectedCellId = parseInt(id.split('-')[2]);
    // console.log(selectedCellId);
    let valid = validInput(selectedCellId);
    console.log('playing when selected ', id, '->cell ', selectedCellId);

    if (!valid) {
        return;
    }
    userMessageElem.textContent = `Players-${activePlayer} ...`;
    scoreDisplayElem.textContent = `Score: Player-0 = ${playerScores[0]} Player-1 = ${playerScores[1]}`;
    removeListenersForUserInputs();
    stopAttention();

    setPawnsInHand(kuzhiContents[selectedCellId].total);

    setKuzhiContent(selectedCellId, 0);
    do {
        while (getPawnsInHand() !== 0) {
            console.log('At kuzhi-', selectedCellId, ' and pawns at hand: ', getPawnsInHand());
            selectedCellId = await nextStep(selectedCellId);
            setKuzhiContent(selectedCellId, kuzhiContents[selectedCellId].total + 1);
            decrPawnsInHand(1);
        }
        //if pawns empty pick pawns from next kuzhi
        selectedCellId = await nextStep(selectedCellId);
        if (kuzhiContents[selectedCellId].total === 0) {
            selectedCellId = await nextStep(selectedCellId);
            incrementActivePlayerScore(kuzhiContents[selectedCellId].total)
            setKuzhiContent(selectedCellId, 0);
            kuzhisElems[selectedCellId].classList.remove('kuzhi-class-selected');
            checkAndswitchPlayer();
            return
        } else {
            setPawnsInHand(kuzhiContents[selectedCellId].total);
            setKuzhiContent(selectedCellId, 0);
        }        
    } while (getPawnsInHand() !== 0);
};

async function nextStep(cellId) {
    let retAwait = await mySeep();

    do {
        kuzhisElems[cellId].classList.remove('kuzhi-class-selected');
        cellId += next;
        // console.log('------current cell:', cellId);
        if (cellId === maxKuzhis) {
            cellId = 0;
        } else if (cellId === -1) {
            cellId = maxKuzhis - 1;
        }
    } while (kuzhiContents[cellId].isPeethal);
    kuzhisElems[cellId].classList.add('kuzhi-class-selected');
    return cellId;
}

async function mySeep() {
    // console.log('mySleep() begin.');
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), gameSpeed)
    });
    // console.log('mySleep() awaiting...');
    let result = await promise; // wait until the promise resolves (*)
}

const userSelectKuzhi = function (e) {
    console.log('user selected cell: ', e.path[1].id);
    runGame(e.path[1].id);
    console.log('Game run done.');
}

function togglePadding() {
    if (waitingForUserInput === true && gameInprogress == true) {
        if (activePlayer === 0) {
            board1Elem.classList.toggle('grab-attention-class', true);
            setTimeout(function(){ board1Elem.classList.toggle('grab-attention-class'); }, 1000);
            setTimeout(function(){ board1Elem.classList.toggle('grab-attention-class'); }, 1000);
            setTimeout(function(){ board1Elem.classList.toggle('grab-attention-class'); }, 1000);
        } else {
            board2Elem.classList.toggle('grab-attention-class');
            setTimeout(function(){ board2Elem.classList.toggle('grab-attention-class'); }, 1000);
            setTimeout(function(){ board3Elem.classList.toggle('grab-attention-class'); }, 1000);
            setTimeout(function(){ board4Elem.classList.toggle('grab-attention-class'); }, 1000);
        }    
    }
}

function stopAttention() {
    clearInterval(grapAttention);
}

let grapAttention = setInterval(togglePadding, 5000);

function listenForUserInputs() {

    waitingForUserInput = true;
    if (activePlayer === 0) {
        board1Elem.classList.add('board-when-waiting-class');
        board2Elem.classList.remove('board-when-waiting-class');
        for (let i = 0; i < maxKuzhis/2; i++) {
            kuzhisElems[i].addEventListener("click", userSelectKuzhi);
            kuzhisElems[i].addEventListener("dblclick", userSelectKuzhi);
            kuzhisElems[i].addEventListener("touchend", userSelectKuzhi);
        }
        for (let i = maxKuzhis-1; i >= maxKuzhis/2; i--) {
            kuzhisElems[i].removeEventListener("click", userSelectKuzhi);
            kuzhisElems[i].removeEventListener("dblclick", userSelectKuzhi);
            kuzhisElems[i].removeEventListener("touchend", userSelectKuzhi);
        }
        console.log('player-0 to enter');
    } else {
        board1Elem.classList.remove('board-when-waiting-class');
        board2Elem.classList.add('board-when-waiting-class');

        for (let i = 0; i < maxKuzhis/2; i++) {
            kuzhisElems[i].removeEventListener("click", userSelectKuzhi);
            kuzhisElems[i].removeEventListener("dblclick", userSelectKuzhi);
            kuzhisElems[i].removeEventListener("touchend", userSelectKuzhi);
        }
        for (let i = maxKuzhis-1; i >= maxKuzhis/2; i--) {
            kuzhisElems[i].addEventListener("click", userSelectKuzhi);
            kuzhisElems[i].addEventListener("dblclick", userSelectKuzhi);
            kuzhisElems[i].addEventListener("touchend", userSelectKuzhi);
        }
        console.log('player-1 to enter');
    }
}

function activateActivePlayerOnBoard() {
    playerNameDispElem.textContent = `Player-${activePlayer}'s turn`;
    if (activePlayer === 0) {
        board1Elem.classList.add('board-when-active-class')
        board2Elem.classList.remove('board-when-active-class')
        for (let i = 0; i < kuzhisElems.length/2; i++) {
            kuzhisElems[i].classList.add('kuzhi-class-active');
        }
        for (let i = maxKuzhis-1; i >= maxKuzhis/2; i--) {
            kuzhisElems[i].classList.remove('kuzhi-class-active');
        }
        console.log('activated board1');
    } else {
        board1Elem.classList.remove('board-when-active-class')
        board2Elem.classList.add('board-when-active-class')
        for (let i = 0; i < kuzhisElems.length/2; i++) {
            kuzhisElems[i].classList.remove('kuzhi-class-active');
        }

        for (let i = maxKuzhis-1; i >= maxKuzhis/2; i--) {
            kuzhisElems[i].classList.add('kuzhi-class-active');
        }
        console.log('activated board2');
    }
}

const startOrPause = function () {
    scoreDisplayElem.textContent = `Score: Player-0 = ${playerScores[0]} Player-1 = ${playerScores[1]}`;
    gameInprogress = !gameInprogress;

    if (gameInprogress === true) {
        console.log("continuing the game");
        startElem.textContent = "Pause"
        activateActivePlayerOnBoard();
        if (waitingForUserInput == true) {
            scoreDisplayElem.textContent = `Score: Player-0 = ${playerScores[0]} Player-1 = ${playerScores[1]}`;
            userMessageElem.textContent = `Waiting for user's input. Players-${activePlayer} turn.`;
            listenForUserInputs();
       
        } else {
            scoreDisplayElem.textContent = `Score: Player-0 = ${playerScores[0]} Player-1 = ${playerScores[1]}`;
            userMessageElem.textContent = `...`;
        }
    } else {
        console.log("game is paused");
        startElem.textContent = "Continue"
        scoreDisplayElem.textContent = `Score: Player-0 = ${playerScores[0]} Player-1 = ${playerScores[1]}`;
        userMessageElem.textContent = `Resume the game.`;
        board1Elem.classList.remove('board-when-waiting-class');
        board2Elem.classList.remove('board-when-waiting-class');    
    }
};

//Start/Pause game eventListener
startElem.addEventListener('click', startOrPause);
startElem.addEventListener('dblclick', startOrPause);
startElem.addEventListener('touchend', startOrPause);
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.code === 'Space') {
        startOrPause();
    }
});
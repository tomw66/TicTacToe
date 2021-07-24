const gameBoard = (() => {
    'use strict';
    let array = [];
    let _roundCounter = 1;
    let activePlayer = '';
    const reset = () => {
        array=[];
        gameBoard._roundCounter = 1;
        displayController.refresh(array);
    }
    const checkCondition = (activePlayer) => {
        const m = activePlayer.team;
        if (array[0]===m && array[1]===m &&  array[2]===m||
            array[3]===m && array[4]===m &&  array[5]===m||
            array[6]===m && array[7]===m &&  array[8]===m||
            array[0]===m && array[3]===m &&  array[6]===m||
            array[1]===m && array[4]===m &&  array[7]===m||
            array[2]===m && array[5]===m &&  array[8]===m||
            array[0]===m && array[4]===m &&  array[8]===m||
            array[2]===m && array[4]===m &&  array[6]===m) {
                alert(activePlayer.name + ' wins!');
                reset();
            }
             else if (array.includes(undefined) === false && array.length === 9) {
                alert('Draw!');
                reset();
            }
    }
    const play = (panelID) => {
        activePlayer = (gameBoard._roundCounter % 2 === 1) ? player1 : player2;
        if (array[panelID] === undefined) {
            array[panelID] = activePlayer.team;
            displayController.refresh(array);
            gameBoard._roundCounter++;
            checkCondition(activePlayer);
        }
    }
    return {
        _roundCounter,
        array,
        play,
        reset,
    };
})();

const displayController = (() => {
    'use strict';
    const refresh = (array) => {
    for (let i = 0; i < 9; i++) {
        if (array[i] !== undefined) {
            document.getElementById(i).innerHTML = array[i];
            }
        else {
            document.getElementById(i).innerHTML = ''
        }}
    }
    return {
        refresh,
    }
})();

const player = (name, team) => {
    'use strict';
    return {name, team};
};

const player1 = player('Team X', 'x');
const player2 = player('Team O', 'o');

let panel = document.querySelectorAll('.panel');
panel.forEach(element => {
    element.addEventListener('click', function(){
        gameBoard.play(element.id);
    })})

const form = document.getElementById('form');
const scoreboard = document.getElementById('scoreboard');

form.addEventListener('submit', function(event){
    event.preventDefault();
    player1.name = form.elements['teamX'].value;
    player2.name = form.elements['teamO'].value;
})
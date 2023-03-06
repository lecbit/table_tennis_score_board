let text_count_left = document.getElementById('text_count_left');
let text_count_right = document.getElementById('text_count_right');

let text_round_left = document.getElementById('text_round_left');
let text_round_right = document.getElementById('text_round_right');

let poda1 = document.getElementById('poda1');
let poda2 = document.getElementById('poda2');

let smena_pod = document.getElementById('smena_podachi');

let score_text = document.getElementById('score_text');
let games_number_text = document.getElementById('games_number_text');
let innings_number_text = document.getElementById('innings_number_text');

let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');

let name1;
let name2;

let player1_text = document.getElementById('player_name1_text');
let player_name1 = document.getElementById('player_name1');

let player2_text = document.getElementById('player_name2_text');
let player_name2 = document.getElementById('player_name2');

let left_counter = 0;
let right_counter = 0;

let left_round_count = 0;
let right_round_count = 0;

let storona_poda = 0;
let left_ball = 1;
let right_ball = 0;

let score_settings = 21;
let games_number_settings = 3;
let innings_number_settings = 2;

let nameChangeMode = 0;
let changeSettingsMode = 0;
let mode = 0;

let gitar = new Audio();
gitar.src = "./sounds/gitara.mp3";

let claps = new Audio();
claps.src = './sounds/claps.mp3';

//
if (JSON.parse(localStorage.getItem('gameSettings'))) {
    score_settings = JSON.parse(localStorage.getItem('gameSettings'))['score'];
    score_text.innerText = score_settings;

    games_number_settings = JSON.parse(localStorage.getItem('gameSettings'))['games'];
    games_number_text.innerText = games_number_settings;

    innings_number_settings = JSON.parse(localStorage.getItem('gameSettings'))['innings'];
    innings_number_text.innerText = innings_number_settings;
}

//
if (JSON.parse(localStorage.getItem('gameSave'))) {
    left_counter = JSON.parse(localStorage.getItem('gameSave'))['left_counter'];
    right_counter = JSON.parse(localStorage.getItem('gameSave'))['right_counter'];

    left_round_count = JSON.parse(localStorage.getItem('gameSave'))['left_round_count'];
    right_round_count = JSON.parse(localStorage.getItem('gameSave'))['right_round_count'];

    text_count_left.innerHTML = left_counter;
    text_count_right.innerHTML = right_counter;

    text_round_left.innerHTML = left_round_count;
    text_round_right.innerHTML = right_round_count;

    storona_poda = JSON.parse(localStorage.getItem('gameSave'))['storona_poda'];

    left_ball = JSON.parse(localStorage.getItem('gameSave'))['left_ball'];
    right_ball = JSON.parse(localStorage.getItem('gameSave'))['right_ball'];
    smena_pod.classList.add("invisible");
    poda1.innerHTML = '';
    poda2.innerHTML = '';

    if (storona_poda == 0) {
        for (let i = 0; i < left_ball; i++) {
            poda1.innerHTML = poda1.innerHTML + '<div class="mbox col-2 rounded-circle"></div>';
        }
    }
    else {
        for (let i = 0; i < right_ball; i++) {
            poda2.innerHTML = poda2.innerHTML + '<div class="mbox col-2 rounded-circle"></div>';
        }
    }

    mode = 0;
}

//
if (JSON.parse(localStorage.getItem('savedNames'))) {
    name1 = JSON.parse(localStorage.getItem('savedNames'))['name1'];
    player1_text.innerText = name1;

    name2 = JSON.parse(localStorage.getItem('savedNames'))['name2'];
    player2_text.innerText = name2;

}


function lCountPlus() {
    left_counter += 1;
    text_count_left.innerHTML = left_counter;
    if (mode == 0) {
        counterAction();
    }
    else {
        playMode();
    }
}

function rCountPlus() {
    right_counter += 1;
    text_count_right.innerHTML = right_counter;
    if (mode == 0) {
        counterAction();
    }
    else {
        playMode();
    }
}

function counterAction() {
    gameSaver();
    smena_pod.classList.add("invisible");
    if (text_count_left.innerHTML == score_settings - 1 && text_count_right.innerHTML == score_settings - 1) {
        mode = 1;
        return playMode();
    }
    pointsChecker();
}

function roundRestart() {
    smena_pod.classList.remove("invisible");
    left_counter = 0;
    text_count_left.innerHTML = left_counter;
    right_counter = 0;
    text_count_right.innerHTML = right_counter;
    smenaStorony();
}

function PodachaCheck() {
    if (storona_poda == 0) {
        leftBallAdd();
    }
    else {
        rightBallAdd();
    }
    gameSaver();
}

function leftBallAdd() {
    if (left_ball < innings_number_settings) {
        left_ball += 1;
        poda1.innerHTML = poda1.innerHTML + '<div class="mbox col-2 rounded-circle"></div>';
    }
    else {
        gitar.play();
        smenaStorony();
    }
}

function rightBallAdd() {
    if (right_ball < innings_number_settings) {
        right_ball += 1;
        poda2.innerHTML = poda2.innerHTML + '<div class="mbox col-2 rounded-circle"></div>';
    }
    else {
        gitar.play();
        smenaStorony();
    }
}

function pointsChecker() {
    if (left_counter >= score_settings) {
        left_round_count += 1;
        text_round_left.innerHTML = left_round_count;
        leftRoundChecker();
    }
    else if (right_counter >= score_settings) {
        right_round_count += 1;
        text_round_right.innerHTML = right_round_count;
        rightRoundChecker();
    } else {
        PodachaCheck();
    }
}

function leftRoundChecker() {
    if (left_round_count >= games_number_settings) {
        claps.play();
        localStorage.removeItem('gameSave');
        alert('Left winner!');
    }
    else {
        roundRestart();
    }
}

function rightRoundChecker() {
    if (right_round_count >= games_number_settings) {
        claps.play();
        localStorage.removeItem('gameSave');
        alert('Right winner!');
    }
    else {
        roundRestart();
    }
}

function smenaStorony() {
    if (storona_poda == 0) {
        storona_poda = 1;
        left_ball = 0;
        right_ball = 1;
        poda1.innerHTML = '';
        poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
    }
    else {
        storona_poda = 0;
        left_ball = 1;
        right_ball = 0;
        poda2.innerHTML = '';
        poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
    }
    gameSaver();
}

function restartGame() {
    localStorage.removeItem('gameSave');
    smena_pod.classList.remove("invisible");
    text_count_left.innerHTML = '0';
    text_count_right.innerHTML = '0';

    text_round_left.innerHTML = '0';
    text_round_right.innerHTML = '0';

    poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';;
    poda2.innerHTML = '';

    left_counter = 0;
    right_counter = 0;

    left_round_count = 0;
    right_round_count = 0;

    storona_poda = 0;
    left_ball = 1;
    right_ball = 0;

    mode = 0;
}

function gameSaver() {
    const GAME_SAVE = {
        left_counter: left_counter,
        right_counter: right_counter,
        left_round_count: left_round_count,
        right_round_count: right_round_count,
        storona_poda: storona_poda,
        left_ball: left_ball,
        right_ball: right_ball,
    }
    localStorage.setItem('gameSave', JSON.stringify(GAME_SAVE));
}

function playMode() {
    poda1.innerHTML = '';
    poda2.innerHTML = '';
    if (storona_poda == 0) {
        poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        storona_poda = 1;
    }
    else {
        poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        storona_poda = 0;
    }
    if (left_counter - right_counter == 2) {
        left_round_count += 1;
        text_round_left.innerHTML = left_round_count;
        mode = 0;
        leftRoundChecker();
    }
    if (right_counter - left_counter == 2) {
        right_round_count += 1;
        text_round_right.innerHTML = right_round_count;
        mode = 0;
        rightRoundChecker();
    }
}

function changeSettings() {
    if (changeSettingsMode == 0) {
        one.innerHTML = `<input id="score_settings" type="number" size="3" placeholder="21" value="${score_settings}" />`;
        two.innerHTML = `<input id="games_number_settings" type="number" size="3" placeholder="3" value="${games_number_settings}" />`;
        three.innerHTML = `<input id="innings_number_settings" type="number" size="3" placeholder="5" value="${innings_number_settings}" />`;
        changeSettingsMode = 1;
    }
    else {
        restartGame();
        if (Number(document.getElementById('score_settings').value)) {
            score_settings = document.getElementById('score_settings').value;
        }
        else {
            score_settings = 21;
        }
        if (Number(document.getElementById('games_number_settings').value)) {
            games_number_settings = document.getElementById('games_number_settings').value;
        }
        else {
            games_number_settings = 3;
        }
        if (Number(document.getElementById('innings_number_settings').value)) {
            innings_number_settings = document.getElementById('innings_number_settings').value;
        }
        else {
            innings_number_settings = 5;
        }

        one.innerHTML = score_settings;
        two.innerHTML = games_number_settings;
        three.innerHTML = innings_number_settings;

        changeSettingsMode = 0;

        //
        const GAME_SETTINGS = {
            score: score_settings,
            games: games_number_settings,
            innings: innings_number_settings,
        }
        localStorage.setItem('gameSettings', JSON.stringify(GAME_SETTINGS));
    }
}

function namesChanger() {
    if (nameChangeMode == 0) {
        player1_text.style.display = 'none'
        player_name1.style.display = 'block'

        player2_text.style.display = 'none'
        player_name2.style.display = 'block'
        nameChangeMode = 1;

        if (name1) {
            player_name1.value = name1;
        }
        if (name2) {
            player_name2.value = name2;
        }
    }
    else {
        player1_text.style.display = 'block'
        player_name1.style.display = 'none'

        player2_text.style.display = 'block'
        player_name2.style.display = 'none'
        nameChangeMode = 0;

        name1 = player_name1.value;
        name2 = player_name2.value;



        if (name1 == 0) {
            name1 = 'Name1';
            player1_text.innerText = 'Name1';
        }
        else {
            player1_text.innerText = name1;
        }

        if (name2 == 0) {
            name2 = 'Name2';
            player2_text.innerText = 'Name2';
        }
        else {
            player2_text.innerText = name2;
        }

        //
        const SAVED_NAMES = {
            name1: name1,
            name2: name2,
        }
        localStorage.setItem('savedNames', JSON.stringify(SAVED_NAMES));
    }
}
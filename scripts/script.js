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

let player1_text = document.getElementById('player_name1_text');
let player_name1 = document.getElementById('player_name1');

let player2_text = document.getElementById('player_name2_text');
let player_name2 = document.getElementById('player_name2');

let score_settings_data = document.getElementById('score_settings_data');
let games_settings_data = document.getElementById('games_settings_data');
let innings_settings_data = document.getElementById('innings_settings_data');

let option = document.createElement('option');

let list = document.getElementById('browsers');

let name1;
let name2;

let left_counter = 0;
let right_counter = 0;

let left_round_count = 0;
let right_round_count = 0;

let storona_poda = 0;
let start_poda = 0;
let left_ball = 1;
let right_ball = 0;

let score_settings = 21;
let games_number_settings = 3;
let innings_number_settings = 2;

let nameChangeMode = 0;
let changeSettingsMode = 0;
let mode = 0;

let guitarMode = 1;
let clapsMode = 1;

let gitar = new Audio();
gitar.src = "./sounds/gitara.mp3";

let claps = new Audio();
claps.src = './sounds/claps.mp3';

//Game settings
if (JSON.parse(localStorage.getItem('gameSettings'))) {
    if (JSON.parse(localStorage.getItem('gameSettings'))['score']) {
        score_settings = JSON.parse(localStorage.getItem('gameSettings'))['score'];
        score_text.innerText = score_settings;
        score_settings_data.value = JSON.parse(localStorage.getItem('gameSettings'))['score'];
    }

    if (JSON.parse(localStorage.getItem('gameSettings'))['games']) {
        games_number_settings = JSON.parse(localStorage.getItem('gameSettings'))['games'];
        games_number_text.innerText = games_number_settings;
        games_settings_data.value = JSON.parse(localStorage.getItem('gameSettings'))['games'];

    }

    if (JSON.parse(localStorage.getItem('gameSettings'))['innings']) {
        innings_number_settings = JSON.parse(localStorage.getItem('gameSettings'))['innings'];
        innings_number_text.innerText = innings_number_settings;
        innings_settings_data.value = JSON.parse(localStorage.getItem('gameSettings'))['innings'];
    }
}

//Game saver
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

    mode = JSON.parse(localStorage.getItem('gameSave'))['mode'];
}

//Sounds OFF
if (localStorage.getItem('guitar')) {
    guitarMode = 0;
    document.getElementById('guitar_Input').removeAttribute('checked')
}
if (localStorage.getItem('claps')) {
    clapsMode = 0;
    document.getElementById('claps_Input').removeAttribute('checked')
}

//Names
if (JSON.parse(localStorage.getItem('savedNames'))) {
    let namesLoad = JSON.parse(localStorage.getItem('savedNames'));


    namesLoad.forEach(function (item) {
        var option = document.createElement('option');
        option.value = item;
        list.appendChild(option);
    });
}

//
if (JSON.parse(localStorage.getItem('actualNames'))) {
    if (JSON.parse(localStorage.getItem('actualNames'))['name1']) {
        name1 = JSON.parse(localStorage.getItem('actualNames'))['name1'];
        player1_text.innerText = name1;
    }

    if (JSON.parse(localStorage.getItem('actualNames'))['name2']) {
        name2 = JSON.parse(localStorage.getItem('actualNames'))['name2'];
        player2_text.innerText = name2;
    }
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
    podachaStartRaund();
}

function podachaStartRaund()
{
    if (start_poda == 0) {
        start_poda = 1;
        left_ball = 0;
        right_ball = 1;
        poda1.innerHTML = '';
        poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
    }
    else {
        start_poda = 0;
        left_ball = 1;
        right_ball = 0;
        poda2.innerHTML = '';
        poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
    }
    gameSaver();
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
        if (guitarMode == 1) {
            gitar.play();
        }
        smenaStorony();
    }
}

function rightBallAdd() {
    if (right_ball < innings_number_settings) {
        right_ball += 1;
        poda2.innerHTML = poda2.innerHTML + '<div class="mbox col-2 rounded-circle"></div>';
    }
    else {
        if (guitarMode == 1) {
            gitar.play();
        }
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
    if (left_round_count == games_number_settings) {
        if (clapsMode == 1) {
            claps.play();
        }
        localStorage.removeItem('gameSave');
        alert('Left winner!');
    }
    else {
        roundRestart();
    }
}

function rightRoundChecker() {
    if (right_round_count == games_number_settings) {
        if (clapsMode == 1) {
            claps.play();
        }
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
        mode: mode,
    }
    localStorage.setItem('gameSave', JSON.stringify(GAME_SAVE));
}

function playMode() {
    poda1.innerHTML = '';
    poda2.innerHTML = '';
    if (storona_poda == 0) {
        poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        storona_poda = 1;
        left_ball = 0;
        right_ball = 1;
    }
    else {
        poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        storona_poda = 0;
        left_ball = 1;
        right_ball = 0;
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
    console.log(3443);
    gameSaver();
}

let parameters_button = document.getElementById('parameters_button');
let parameters_yes = document.getElementById('parameters_yes');
let parameters_no = document.getElementById('parameters_no');

function cancelSettings() {
    parameters_button.style.display = 'block';
    parameters_yes.style.display = 'none';
    parameters_no.style.display = 'none';

    score_text.style.display = 'block';
    score_settings_data.style.display = 'none';
    games_number_text.style.display = 'block';
    games_settings_data.style.display = 'none';
    innings_number_text.style.display = 'block';
    innings_settings_data.style.display = 'none';

    score_settings_data.value = '';

    games_settings_data.value = '';

    innings_settings_data.value = '';

    changeSettingsMode = 0;
}

function changeSettings() {
    if (changeSettingsMode == 0) {
        parameters_button.style.display = 'none';
        parameters_yes.style.display = 'block';
        parameters_no.style.display = 'block';
    }
    else {
        parameters_button.style.display = 'block';
        parameters_yes.style.display = 'none';
        parameters_no.style.display = 'none';
    }

    if (changeSettingsMode == 0) {
        score_text.style.display = 'none';
        score_settings_data.style.display = 'block';
        games_number_text.style.display = 'none';
        games_settings_data.style.display = 'block';
        innings_number_text.style.display = 'none';
        innings_settings_data.style.display = 'block';

        if (score_settings_data.value) {
            score_settings_data.value = score_settings;
        }

        if (games_settings_data.value) {
            games_settings_data.value = games_number_settings;
        }

        if (innings_settings_data.value) {
            innings_settings_data.value = innings_number_settings;
        }

        changeSettingsMode = 1;
    }
    else {
        score_text.style.display = 'block';
        score_settings_data.style.display = 'none';
        games_number_text.style.display = 'block';
        games_settings_data.style.display = 'none';
        innings_number_text.style.display = 'block';
        innings_settings_data.style.display = 'none';


        score_settings = score_settings_data.value;
        games_number_settings = games_settings_data.value;
        innings_number_settings = innings_settings_data.value;

        changeSettingsMode = 0;

        //
        const GAME_SETTINGS = {
            score: score_settings,
            games: games_number_settings,
            innings: innings_number_settings,
        }
        localStorage.setItem('gameSettings', JSON.stringify(GAME_SETTINGS));
        //Задать дефолт значения, если данные не введены. Порядок выполнения строк важен!!!
        if (score_settings) {
            score_text.innerText = score_settings;
        }
        else {
            score_settings = 21;
            score_text.innerText = 21;
        }

        if (games_number_settings) {
            games_number_text.innerText = games_number_settings;
        }
        else {
            games_number_settings = 3;
            games_number_text.innerText = 3;
        }

        if (innings_number_settings) {
            innings_number_text.innerText = innings_number_settings;
        }
        else {
            innings_number_settings = 2;
            innings_number_text.innerText = 2;
        }

        restartGame();
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



        if (name1 != 0) {
            player1_text.innerText = name1;
        }
        else {
            player1_text.innerText = 'Name1';
        }

        if (name2 != 0) {
            player2_text.innerText = name2;
        }
        else {
            player2_text.innerText = 'Name2';
        }

        //
        const ACTUAL_NAMES = {
            name1: name1,
            name2: name2,
        }
        localStorage.setItem('actualNames', JSON.stringify(ACTUAL_NAMES));

        namesSaver();
    }
}

function namesSaver() {
    let names;
    if (JSON.parse(localStorage.getItem('savedNames'))) {
        names = JSON.parse(localStorage.getItem('savedNames'));

        if (name1 && !names.includes(name1)) { //Если имя не пустое и такого в массиве нет.
            names.push(name1);
        }

        if (name2 && !names.includes(name2)) { //Если имя не пустое и такого в массиве нет.
            names.push(name2);
        }

        if (Object.keys(names).length > 5) {
            list.innerHTML = '';
            let number_elements = Object.keys(names).length;
            names = names.slice(number_elements - 5, number_elements)
        }

        localStorage.setItem('savedNames', JSON.stringify(names));
    }
    else {
        let names = [];

        if (name1) {
            names.push(name1);
        }

        if (name2 && !names.includes(name2)) {
            names.push(name2);
        }

        localStorage.setItem('savedNames', JSON.stringify(names));

        array = JSON.parse(localStorage.getItem("savedNames"));
    }

    // 
    let namesLoad = JSON.parse(localStorage.getItem('savedNames'));

    list.innerHTML = '';

    names.forEach(function (item) {
        var option = document.createElement('option');
        option.value = item;
        list.appendChild(option);
    });
}

function clapsSwitch() {
    if (localStorage.getItem('claps')) {
        localStorage.removeItem('claps');
        clapsMode = 1;
    }
    else {
        localStorage.setItem('claps', '1');
        clapsMode = 0;
    }

}

function guitarSwitch() {
    if (localStorage.getItem('guitar')) {
        localStorage.removeItem('guitar');
        guitarMode = 1;
    }
    else {
        localStorage.setItem('guitar', '1');
        guitarMode = 0;
    }
}
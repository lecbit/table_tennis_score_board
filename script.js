let num1 = document.getElementById('num1');
let num2 = document.getElementById('num2');

let n_round1 = document.getElementById('n_round1');
let n_round2 = document.getElementById('n_round2');

let poda1 = document.getElementById('poda1');
let poda2 = document.getElementById('poda2');

let smena_pod = document.getElementById('smena_podachi');

let left_count = 0;
let right_count = 0;

let left_round_count = 0;
let right_round_count = 0;

let storona_poda = 0;
let left_ball = 1;
let right_ball = 0;

let mode = 0;

let gitar = new Audio();
gitar.src = 'gitara.mp3';

let claps = new Audio();
claps.src = 'claps.mp3';

function lCountPlus() {
    left_count += 1;
    num1.innerHTML = left_count;
    if (mode == 0) {
        CounterCheck();
    }
    else {
        playMode();
    }
}

function rCountPlus() {
    right_count += 1;
    num2.innerHTML = right_count;
    if (mode == 0) {
        CounterCheck();
    }
    else {
        playMode();
    }
}

function CounterCheck() {
    smena_pod.classList.add("invisible");
    if (num1.innerHTML == 10 && num2.innerHTML == 10) {
        mode = 1;
        return playMode();
    }
    if (left_count >= 11) {
        left_round_count += 1;
        n_round1.innerHTML = left_round_count;
        if (left_round_count >= 2) {
            claps.play();
            alert('Left winner!');
        }
        else {
            roundRestart();
        }
    }
    else if (right_count >= 11) {
        right_round_count += 1;
        n_round2.innerHTML = right_round_count;
        if (right_round_count >= 2) {
            claps.play();
            alert('Right winner!');
        }
        else {
            roundRestart();
        }
    } else {
        PodaCheck();
    }
}

function roundRestart() {
    left_count = 0;
    num1.innerHTML = left_count;
    right_count = 0;
    num2.innerHTML = right_count;
    storonaSwitch();
}

function PodaCheck() {
    if (storona_poda == 0) {
        LeftPoda();
    }
    else {
        RightPoda();
    }
}

function LeftPoda() {
    if (left_ball < 5) {
        left_ball += 1;
        poda1.innerHTML = poda1.innerHTML + '<div class="mbox col-2 rounded-circle"></div>';
    }
    else {
        storonaSwitch();
    }
}

function RightPoda() {
    if (right_ball < 5) {
        right_ball += 1;
        poda2.innerHTML = poda2.innerHTML + '<div class="mbox col-2 rounded-circle"></div>';
    }
    else {
        storonaSwitch();
    }
}

function storonaSwitch() {
    gitar.play();
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
}

function restartGame() {
    smena_pod.classList.remove("invisible");
    num1.innerHTML = '0';
    num2.innerHTML = '0';

    n_round1.innerHTML = '0';
    n_round2.innerHTML = '0';

    poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';;
    poda2.innerHTML = '';

    left_count = 0;
    right_count = 0;

    left_round_count = 0;
    right_round_count = 0;

    storona_poda = 0;
    left_ball = 1;
    right_ball = 0;

    mode = 0;
}

function playMode() {
    poda1.innerHTML = '';
    poda2.innerHTML = '';
    if (storonaSwitch == 0) {
        poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        storonaSwitch = 1;
    }
    else {
        poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        storonaSwitch = 0;
    }
    if (left_count - right_count == 2) {
        n_round1.innerHTML = Number(n_round1.innerHTML) + 1;
        numReset();
        mode = 0;
        claps.play();
        alert('Koniec turnira');
        n_round1.innerHTML = 0;
        n_round2.innerHTML = 0;
        countPodach = 1;
        if (startedMatch == 0) {
            poda2.innerHTML = '';
            poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        }
        else {
            poda1.innerHTML = '';
            poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        }

    }
    if (right_count - left_count == 2) {
        n_round2.innerHTML = Number(n_round2.innerHTML) + 1;
        numReset();
        mode = 0;
        claps.play();
        alert('Koniec turnira');
        n_round1.innerHTML = 0;
        n_round2.innerHTML = 0;
        countPodach = 1;
        if (startedMatch == 0) {
            poda2.innerHTML = '';
            poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        }
        else {
            poda1.innerHTML = '';
            poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
        }
    }
}
let num1 = document.getElementById('num1');

let num2 = document.getElementById('num2');

let poda1 = document.getElementById('poda1');

let poda2 = document.getElementById('poda2');

let n_round1 = document.getElementById('n_round1');

let n_round2 = document.getElementById('n_round2');

let smena_pod = document.getElementById('smena_podachi');

let mode = 0;


let countPodach = 1;
let storonaSwitch = 0;

let gitar = new Audio();
gitar.src = 'gitara.mp3';

let claps = new Audio();
claps.src = 'claps.mp3';

function num1p() {
  num1.innerHTML = Number(num1.innerHTML) + 1;
  if (mode == 0) {
  poda();
  }
  else
  {
    playMode();
  }
}

function num2p() {
  num2.innerHTML = Number(num2.innerHTML) + 1;
  if (mode == 0) {
  poda();
  }
  else
  {
    playMode();
  }
}

function playMode() {
  poda1.innerHTML = '';
  poda2.innerHTML = '';
  if(storonaSwitch == 0)
  {
    poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
    storonaSwitch = 1;
  }
  else
  {
    poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
    storonaSwitch = 0;
  }
  if(num1.innerHTML - num2.innerHTML == 2)
  {
n_round1.innerHTML = Number(n_round1.innerHTML) + 1;
    numReset();
    mode = 0;
  }
if (num2.innerHTML - num1.innerHTML == 2) {
   n_round2.innerHTML = Number(n_round2.innerHTML) + 1;
    numReset();
  mode = 0;
}

}


function numReset() {
  smena_pod.classList.remove("invisible");
  num1.innerHTML = 0;
  num2.innerHTML = 0;

  poda1.innerHTML = '';
  poda2.innerHTML = '';

  countPodach = 0;

  if (storonaSwitch == 0) {

    poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
  }
  else {

    poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
  }
}


function poda() {
  smena_pod.classList.add("invisible");
  if(num1.innerHTML == 20 && num2.innerHTML == 20)
  {
    mode = 1;
    return playMode();
  }
  if (num1.innerHTML >= 21) {
    n_round1.innerHTML = Number(n_round1.innerHTML) + 1;
    numReset();
  }
  if (num2.innerHTML >= 21) {
    n_round2.innerHTML = Number(n_round2.innerHTML) + 1;
    numReset();
  }
  //Konec turnira
  if (n_round1.innerHTML == 2 || n_round2.innerHTML == 2) {
    claps.play();
    alert(`Koniec turnira`);
    n_round1.innerHTML = 0;
    n_round2.innerHTML = 0;
  }
  //

  //Smena podach
  if (countPodach >= 5) {
    gitar.play();
    if (storonaSwitch == 0) {
      storonaSwitch = 1;
    }
    else {
      storonaSwitch = 0;
    }
    countPodach = 0;
  }
  //
  if (storonaSwitch == 0) {
    poda1.innerHTML = poda1.innerHTML + '<div class="mbox col-2 rounded-circle"></div>';
    poda2.innerHTML = '';
    countPodach += 1;
  }
  else {
    poda2.innerHTML = poda2.innerHTML + '<div class="mbox col-2 rounded-circle"></div>';
    poda1.innerHTML = '';
    countPodach += 1;
  }

}
//Knopka smeni podachi
function smenaPod() {
  if (storonaSwitch == 0) {
    storonaSwitch = 1;
    poda1.innerHTML = '';
    poda2.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
  }
  else {
    storonaSwitch = 0;
    poda2.innerHTML = '';
    poda1.innerHTML = '<div class="mbox col-2 rounded-circle"></div>';
  }
}

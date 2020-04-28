let listAnswer = [
    'AJAY',
    'SYAHKUN',
    'XMUSH',
    'YASIN',
    'ALUL',
    'ANDREFAJAR',
    'SHOFI',
    'DERBY',
    'AGUS',
    'BAGAS',
    'ROMLI',
    'ANDRENOVADO',
    'ROSLIANI',
    'YOPI'
]

let question = [
    "SIAPA MENTEE HATI-HATI BOY?",
    "DIA MAKAN MIE INSTAN 4 KALI DALAM SATU MALAM",
    "NAMA WARNET ALTA BATCH 5?",
    "SHE'S GONE?",
    "DALGONA COFFEE MAKER?",
    "KURMA EATER?",
    "KUTUKAN KEKALAHAN UNO DIPELOPORI OLEH?",
    "WHO CARES ABOUT THAT ADALAH SLOGANNYA?",
    "BERSAMA-SAMA BERCANDA LAGI?",
    "KALAU DIA BICARA SEPERTI TIDAK ADA REM",
    "DIA ADALAH KEPALA BIDANG KEROHANIAN",
    "DE LIMOGES A.K.A DELEMUZZHH",
    "KALAU DIPANGGIL MAS KOBAR AUTO KAGET?",
    "PALING JARANG MANDI?",
]

let playerAnswer = '';
let guessed = [];
let maxWrong = 6;
let mistakes = 0;
let wordStatus = null;
let level = 1;


function generateQuestion() {
    randomIndex = Math.floor(Math.random() * listAnswer.length);
    questions = question[randomIndex]
    document.getElementById('question').innerHTML = questions
    playerAnswer = listAnswer[randomIndex]
}

function generateButtons1() {
    let buttonsHTML = 'ABCDEFGHI'.split('').map(letter =>
        `
      <button
        class="btn-keyboard m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');
    document.getElementById('keyboard1').innerHTML = buttonsHTML;
}

function generateButtons2() {
    let buttonsHTML = 'JKLMNOPQR'.split('').map(letter =>
        `
      <button
        class="btn-keyboard m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');
    document.getElementById('keyboard2').innerHTML = buttonsHTML;
}

function generateButtons3() {
    let buttonsHTML = 'STUVWXYZ'.split('').map(letter =>
        `
      <button
        class="btn-keyboard m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('keyboard3').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
    if (playerAnswer.indexOf(chosenLetter) >= 0) {
        let correctSound = new Audio('sound/sonice.mp3')
        correctSound.play()
        guessedWord();
        checkIfGameWon();
    } else if (playerAnswer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangman-pic').src = './asset/' + mistakes + '.jpg';
}

function guessedWord() {
    wordStatus = playerAnswer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus
}


function soundMistake() {
    if (mistakes === 1) {
        let mstSound = new Audio('sound/ohno.mp3')
        mstSound.play()
    } else if (mistakes === 2) {
        let mstSound = new Audio('sound/again.mp3')
        mstSound.play()
    } else if (mistakes === 3) {
        let mstSound = new Audio('sound/ohno.mp3')
        mstSound.play()
    } else if (mistakes === 4) {
        let mstSound = new Audio('sound/didyou.mp3')
        mstSound.play()
    } else if (mistakes === 5) {
        let mstSound = new Audio('sound/gonnadie.mp3')
        mstSound.play()
    } else if (mistakes === 6) {
        let mstSound = new Audio('sound/scream.mp3')
        mstSound.play()
    }
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
    soundMistake();
}

function checkIfGameWon() {
    if (wordStatus == playerAnswer) {
        let winSound = new Audio('sound/win.mp3')
        winSound.play()
        document.getElementById('win-game').style.display = "block";
        document.getElementById('keyboard1').innerHTML = 'CONGRATULATIONS';
        document.getElementById('keyboard2').innerHTML = 'You Won';
        document.getElementById('keyboard3').innerHTML = 'The Game!!!';
    }
}

document.getElementById('maxWrong').innerHTML = maxWrong;

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('gameover').style.display = "block";
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + playerAnswer;
        document.getElementById('keyboard1').innerHTML = 'OOPS';
        document.getElementById('keyboard2').innerHTML = 'You Lose';
        document.getElementById('keyboard3').innerHTML = 'STUPID!!!';
    }
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('win-game').style.display = "none";
    document.getElementById('gameover').style.display = "none";
    document.getElementById('game-area').style.display = "block";
    generateQuestion();
    document.getElementById('hangman-pic').src = './asset/0.jpg';
    generateQuestion();
    guessedWord();
    updateMistakes();
    generateButtons1();
    generateButtons2();
    generateButtons3();
}

function endGame() {
    let mstSound = new Audio('sound/scream.mp3')
    mstSound.play()
    document.getElementById('gameover').style.display = "block";
    document.getElementById('game-area').style.display = "none";
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + playerAnswer;
}

generateQuestion();
guessedWord();
generateButtons1();
generateButtons2();
generateButtons3();
let listAnswer = [
    'SHOLEH',
    'AJI',
    'ROMLI',
    'ANDRE'
]

let question = [
    'Anak ekspresif?',
    'Anak insecure?',
    'Seksi konsumsi?',
    'Delemuzz?'
]

let playerAnswer = '';
let guessed = [];
let maxWrong = 5;
let mistakes = 0;
let wordStatus = null;
let level = 1;


function generateQuestion() {
    randomIndex = Math.floor(Math.random() * listAnswer.length);
    questions = question[randomIndex]
    document.getElementById('question').innerHTML = questions
    playerAnswer = listAnswer[randomIndex]
}


function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
      <button
        class="btn-keyboard m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}


function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (playerAnswer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        nextLevel();
        // checkIfGameWon();
    } else if (playerAnswer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './asset/' + mistakes + '.png';
}

// function checkIfGameWon() {
//     if (wordStatus === playerAnswer) {
//         document.getElementById('keyboard').innerHTML = 'You Won!!!';
//     }
// }

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + playerAnswer;
        document.getElementById('keyboard').innerHTML = 'You Lost!!!';
        // alert('YOU LOSE STUPID!!!')
    }
}

function guessedWord() {
    wordStatus = playerAnswer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

document.getElementById('maxWrong').innerHTML = maxWrong;
document.getElementById('level').innerHTML = `Level : ${level}`;


function nextLevel() {
    for (let level = 1; level < question.length; level++) {
        if (wordStatus === playerAnswer) {
            generateQuestion();
            guessedWord();
            handleGuess();
        } else {
            checkIfGameLost();
        }
    }
    generateButtons();
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './asset/0.png';
    generateQuestion();
    guessedWord();
    updateMistakes();
    generateButtons();
}

function endGame() {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + playerAnswer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    alert('YOU LOSE STUPID!!!')
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

generateQuestion();
guessedWord();
// generateButtons();
nextLevel();
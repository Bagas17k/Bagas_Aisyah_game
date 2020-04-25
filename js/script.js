let listAnswer = [
    'SHOLEH',
    'AJI'
]

let question = [
    'Anak ekspresif?',
    'Anak insecure?'
]

let playerAnswer = '';
let guessed = [];
let maxWrong = 5;
let mistakes = 0;
let wordStatus = null;
let level = 1;

randomIndex = Math.floor(Math.random() * listAnswer.length);

function generateQuestion() {
    questions = question[randomIndex]
    document.getElementById('question').innerHTML = questions
}

function randomAnswer() {
    playerAnswer = listAnswer[randomIndex]

}

function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
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
        checkIfGameWon();
    } else if (playerAnswer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function checkIfGameWon() {
    if (wordStatus === playerAnswer) {
        document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + playerAnswer;
        document.getElementById('keyboard').innerHTML = 'You Lost!!!';
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

// function nextLevel() {
//     for (let level = 0; level < question.length; level++) {
//         generateQuestion();
//         randomAnswer();
//         guessedWord();
//     }
//     generateButtons();
// }

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    guessed = [];
    // document.getElementById('hangmanPic').src = './images/0.jpg';
    generateQuestion();
    randomAnswer();
    guessedWord();
    updateMistakes();
    generateButtons();
}

// function shuffle(deck) {
//     for (var i = 0; i < 1000; i++) {
//         var location1 = Math.floor((Math.random() * deck.length));
//         var location2 = Math.floor((Math.random() * deck.length));
//         var tmp = deck[location1];

//         deck[location1] = deck[location2];
//         deck[location2] = tmp;
//     }
// }

generateQuestion();
randomAnswer();
guessedWord();
generateButtons();
// nextLevel();
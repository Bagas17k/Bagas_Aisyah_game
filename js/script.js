let listAnswer = [
  'Sholeh',
  'Aji'
]

let question = [
  'Anak ekspresif?',
  'Anak insecure?'
]

let playerAnswer = '';
let guessed = [];
let maxWrong = 6;
let mistakes = 0;
let wordStatus = null;

randomIndex = Math.floor(Math.random() * listAnswer.length);

function generateQuestion(){
  questions = question[randomIndex]
  document.getElementById('question').innerHTML = questions
}

function randomAnswer(){
  playerAnswer = listAnswer[randomIndex]

}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
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

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function guessedWord(){
  wordStatus = playerAnswer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.getElementById('wordSpotlight').innerHTML = wordStatus
}

generateQuestion();
randomAnswer();
generateButtons();
guessedWord();


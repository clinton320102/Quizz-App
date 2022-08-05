const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const readyText = document.getElementById("ready-text");
const questionEl = document.getElementById("question");
const answerBtns = document.getElementById("button-group");

let shuffleQuestion;
let currentQuestion;

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  setNextQuestion();
})

function startGame() {
  startBtn.classList.add("hide");
  questionContainer.classList.remove("hide");
  readyText.classList.add("hide");
  nextBtn.classList.remove("hide");

  shuffleQuestion = questions.sort(() => Math.random() - .5);
  currentQuestion = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestion[currentQuestion]);
}

function showQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text;
    button.classList.add("btn");
    if(answer.correct) {
      button.dataset.correct = answer.correct;
      score+=1;
    }
    
    button.addEventListener("click", selectAnswer);
    answerBtns.appendChild(button);
  })
}

function resetState() {
  clearStatus(document.body);
  nextBtn.classList.add("hide");
  while(answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild)
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target
  const correct = selectedBtn.dataset.correct
  setStatus(document.body, correct)
  Array.from(answerBtns.children).forEach(button => {
    setStatus(button, button.dataset.correct)
  })

  if(shuffleQuestion.length > currentQuestion + 1) {
    nextBtn.classList.remove("hide")
  } else {
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
  }
}

function setStatus(el, correct) {
  clearStatus(el) 
  if(correct) {
    console.log(score)
    el.classList.add("correct");
  } else {
    el.classList.add("wrong");
  }
}

function clearStatus(el) {
  el.classList.remove("correct");
  el.classList.remove("wrong");
}


// Questions
const questions = [
  {
    question: 'What is 15 + 9?',
    answers: [
      { text: '23', correct: false },
      { text: '24', correct: true }
    ]
  },
  {
    question: 'What is the capital of Japan?',
    answers: [
      { text: 'Seoul', correct: false },
      { text: 'Osaka', correct: false },
      { text: 'Tokyo', correct: true },
      { text: 'Taipei', correct: false }
    ]
  },
  {
    question: 'What is HTML stands for?',
    answers: [
      { text: 'How To Make Lumpia', correct: false },
      { text: 'How To Meet Ladies', correct: false },
      { text: 'HyperText Makeup Language', correct: false },
      { text: 'HyperText Markup Language', correct: true }
    ]
  }
]
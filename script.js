// start, as usual, calling your variables by id
//is it cool to use all ids here? i still don't think that I understand the difference between class and id
// use this or query selector
var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var questionContainer = document.querySelector("#question-container");
var questionEl = document.querySelector("#questionEl");
var answerEl = document.getElementById("answer-buttons");
var welcomeElement = document.getElementsByClassName("welcome");
var timerEl = document.getElementById("timer");

//initialize correctAnswers
var correctAnswers = 0;

//let can be updated, but not redeclared, "limited in scope to the statement", covered in office hours
let shuffledQuestions, currentQuestion;

//start quiz
//begin timer after the start button is clicked
startButton.addEventListener("click", startGame);
//fat arrow function
nextButton.addEventListener("click", () => {
  // increment through classes and display
  currentQuestion++;
  setNextQuestion();
});

function startGame() {
  setTime();
  // hide the start button at the beginnning of the quiz
  startButton.classList.add("hide");
  // hide the welcome screen after start of the quiz
  // welcomeElement.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
}

//shuffle questions
function setNextQuestion() {
  resetState();
  displayQuestion(shuffledQuestions[currentQuestion]);
}

//function to display the next question
function displayQuestion(question) {
  questionEl.innerText = question.question;
  question.answer.forEach((answer) => {
    // display buttons and text
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      correctAnswers++;
    } else if (correctAnswers > 0) {
      // decrement time... link to timer
      correctAnswers--;
      //becomes a local variable
      secondsLeft = secondsLeft - 5;
    }
    button.addEventListener("click", selectAnswer);
    answerEl.appendChild(button);
  });
}

//create array of questions... i believe that is the only way to do it
//could link to HTML instead
var questions = [
  {
    question: "Commonly used datatypes include all of the following, except: ",
    answer: [
      { text: "Strings", correct: false },
      { text: "Booleans", correct: true },
      { text: "Alerts", correct: false },
      { text: "Numbers", correct: false },
    ],
  },
  {
    // question about for loops
    question: "What function do you use to run the same code block?",
    answer: [
      { text: "For Loop", correct: true },
      { text: "Break Statement", correct: false },
      // a set condition has to be true
      { text: "Loop While", correct: false },
      // perform different actions based on different conditions
      { text: "Switch Statement", correct: false },
    ],
  },
  {
    question: "What is a loop that never ends referred to as?",
    answer: [
      { text: "For Loop", correct: false },
      { text: "Infinite Loop", correct: true },
      { text: "While Loop", correct: false },
      { text: "Recursive Loop", correct: false },
    ],
  },
  {
    question: "Arrays in JavaScript can be used store: ",
    answer: [
      { text: "Booleans", correct: false },
      { text: "Other arrays", correct: false },
      { text: "Numbers and Strings", correct: false },
      { text: "All listed possibilities", correct: true },
    ],
  },
];

//display 60 second timer after the quiz starts
var secondsLeft = 60;
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft + " seconds left";
    // console.log(secondsLeft);

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

//set event listener? to countdown when the user clicks the start button

//for some reason this needs to be declared after the display question function
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
}

//display the correct answer to users by changing the color
function selectAnswer(any) {
  //why doesn't var work?
  const select = any.target;
  const correct = select.dataset.correct;
  // setStatusClass(document.body, correct);
  Array.from(answerEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestion + 1) {
    nextButton.classList.remove("hide");
  } else {
    clearInterval(currentQuestion);
    // startButton.innerText = "Restart";
    // startButton.classList.remove("hide");
    prompt(
      "Congratulations! You scored " +
        correctAnswers +
        ". Please enter your initials."
    );
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

//Not responsive
//Create a timer that decrements when an answer is wrong
//my start button is small af
//Create function for user to input score at the the end

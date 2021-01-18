// declare variables from html
var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var questionContainer = document.querySelector("#question-container");
var questionEl = document.querySelector("#questions");
var answerEl = document.getElementById("answer-buttons");
var welcomeEl = document.getElementsByClassName("welcome");
var timerEl = document.getElementById("timer");

var currentQuestion = 0;
var correctAnswers = 0;

//let can be updated, but not redeclared, "limited in scope to the statement", covered in office hours
let shuffleQuestions;

//start quiz
startButton.addEventListener("click", startGame);
//fat arrow function, same as fununction
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
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  // currentQuestion = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
}

//display the next question
function displayQuestion() {
  answerEl.innerHTML = "";
  questionEl.innerText = questions[currentQuestion].question;
  for (var i = 0; i < 4; i++) {
    // display buttons and text
    var button = document.createElement("button");
    console.log(button);
    button.innerText = questions[currentQuestion].answer[i];
    button.classList.add("btn");
    // this needs to target the specific boolean value
    // if (answer.correct) {
    //   alert("Correct");
    //   button.dataset.correct = answer.correct;
    //   correctAnswers++;
    // } else if (correctAnswers.incorrect > 0) {
    //   // decrement time
    //   //this is not working WHY
    //   correctAnswers--;
    //   alert("Incorrect");
    //   //becomes a local variable
    //   secondsLeft = secondsLeft - 5;
    // }
    // button.addEventListener("click", selectAnswer);
    answerEl.appendChild(button);
  }
}

//create array of questions... i believe that is the only way to do it
//could link to HTML instead
//can i link to the boolean value true to select the correct answer?
var questions = [
  {
    question: "Commonly used datatypes include all of the following, except: ",
    answer: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Alerts",
  },
  {
    // array of objects
    question: "What function do you use to run the same code block?",
    answer: ["For Loop", "Break Statement", "If-Else", "Break Statement"],
    // a set condition has to be true"Loop While",
    // perform different actions based on different conditions"Switch Statement",],
    correctAnswer: "For Loop",
  },
  {
    question: "What is a loop that never ends referred to as?",
    answer: ["For Loop", "Infinite Loop", "While Loop", "Recursive Loop"],
    correctAnswer: "Infinite Loop",
  },
  {
    question: "Arrays in JavaScript can be used store: ",
    answer: [
      "Booleans",
      "Other arrays",
      "Numbers and Strings",
      "All listed possibilities",
    ],
    correctAnswer: "All listed possibilities",
  },
  {
    question: "You've got this one. Free question: ",
    answer: ["Wrong", "Pick this one", "Nope", "Do not click"],
    // why does prettier add commas after the brackets??
    correctAnswer: "Pick this one",
  },
];

//shuffle questions... nice feature to add
function setNextQuestion() {
  resetState();
  displayQuestion(shuffleQuestions[currentQuestion]);
}

//display 60 second timer after the quiz starts
var secondsLeft = 60;
function setTime() {
  // can ask setInterval using jQuery
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = "Timer: " + secondsLeft + " seconds";
    console.log(secondsLeft);
    // if the score reaches 0, the interval should clear
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      //this is also not working and I feel completely incompetent, can you do this with a function?
      sendMessage("Time is up!");
    }
  }, 1000);
}

//for some reason this needs to be declared after the display question function
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  //put the stop timer here
  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
}

//display the correct answer to users by changing the color
function checkAnswer(event) {
  if (!event.target.matches(".btn")) {
    return;
  }
  var userAnswer = event.target.innerText;
  if (userAnswer === questions[currentQuestion].correctAnswer) {
    alert("You got it!");
    score++;
  } else {
    alert("Wrong.");
    secondsLeft = secondsLeft - 5;
    // timerEl.textContent = "Timer: " + secondsLeft + " seconds";
  }
  currentQuestion++;
  displayQuestion();
  if (shuffleQuestions.length > currentQuestion + 1) {
    //why doesn't var work?
    // const select = any.target;
    // //this has to be declared second... ask elena
    // // document.querySelectorAll('[questions]');
    // const correct = select.dataset.correct;
    // // setStatusClass(document.body, correct);
    // Array.from(answerEl.children).forEach((button) => {
    //   setStatusClass(button, button.dataset.correct);
    // });

    // + 1 to document the final question... ask elena.. confused about this concept
    nextButton.classList.remove("hide");
  } else {
    clearInterval(currentQuestion);
    // startButton.innerText = "Restart";
    // startButton.classList.remove("hide");
    var initials = prompt(
      "Congratulations! You scored " +
        correctAnswers +
        ". Please enter your initials."
    );
    console.log(initials);
  }
  // if (initials == null) {
  //   prompt("Please enter your initials!");
  // }
}

//can i link the score and the output here?

// createSubmit.addEventListener("click", function () {
//   var initials = createInput.value;

//   if (initials === null) {

//       console.log("Please enter your initials.");

//   } else {
//    display final score and

//       }
// console.log(finalScore);
// var allScores = localStorage.getItem("allScores");
// if (allScores === null) {
//     allScores = [];
// } else {
//     allScores = JSON.parse();
// }
// allScores.push(finalScore);
// var  = JSON.stringify();
// localStorage.setItem("", );

// }

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    // correctAnswers++;
  } else {
    element.classList.add("incorrect");
    // correctAnswer--;
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

//Not responsive
//Make sure the timer decrements correctly and stops when the questions are over

answerEl.addEventListener("click", checkAnswer);

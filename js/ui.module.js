import { Score } from "./score.module.js";
export class Ui {
  questionNumber = document.querySelector("#questionNumber");
  questionBody = document.querySelector(".question-box p:last-child");
  answers = document.querySelector("#answers");
  nextQuestion = document.querySelector(".next");
  counter = 0;
  questionsArr = [];

  displayIntro() {
    document.querySelector(".intro").classList.remove("d-none");
    this.score = new Score();
    this.score.resetScore();
  }

  displayOptions() {
    document.querySelector(".intro").classList.add("d-none");
    document.querySelector(".options").classList.remove("d-none");
  }

  displayQuestions(list) {
    document.querySelector(".options").classList.add("d-none");
    document.querySelector(".questions").classList.remove("d-none");
    document.querySelector("#userScore").innerHTML = 0;
    console.log(list);
    this.questionUi(list);
  }

  questionUi(list) {
    if (list) {
      this.questionsArr = list;
      if (list[this.counter].type === "multiple") {
        this.multipleQuestion(list[this.counter]);
      } else if (list[this.counter].type === "boolean") {
        this.booleanQuestion(list[this.counter]);
      }
      this.questionNumber.innerHTML = this.counter + 1;
      this.questionBody.innerHTML = list[this.counter].question;
    }
  }

  multipleQuestion(question) {
    let answersList = [];
    let box = "";
    answersList.push(question.correct_answer);
    for (let i = 0; i < 3; i++) {
      answersList.push(question.incorrect_answers[i]);
    }
    answersList.sort();
    box += `<div class="col-md-6">
    <button class="w-75 mx-auto">${answersList[0]}</button>
  </div>
  <div class="col-md-6">
    <button class="w-75 mx-auto">${answersList[1]}</button>
  </div>
  <div class="col-md-6">
    <button class="w-75 mx-auto">${answersList[2]}</button>
  </div>
  <div class="col-md-6">
    <button class="w-75 mx-auto">${answersList[3]}</button>
  </div>`;
    answers.innerHTML = box;
    document.querySelectorAll("#answers button").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#answers button").forEach((btn) => {
          btn.classList.remove("active");
        });
        btn.classList.add("active");
        this.getNextQuestion(question.correct_answer);
      });
    });
  }

  booleanQuestion(question) {
    let box = "";
    box += `<div class="col-md-6">
    <button class="w-75 mx-auto">True</button>
  </div>
  <div class="col-md-6">
    <button class="w-75 mx-auto">False</button>
  </div>`;
    answers.innerHTML = box;
    document.querySelectorAll("#answers button").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#answers button").forEach((btn) => {
          btn.classList.remove("active");
        });
        btn.classList.add("active");
        this.getNextQuestion(question.correct_answer);
      });
    });
  }

  getNextQuestion(correctAnswer) {
    if (this.counter < this.questionsArr.length - 1) {
      this.nextQuestion.innerHTML = `<button id="next">Next Question</button>`;
      document.querySelector("#next").addEventListener("click", () => {
        this.counter += 1;
        this.score = new Score();
        let userAnswer = this.getUserAnswer();
        this.score.getScore(userAnswer, correctAnswer);
        this.questionUi(this.questionsArr);
        document.querySelector("#next").remove();
      });
    } else {
      this.nextQuestion.innerHTML = `<button id="result">Result</button>`;
      document.querySelector("#result").addEventListener("click", () => {
        this.score = new Score();
        let userAnswer = this.getUserAnswer();
        this.score.getScore(userAnswer, correctAnswer);
        document.querySelector("#result").remove();
        this.finalResult();
      });
    }
  }

  getUserAnswer() {
    let btns = document.querySelectorAll("#answers button");
    let userAnswer;
    btns.forEach((btn) => {
      if (btn.classList.contains("active")) {
        userAnswer = btn.textContent;
        return userAnswer;
      }
    });
    return userAnswer;
  }

  setScore(score) {
    let userScore = document.querySelector("#userScore");
    userScore.innerHTML = score;
  }

  finalResult() {
    document.querySelector(".questions").classList.add("d-none");
    document.querySelector(".result-box").classList.remove("d-none");
    let finalScore = document.querySelector("#userFinalResult");
    this.score = new Score();
    finalScore.innerHTML = this.score.getScoreNow();
    document.querySelector("#nextQuiz").addEventListener("click", () => {
      document.querySelector(".result-box").classList.add("d-none");
      this.score.resetScore();
      this.displayIntro();
    });
  }

  setName(name) {
    document.querySelector("#userNameScore").innerHTML = `${name} score:`;
  }
}

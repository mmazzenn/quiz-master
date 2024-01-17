import { Ui } from "./ui.module.js";
let score = 0;
if (sessionStorage.getItem(userScore)) {
  score = +sessionStorage.getItem(userScore);
}
export class Score {
  getScore(userAnswer, correctAnswer) {
    let decodeAnswer = this.decodeHtml(correctAnswer);
    if (userAnswer === decodeAnswer) {
      score += 1;
      sessionStorage.setItem("userScore", score);
      this.ui = new Ui();
      this.ui.setScore(score);
    }
  }
  getScoreNow() {
    return score;
  }
  resetScore() {
    sessionStorage.setItem("userScore", "0");
    score = +sessionStorage.getItem(userScore);
  }
  decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
}

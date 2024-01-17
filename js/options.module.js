import { Ui } from "./ui.module.js";
import { Questions } from "./questions.module.js";
export class Options {
  constructor() {
    this.ui = new Ui();
    this.ui.displayOptions();
    document.querySelector(".begin-btn").addEventListener("click", () => {
      const userName = document.querySelector("#userName");
      const userCategory = document.querySelector("#userCategory");
      const userDifficulty = document.querySelector("#userDifficulty");
      this.getQuestions(
        userName.value,
        userCategory.value,
        userDifficulty.value
      );
    });
  }
  validateUserName(name) {
    const regex = /^[A-Za-z]{1,}(-|_|\s)?[A-Za-z1-9]{2,}$/gi;
    return regex.test(name);
  }
  getQuestions(name, category, difficulty) {
    const validName = this.validateUserName(name);
    if (validName) {
      this.questions = new Questions(name, category, difficulty);
    } else {
      userName.style.cssText = "box-shadow: 1px 1px 10px 1px #dc3545";
      userName.placeholder = "Please enter valid name";
    }
  }
}

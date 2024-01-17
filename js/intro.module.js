import { Options } from "./options.module.js";
import { Ui } from "./ui.module.js";

export class Intro {
  constructor() {
    this.load = document.querySelector(".loading");
    this.ui = new Ui();
    this.getIntro();
    document.querySelector("#startQuiz").addEventListener("click", () => {
      this.getOptions();
    });
  }
  getIntro() {
    this.ui.displayIntro();
  }
  getOptions() {
    this.options = new Options();
  }
}

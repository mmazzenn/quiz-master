import { Ui } from "./ui.module.js";
export class Questions {
  load = document.querySelector(".loading");
  constructor(name, category, difficulty) {
    this.ui = new Ui();
    this.questionsApi(name, category, difficulty);
  }
  async questionsApi(name, category, difficulty) {
    this.load.classList.remove("d-none");
    category = category === "any" ? "" : `&category=${category}`;
    difficulty = difficulty === "any" ? "" : `&difficulty=${difficulty}`;
    const res = await fetch(
      `https://opentdb.com/api.php?amount=20${category}${difficulty}`
    );
    const resData = await res.json();
    this.ui.displayQuestions(resData.results);
    this.ui.setName(name);
    this.load.classList.add("d-none");
  }
}

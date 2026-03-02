import { setScreen } from "../main.js";

export function renderIntro() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="first-space"></div>
    <button class="welcome_button">Clique !</button>
  `;

  const button = document.querySelector(".welcome_button");
  button.addEventListener("click", showStageTransition);
}

function showStageTransition() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="first-space"></div>
    <div class="stage_box fade-in">Première étape...</div>
  `;

  const stageBox = document.querySelector(".stage_box");

  setTimeout(() => {
    stageBox.classList.remove("fade-in");
    stageBox.classList.add("fade-out");

    stageBox.addEventListener("animationend", () => {
      setScreen("pairs");
    }, { once: true });

  }, 2000);
}
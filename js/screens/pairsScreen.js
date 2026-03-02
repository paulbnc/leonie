import { setScreen } from "../main.js";

export function renderPairs() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="stage_box">Essaye de relier</div>
    <div class="pairs-container"></div>
  `;

  const container = document.querySelector(".pairs-container");

  const colors = [
    "crimson", "crimson",
    "royalblue", "royalblue",
    "seagreen", "seagreen"
  ];

  colors.sort(() => Math.random() - 0.5);

  let firstSelected = null;
  let lock = false;
  let matches = 0;

  colors.forEach(color => {
    const circle = document.createElement("div");
    circle.classList.add("pair-circle");
    circle.style.background = color;
    circle.dataset.color = color;

    circle.addEventListener("click", () => {

      if (lock) return;
      if (circle.classList.contains("matched")) return;

      circle.classList.add("selected");

      if (!firstSelected) {
        firstSelected = circle;
      } else {

        if (firstSelected.dataset.color === circle.dataset.color) {

          firstSelected.classList.remove("selected");
          circle.classList.remove("selected");

          firstSelected.classList.add("matched");
          circle.classList.add("matched");

          matches++;
          firstSelected = null;

          if (matches === 3) {
            setTimeout(() => {
              setScreen("reflex");
            }, 800);
          }

        } else {

          lock = true;
          setTimeout(() => {
            firstSelected.classList.remove("selected");
            circle.classList.remove("selected");
            firstSelected = null;
            lock = false;
          }, 600);

        }
      }
    });

    container.appendChild(circle);
  });
}
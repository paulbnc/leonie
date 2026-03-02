export function renderIntro() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="first-space"></div>
    <button class="welcome_button">Clique !</button>
  `;

  const button = document.querySelector(".welcome_button");
  button.addEventListener("click", () => {
    alert("Première étape...");
  });
}
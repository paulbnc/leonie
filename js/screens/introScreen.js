export function renderIntro() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="first-space"></div>
    <button class="welcome_button">Clique !</button>
  `;

  const button = document.querySelector(".welcome_button");
  button.addEventListener("click", () => {
    
        const box = document.createElement("div");
        box.classList.add("stage_box");
        box.textContent = "Première étape...";

        const app = document.getElementById("app");
        app.appendChild(box);

        button.disabled = true; // évite double clic
  });
}
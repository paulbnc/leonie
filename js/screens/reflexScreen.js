import { setScreen } from "../main.js";

export function renderReflex() {
  const app = document.getElementById("app");

  // Transition smooth intro
  app.innerHTML = `
    <div class="first-space"></div>
    <div class="stage_box fade-in">Deuxième étape...</div>
  `;
  const stageBox = document.querySelector(".stage_box");
  setTimeout(() => {
    stageBox.classList.remove("fade-in");
    stageBox.classList.add("fade-out");
  }, 2000);

  // Lancer le jeu après la transition intro
  setTimeout(() => {
    startReflexGame(app);
  }, 3000);
}

function startReflexGame(app) {
  let heartsClicked = 0;
  const HEARTS_TO_WIN = 10;
  let brokenHeartsClicked = 0;
  const MAX_BROKEN = 3;
  let activeHearts = [];
  let spawnInterval = null;
  let gameOver = false;

  app.innerHTML = `
    <div class="reflex-game">
      <div class="reflex-hud">
        <div class="reflex-score">
          <span class="hud-label">Coeurs</span>
          <span class="hud-value" id="hearts-count">0 / ${HEARTS_TO_WIN}</span>
        </div>
        <div class="reflex-lives">
          <span class="hud-label">Vies restantes</span>
          <div id="lives-display">
            <span class="life">💗</span>
            <span class="life">💗</span>
            <span class="life">💗</span>
          </div>
        </div>
      </div>
      <div class="reflex-arena" id="reflex-arena"></div>
      <div class="reflex-overlay hidden" id="reflex-overlay">
        <div class="overlay-content" id="overlay-content"></div>
      </div>
    </div>
  `;

  const arena = document.getElementById("reflex-arena");
  const heartsCountEl = document.getElementById("hearts-count");
  const livesDisplay = document.getElementById("lives-display");
  const overlay = document.getElementById("reflex-overlay");
  const overlayContent = document.getElementById("overlay-content");

  function updateLives() {
    const remaining = MAX_BROKEN - brokenHeartsClicked;
    livesDisplay.innerHTML = "";
    for (let i = 0; i < MAX_BROKEN; i++) {
      const span = document.createElement("span");
      span.className = "life";
      span.textContent = i < remaining ? "💗" : "🖤";
      livesDisplay.appendChild(span);
    }
  }

  function spawnHeart() {
    if (gameOver) return;

    const isBroken = Math.random() < 0.4; // 30% chance d'un coeur brisé
    const img = document.createElement("img");
    img.src = isBroken
      ? `../assets/images/reflex/broken_heart.png`
      : `../assets/images/reflex/heart.png`;
    img.className = "reflex-heart" + (isBroken ? " broken" : "");

    // Position aléatoire dans l'arène
    const size = 60 + Math.random() * 30; // taille entre 60 et 90px
    const maxX = arena.offsetWidth - size - 10;
    const maxY = arena.offsetHeight - size - 10;
    const x = 10 + Math.random() * maxX;
    const y = 10 + Math.random() * maxY;

    img.style.width = size + "px";
    img.style.left = x + "px";
    img.style.top = y + "px";

    // Durée de vie du coeur (entre 1.2s et 2.5s)
    const lifetime = 1200 + Math.random() * 1300;

    img.addEventListener("click", () => {
      if (gameOver) return;
      activeHearts = activeHearts.filter(h => h.el !== img);

      if (isBroken) {
        brokenHeartsClicked++;
        updateLives();
        img.classList.add("heart-shake");
        setTimeout(() => img.remove(), 300);
        if (brokenHeartsClicked >= MAX_BROKEN) {
          endGame(false);
        }
      } else {
        heartsClicked++;
        heartsCountEl.textContent = `${heartsClicked} / ${HEARTS_TO_WIN}`;
        img.classList.add("heart-pop");
        setTimeout(() => img.remove(), 300);
        if (heartsClicked >= HEARTS_TO_WIN) {
          endGame(true);
        }
      }
    });

    arena.appendChild(img);

    // Animation d'entrée (frame suivante pour déclencher la transition CSS)
    requestAnimationFrame(() => img.classList.add("heart-visible"));

    const timeout = setTimeout(() => {
      img.classList.remove("heart-visible");
      img.classList.add("heart-fadeout");
      setTimeout(() => {
        if (img.parentNode) img.remove();
        activeHearts = activeHearts.filter(h => h.el !== img);
      }, 300);
    }, lifetime);

    activeHearts.push({ el: img, timeout });
  }

  function endGame(won) {
    gameOver = true;
    clearInterval(spawnInterval);
    // Nettoyer les coeurs restants
    activeHearts.forEach(h => {
      clearTimeout(h.timeout);
      if (h.el.parentNode) h.el.remove();
    });
    activeHearts = [];

    overlay.classList.remove("hidden");

    if (won) {
      overlayContent.innerHTML = `
        <div class="overlay-win">
          <div class="overlay-emoji">🎉</div>
          <div class="overlay-title">Bravo !</div>
          <div class="overlay-subtitle">Tu as attrapé ${HEARTS_TO_WIN} coeurs !</div>
        </div>
      `;
      setTimeout(() => setScreen("snake"), 2200);
    } else {
      overlayContent.innerHTML = `
        <div class="overlay-lose">
          <div class="overlay-emoji">💔</div>
          <div class="overlay-title">Perdu !</div>
          <div class="overlay-subtitle">Trop de coeurs brisés...</div>
          <button class="retry-btn" id="retry-btn">Réessayer</button>
        </div>
      `;
      document.getElementById("retry-btn").addEventListener("click", () => {
        renderReflex();
      });
    }
  }

  // Spawner les coeurs toutes les ~800ms
  spawnInterval = setInterval(spawnHeart, 800);
  // Premier coeur immédiat
  spawnHeart();
}
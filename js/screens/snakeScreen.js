import { setScreen } from "../main.js";

export function renderSnake() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="first-space"></div>
    <div class="stage_box fade-in">Troisième étape...</div>
  `;
  const stageBox = document.querySelector(".stage_box");
  setTimeout(() => {
    stageBox.classList.remove("fade-in");
    stageBox.classList.add("fade-out");
  }, 2000);

  setTimeout(() => {
    startSnakeGame(app);
  }, 3000);
}

function startSnakeGame(app) {
  const GRID = 40;
  const COLS = 15;
  const ROWS = 15;
  const CANVAS_SIZE = GRID * COLS;
  const FOOD_TO_WIN = 10;
  const SPEED = 7;

  app.innerHTML = `
    <div class="snake-game">
      <div class="snake-hud">
        <div class="snake-score-box">
          <span class="hud-label">Nourriture</span>
          <span class="hud-value" id="snake-score">0 / ${FOOD_TO_WIN}</span>
        </div>
        <div class="snake-title-box">MANGE-PAUL</div>
        <div class="snake-info-box">
          <span class="hud-label">Flèches pour bouger</span>
          <span class="hud-value snake-keys">↑ ↓ ← →</span>
        </div>
      </div>
      <div class="snake-canvas-wrapper">
        <canvas id="snake-canvas" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}"></canvas>
        <div class="snake-overlay hidden" id="snake-overlay">
          <div class="overlay-content" id="snake-overlay-content"></div>
        </div>
      </div>
    </div>
  `;

  const canvas = document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("snake-score");
  const overlay = document.getElementById("snake-overlay");
  const overlayContent = document.getElementById("snake-overlay-content");

  const headImg = new Image();
  headImg.src = "assets/images/characters/leonie.png";
  const foodImg = new Image();
  foodImg.src = "assets/images/characters/paul.png";

  let snake = {
    x: Math.floor(COLS / 2) * GRID,
    y: Math.floor(ROWS / 2) * GRID,
    dx: GRID,
    dy: 0,
    cells: [],
    maxCells: 4
  };

  let food = randomFood();
  let foodEaten = 0;
  let gameOver = false;
  let animId = null;
  let count = 0;

  // Tremblement à la mort
  let shakeFrames = 0;
  const SHAKE_DURATION = 18; // frames de tremblement

  function randomFood() {
    return {
      x: Math.floor(Math.random() * COLS) * GRID,
      y: Math.floor(Math.random() * ROWS) * GRID
    };
  }

  function shake() {
    shakeFrames = SHAKE_DURATION;
    function doShake() {
      if (shakeFrames <= 0) {
        canvas.style.transform = "translate(0, 0)";
        showDeathOverlay();
        return;
      }
      const intensity = 8 * (shakeFrames / SHAKE_DURATION);
      const ox = (Math.random() - 0.5) * 2 * intensity;
      const oy = (Math.random() - 0.5) * 2 * intensity;
      canvas.style.transform = `translate(${ox}px, ${oy}px)`;
      shakeFrames--;
      requestAnimationFrame(doShake);
    }
    requestAnimationFrame(doShake);
  }

  function showDeathOverlay() {
    overlay.classList.remove("hidden");
    overlayContent.innerHTML = `
      <div class="overlay-lose">
        <div class="overlay-title">Perdu !</div>
        <div class="overlay-subtitle">Le snake s'est mordu...</div>
        <button class="retry-btn" id="snake-retry-btn">Réessayer</button>
      </div>
    `;
    document.getElementById("snake-retry-btn").addEventListener("click", () => {
      renderSnake();
    });
  }

  function endGame(won) {
    gameOver = true;
    cancelAnimationFrame(animId);

    if (won) {
      overlay.classList.remove("hidden");
      overlayContent.innerHTML = `
        <div class="overlay-win">
          <div class="overlay-title">Bravo !</div>
          <div class="overlay-subtitle">Léonie a bien mangé...</div>
        </div>
      `;
      setTimeout(() => setScreen("tulipes"), 2200);
    } else {
      shake(); // tremblement d'abord, overlay ensuite
    }
  }

  function loop() {
    animId = requestAnimationFrame(loop);
    if (++count < SPEED) return;
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Points de grille
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (let gx = 0; gx < COLS; gx++) {
      for (let gy = 0; gy < ROWS; gy++) {
        ctx.beginPath();
        ctx.arc(gx * GRID + GRID / 2, gy * GRID + GRID / 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Déplacement
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Collision murs
    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
      endGame(false);
      return;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    // --- Corps uniforme ---
    // 1. Remplir tous les segments d'un bloc plein GRID×GRID (sans gap)
    ctx.fillStyle = "#ca9910";
    snake.cells.forEach((cell, index) => {
      if (index > 0) {
        ctx.fillRect(cell.x, cell.y, GRID, GRID);
      }
    });

    // 2. Repasser sur les jointures entre segments consécutifs pour effacer
    //    les éventuels pixels de fond qui apparaîtraient à cause du rendu.
    //    (Ici inutile puisqu'on remplit GRID plein, mais on garde un contour
    //    sur les bords extérieurs du corps uniquement.)
    // On dessine le contour du corps en path unifié
    if (snake.cells.length > 1) {
      ctx.strokeStyle = "#ce0249";
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";

      // Construire le path du contour extérieur via une union de rectangles
      // La technique la plus simple : on repasse un strokeRect sur chaque segment
      // MAIS on ne veut pas les bords internes. On utilise donc un path composé.
      // Solution : on dessine un chemin qui suit la silhouette.
      // Méthode pratique : dessiner chaque segment plein, puis stroke uniquement
      // les bords qui ne sont pas partagés avec un voisin.
      const cellSet = new Set(snake.cells.slice(1).map(c => `${c.x},${c.y}`));
      snake.cells.slice(1).forEach(cell => {
        const neighbors = {
          top:    cellSet.has(`${cell.x},${cell.y - GRID}`),
          bottom: cellSet.has(`${cell.x},${cell.y + GRID}`),
          left:   cellSet.has(`${cell.x - GRID},${cell.y}`),
          right:  cellSet.has(`${cell.x + GRID},${cell.y}`)
        };
        ctx.beginPath();
        if (!neighbors.top)    { ctx.moveTo(cell.x, cell.y);        ctx.lineTo(cell.x + GRID, cell.y); }
        if (!neighbors.bottom) { ctx.moveTo(cell.x, cell.y + GRID); ctx.lineTo(cell.x + GRID, cell.y + GRID); }
        if (!neighbors.left)   { ctx.moveTo(cell.x, cell.y);        ctx.lineTo(cell.x, cell.y + GRID); }
        if (!neighbors.right)  { ctx.moveTo(cell.x + GRID, cell.y); ctx.lineTo(cell.x + GRID, cell.y + GRID); }
        ctx.stroke();
      });
    }

    // Nourriture (paul.png) — cercle
    ctx.save();
    ctx.beginPath();
    ctx.arc(food.x + GRID / 2, food.y + GRID / 2, GRID / 2 - 1, 0, Math.PI * 2);
    ctx.clip();
    if (foodImg.complete) {
      ctx.drawImage(foodImg, food.x + 1, food.y + 1, GRID - 2, GRID - 2);
    } else {
      ctx.fillStyle = "#ce0249";
      ctx.fill();
    }
    ctx.restore();

    // Tête : leonie.png — cercle (dessinée en dernier, par-dessus le corps)
    if (snake.cells.length > 0) {
      const cell = snake.cells[0];
      ctx.save();
      const cx = cell.x + GRID / 2;
      const cy = cell.y + GRID / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, GRID / 2 - 1, 0, Math.PI * 2);
      ctx.clip();
      if (headImg.complete) {
        ctx.translate(cx, cy);
        let angle = 0;
        if (snake.dx === GRID)       angle = 0;
        else if (snake.dx === -GRID) angle = Math.PI;
        else if (snake.dy === -GRID) angle = -Math.PI / 2;
        else if (snake.dy === GRID)  angle = Math.PI / 2;
        ctx.rotate(angle);
        ctx.drawImage(headImg, -GRID / 2 + 1, -GRID / 2 + 1, GRID - 2, GRID - 2);
      } else {
        ctx.fillStyle = "#fafafa";
        ctx.fill();
      }
      ctx.restore();
    }

    // Collisions (itère sur tous les segments sauf la tête)
    snake.cells.forEach((cell, index) => {
      // Nourriture
      if (index === 0 && cell.x === food.x && cell.y === food.y) {
        snake.maxCells++;
        foodEaten++;
        scoreEl.textContent = `${foodEaten} / ${FOOD_TO_WIN}`;
        food = randomFood();
        if (foodEaten >= FOOD_TO_WIN) {
          endGame(true);
          return;
        }
      }

      // Corps
      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          endGame(false);
          return;
        }
      }
    });
  }

  const handleKey = (e) => {
    if (e.which === 37 && snake.dx === 0)      { snake.dx = -GRID; snake.dy = 0; }
    else if (e.which === 38 && snake.dy === 0) { snake.dy = -GRID; snake.dx = 0; }
    else if (e.which === 39 && snake.dx === 0) { snake.dx = GRID;  snake.dy = 0; }
    else if (e.which === 40 && snake.dy === 0) { snake.dy = GRID;  snake.dx = 0; }
  };
  document.addEventListener("keydown", handleKey);
  window._snakeCleanup = () => document.removeEventListener("keydown", handleKey);

  animId = requestAnimationFrame(loop);
}
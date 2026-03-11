import { renderIntro } from "./screens/introScreen.js";
import { renderPairs } from "./screens/pairsScreen.js";
import { renderReflex } from "./screens/reflexScreen.js";
import { renderSnake } from "./screens/snakeScreen.js";
import { renderReward } from "./screens/rewardScreen.js";

//let screen = "intro";
let screen = "intro";
export function setScreen(newScreen) {
  screen = newScreen;
  render();
}

function render() {
  if (screen === "intro") renderIntro();
  if (screen === "pairs") renderPairs();
  if (screen === "reflex") renderReflex();
  if (screen === "snake") renderSnake();
  if (screen === "tulipes") renderReward();
}

render();
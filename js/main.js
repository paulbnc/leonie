import { renderIntro } from "./screens/introScreen.js";
import { renderPairs } from "./screens/pairsScreen.js";

let screen = "intro";

export function setScreen(newScreen) {
  screen = newScreen;
  render();
}

function render() {
  if (screen === "intro") renderIntro();
  if (screen === "pairs") renderPairs();
  if (screen === "reflex") console.log("à suivre...");
}

render();
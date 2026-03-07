import { setScreen } from "../main.js";

export function renderPairs() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="stage_box">Essaye de relier</div>
    <div class="pairs-container"></div>
  `;

  const container = document.querySelector(".pairs-container");

  const couples = [
    ["leonie", "paul"],
    /*["shane", "ilya"],
    ["simon", "daphne"],
    ["bella", "edward"],
    ["frida", "diego"],
    ["tristan", "yseut"],
    ["willow", "tara"],
    ["nick", "charlie"],
    ["bonnie", "clyde"],
    ["leia", "solo"],
    ["mickey", "mini"],
    ["fiona", "shrek"],
    ["peach", "mario"],
    ["jayz", "beyonce"],
    ["oberyn", "ellaria"],
    ["romeo", "juliette"],
    ["tlou1", "tlou2"],
    ["morticia", "morticia_husband"]*/
  ];

  // Génère une liste de noms à partir des couples, en doublant chaque nom
  let names = [];
  couples.forEach(couple => {
    names.push(couple[0], couple[1]);
  });

  // Mélange les noms aléatoirement
  names.sort(() => Math.random() - 0.5);

  // Associe une couleur unique à chaque couple
  const coupleColors = {};
  const colors = ["crimson", "royalblue", "seagreen", "darkorange", "indigo", "darkviolet"];
  couples.forEach((couple, index) => {
    coupleColors[couple[0]] = colors[index % colors.length];
    coupleColors[couple[1]] = colors[index % colors.length];
  });

  let firstSelected = null;
  let lock = false;
  let matches = 0;

  names.forEach(name => {
    const circle = document.createElement("div");
    circle.classList.add("pair-circle");
    circle.style.background = coupleColors[name];
    circle.dataset.name = name;
    circle.dataset.couple = couples.find(c => c.includes(name))[0] + couples.find(c => c.includes(name))[1];

    const img = document.createElement("img");
    img.src = `../assets/images/characters/${name}.png`;
    img.alt = name;
    img.classList.add("circle-img");

    circle.appendChild(img);

    circle.addEventListener("click", () => {
      if (lock) return;
      if (circle.classList.contains("matched")) return;

      circle.classList.add("selected");

      if (!firstSelected) {
        firstSelected = circle;
      } else {
        const firstName = firstSelected.dataset.name;
        const secondName = circle.dataset.name;
        const isCouple = couples.some(c => c.includes(firstName) && c.includes(secondName));

        if (isCouple) {
          firstSelected.classList.remove("selected");
          circle.classList.remove("selected");

          firstSelected.classList.add("matched");
          circle.classList.add("matched");

          matches++;
          firstSelected = null;

          if (matches === couples.length) {
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

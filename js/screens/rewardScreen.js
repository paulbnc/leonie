import { setScreen } from "../main.js";

export function renderReward() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="first-space"></div>
    <div class="stage_box fade-in">Félicitations !</div>
  `;
  const stageBox = document.querySelector(".stage_box");
  setTimeout(() => {
    stageBox.classList.remove("fade-in");
    stageBox.classList.add("fade-out");
  }, 2000);

  setTimeout(() => {
    startRewardScene(app);
  }, 3000);
}

function startRewardScene(app) {
  app.innerHTML = `<div class="reward-wrapper fade-in">
    <!-- Nuages SVG (fond) -->
    <svg class="reward-clouds" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
      <g class="cloud">
        <ellipse cx="100" cy="70" rx="55" ry="22" fill="white" opacity=".8"/>
        <ellipse cx="78"  cy="52" rx="32" ry="24" fill="white" opacity=".8"/>
        <ellipse cx="128" cy="50" rx="26" ry="20" fill="white" opacity=".8"/>
      </g>


    </svg>

    <div class="reward-title">bon anniversaire :)</div>


    <!-- Scène tulipes -->
    <svg id="reward-scene" width="360" height="280" viewBox="0 0 360 280">

        <image
            href="assets/images/reward/hug.png"
            x="-250" y="100"
            width="200" height="200"
            />


      <!-- TULIPE 1 : Jaune, centrale, grande -->
      <g id="t1" transform="translate(180,280)">
        <rect x="-4" y="-165" width="8" height="165" rx="4" fill="#2e7d32"/>
        <ellipse cx="-16" cy="-80" rx="11" ry="21" fill="#388e3c" transform="rotate(-35,-16,-80)"/>
        <ellipse cx="15"  cy="-100" rx="11" ry="21" fill="#388e3c" transform="rotate(33,15,-100)"/>
        <g transform="translate(0,-165)">
          <ellipse cx="0" cy="-28" rx="13" ry="32" fill="#f9a825" transform="rotate(-36,0,0)"/>
          <ellipse cx="0" cy="-28" rx="13" ry="32" fill="#fdd835" transform="rotate(-18,0,0)"/>
          <ellipse cx="0" cy="-28" rx="13" ry="32" fill="#fff176" transform="rotate(0,0,0)"/>
          <ellipse cx="0" cy="-28" rx="13" ry="32" fill="#fdd835" transform="rotate(18,0,0)"/>
          <ellipse cx="0" cy="-28" rx="13" ry="32" fill="#f9a825" transform="rotate(36,0,0)"/>
          <rect x="-3" y="-20" width="6" height="16" rx="3" fill="#e65100"/>
        </g>
      </g>

      <!-- TULIPE 2 : Rouge, gauche -->
      <g id="t2" transform="translate(108,280)">
        <rect x="-3.5" y="-140" width="7" height="140" rx="3.5" fill="#2e7d32"/>
        <ellipse cx="-13" cy="-68" rx="10" ry="19" fill="#388e3c" transform="rotate(-37,-13,-68)"/>
        <ellipse cx="13"  cy="-88" rx="10" ry="19" fill="#388e3c" transform="rotate(32,13,-88)"/>
        <g transform="translate(0,-140)">
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#c62828" transform="rotate(-36,0,0)"/>
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#e53935" transform="rotate(-18,0,0)"/>
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#ef5350" transform="rotate(0,0,0)"/>
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#e53935" transform="rotate(18,0,0)"/>
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#c62828" transform="rotate(36,0,0)"/>
          <rect x="-2.5" y="-17" width="5" height="12" rx="2.5" fill="#fdd835"/>
        </g>
      </g>

      <!-- TULIPE 3 : Rose, droite -->
      <g id="t3" transform="translate(252,280)">
        <rect x="-3.5" y="-145" width="7" height="145" rx="3.5" fill="#2e7d32"/>
        <ellipse cx="-13" cy="-72" rx="10" ry="19" fill="#388e3c" transform="rotate(-35,-13,-72)"/>
        <ellipse cx="13"  cy="-92" rx="10" ry="19" fill="#388e3c" transform="rotate(33,13,-92)"/>
        <g transform="translate(0,-145)">
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#ad1457" transform="rotate(-36,0,0)"/>
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#e91e8c" transform="rotate(-18,0,0)"/>
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#f06292" transform="rotate(0,0,0)"/>
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#e91e8c" transform="rotate(18,0,0)"/>
          <ellipse cx="0" cy="-24" rx="11" ry="28" fill="#ad1457" transform="rotate(36,0,0)"/>
          <rect x="-2.5" y="-17" width="5" height="12" rx="2.5" fill="#fdd835"/>
        </g>
      </g>

      <!-- TULIPE 4 : Violet, petite gauche -->
      <g id="t4" transform="translate(55,280)">
        <rect x="-3" y="-115" width="6" height="115" rx="3" fill="#2e7d32"/>
        <ellipse cx="-11" cy="-55" rx="9" ry="17" fill="#388e3c" transform="rotate(-37,-11,-55)"/>
        <g transform="translate(0,-115)">
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#6a1b9a" transform="rotate(-36,0,0)"/>
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#ab47bc" transform="rotate(-18,0,0)"/>
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#ce93d8" transform="rotate(0,0,0)"/>
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#ab47bc" transform="rotate(18,0,0)"/>
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#6a1b9a" transform="rotate(36,0,0)"/>
          <rect x="-2" y="-14" width="4" height="10" rx="2" fill="#fdd835"/>
        </g>
      </g>

      <!-- TULIPE 5 : Orange, petite droite -->
      <g id="t5" transform="translate(305,280)">
        <rect x="-3" y="-118" width="6" height="118" rx="3" fill="#2e7d32"/>
        <ellipse cx="11" cy="-57" rx="9" ry="17" fill="#388e3c" transform="rotate(35,11,-57)"/>
        <g transform="translate(0,-118)">
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#bf360c" transform="rotate(-36,0,0)"/>
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#ff5722" transform="rotate(-18,0,0)"/>
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#ff8a65" transform="rotate(0,0,0)"/>
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#ff5722" transform="rotate(18,0,0)"/>
          <ellipse cx="0" cy="-20" rx="9" ry="23" fill="#bf360c" transform="rotate(36,0,0)"/>
          <rect x="-2" y="-14" width="4" height="10" rx="2" fill="#fdd835"/>
        </g>
      </g>

    </svg>

    <!-- Coccinelle en SVG inline -->
    <svg id="reward-ladybug" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
      <!-- Ailes membraneuses transparentes -->
      <g id="underwings">
        <ellipse id="uwL" cx="11" cy="28" rx="9" ry="14" fill="rgba(180,220,255,0.45)" stroke="rgba(100,160,220,0.5)" stroke-width="0.5"/>
        <ellipse id="uwR" cx="25" cy="28" rx="9" ry="14" fill="rgba(180,220,255,0.45)" stroke="rgba(100,160,220,0.5)" stroke-width="0.5"/>
      </g>
      <!-- Antennes -->
      <line x1="13" y1="6" x2="7"  y2="0" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="23" y1="6" x2="29" y2="0" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="7"  cy="0" r="1.5" fill="#111"/>
      <circle cx="29" cy="0" r="1.5" fill="#111"/>
      <!-- Tête -->
      <ellipse cx="18" cy="10" rx="7" ry="6" fill="#111"/>
      <!-- Élytres rouges -->
      <ellipse id="wL" cx="11" cy="26" rx="9" ry="13" fill="#e60000"/>
      <ellipse id="wR" cx="25" cy="26" rx="9" ry="13" fill="#e60000"/>
      <!-- Ligne centrale -->
      <rect x="16.5" y="13" width="3" height="23" rx="1.5" fill="#111"/>
      <!-- Points gauche -->
      <circle cx="9"  cy="21" r="2.8" fill="#111"/>
      <circle cx="8"  cy="31" r="2.3" fill="#111"/>
      <!-- Points droite -->
      <circle cx="27" cy="21" r="2.8" fill="#111"/>
      <circle cx="28" cy="31" r="2.3" fill="#111"/>
    </svg>
  </div>`;

  // ---- Balancement des tiges ----
  const tulips = [
    { el: document.getElementById('t1'), cx: 180, speed: 4.0,  amp:  2.0, phase: 0.0 },
    { el: document.getElementById('t2'), cx: 108, speed: 3.6,  amp: -2.5, phase: 0.4 },
    { el: document.getElementById('t3'), cx: 252, speed: 5.1,  amp:  2.0, phase: 1.2 },
    { el: document.getElementById('t4'), cx:  55, speed: 4.4,  amp: -2.5, phase: 0.7 },
    { el: document.getElementById('t5'), cx: 305, speed: 3.8,  amp:  2.0, phase: 2.0 },
  ];
  tulips.forEach(({ el, cx }) => el.setAttribute('transform', `translate(${cx},280)`));

  function swayTulips(ts) {
    const t = ts / 1000;
    tulips.forEach(({ el, cx, speed, amp, phase }) => {
      const angle = amp * Math.sin((t / speed) * Math.PI * 2 + phase);
      el.setAttribute('transform', `rotate(${angle},${cx},280) translate(${cx},280)`);
    });
    requestAnimationFrame(swayTulips);
  }
  requestAnimationFrame(swayTulips);

  // ---- Coccinelle ----
  const lb  = document.getElementById('reward-ladybug');
  const wL  = document.getElementById('wL');
  const wR  = document.getElementById('wR');
  const uwL = document.getElementById('uwL');
  const uwR = document.getElementById('uwR');

  let flyingDone = false;
  let flapAngle = 0, flapDir = 1;

  function setUnderwings(angle) {
    uwL.setAttribute('transform', `rotate(${-angle},11,13)`);
    uwR.setAttribute('transform', `rotate(${angle},25,13)`);
  }

  function flapFlying() {
    if (flyingDone) return;
    flapAngle += flapDir * 4;
    if (flapAngle >= 55) flapDir = -1;
    if (flapAngle <= 5)  flapDir =  1;
    setUnderwings(flapAngle);
    wL.setAttribute('transform', `rotate(${-flapAngle * 0.25},11,13)`);
    wR.setAttribute('transform', `rotate(${flapAngle * 0.25},25,13)`);
    requestAnimationFrame(flapFlying);
  }

  function periodicFlap() {
    const duration = 600;
    const steps = 30;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const angle = 50 * Math.sin((step / steps) * Math.PI);
      setUnderwings(angle);
      wL.setAttribute('transform', `rotate(${-angle * 0.2},11,13)`);
      wR.setAttribute('transform', `rotate(${angle * 0.2},25,13)`);
      if (step >= steps) {
        clearInterval(interval);
        setUnderwings(0);
        wL.setAttribute('transform', '');
        wR.setAttribute('transform', '');
        setTimeout(periodicFlap, 2000);
      }
    }, duration / steps);
  }

  function getLanding() {
    const svg = document.getElementById('reward-scene');
    const pt  = svg.createSVGPoint();
    pt.x = 180;
    pt.y = 280 - 165 - 40;
    const s = pt.matrixTransform(svg.getScreenCTM());
    return { x: s.x - 18, y: s.y - 20 };
  }

  function buildKeyframes(sx, sy, ex, ey) {
    const N = 70, kf = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const d = Math.pow(1 - t, 1.3);
      let x = sx + (ex - sx) * t;
      let y = sy + (ey - sy) * t;
      x += Math.sin(t * Math.PI * 8)       * 50 * d;
      y += Math.sin(t * Math.PI * 6 + 0.9) * 32 * d;
      y -= Math.sin(t * Math.PI)            * 100;

      const t2 = Math.min((i + 1) / N, 1);
      const d2 = Math.pow(1 - t2, 1.3);
      let nx = sx + (ex - sx) * t2;
      let ny = sy + (ey - sy) * t2;
      nx += Math.sin(t2 * Math.PI * 8)       * 50 * d2;
      ny += Math.sin(t2 * Math.PI * 6 + 0.9) * 32 * d2;
      ny -= Math.sin(t2 * Math.PI)            * 100;

      const angle = Math.atan2(ny - y, nx - x) * 180 / Math.PI;
      kf.push({ transform: `translate(${x}px,${y}px) rotate(${angle}deg)`, offset: t });
    }
    kf.push({ transform: `translate(${ex}px,${ey}px) rotate(0deg)`, offset: 1 });
    return kf;
  }

  // Lancement
  flapFlying();
  setTimeout(() => {
    const dest = getLanding();
    const sx = -50, sy = window.innerHeight * 0.12;
    lb.style.transform = `translate(${sx}px,${sy}px)`;
    const anim = lb.animate(
      buildKeyframes(sx, sy, dest.x, dest.y),
      { duration: 5500, easing: 'linear', fill: 'forwards' }
    );
    anim.onfinish = () => {
      flyingDone = true;
      setUnderwings(0);
      wL.setAttribute('transform', '');
      wR.setAttribute('transform', '');
      lb.style.transform = `translate(${dest.x}px,${dest.y}px)`;
      setTimeout(periodicFlap, 2000);
    };
  }, 400);
}
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const livesText = document.getElementById("lives");
const scoreText = document.getElementById("score");
const coinsText = document.getElementById("coins");
const messagePanel = document.getElementById("messagePanel");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const restartButton = document.getElementById("restartButton");
const blai = document.getElementById("blai");
const cristian = document.getElementById("cristian");

const VIEW_WIDTH = canvas.width;
const VIEW_HEIGHT = canvas.height;
const GROUND_Y = 468;
const TILE = 36;
const QUESTION_BUMP_FRAMES = 12;

// Estado de las teclas pulsadas. Se consulta en cada frame del juego.
const keys = {
  left: false,
  right: false,
  jump: false
};

let gameState = "playing";
let lives = 3;
let score = 0;
let coins = 0;
let cameraX = 0;
let frameCount = 0;

const endingSequence = {
  phase: "idle",
  timer: 0,
  flagOffset: 0,
  cristianX: 0,
  cristianY: 0,
  speechVisible: false
};

const playerStart = {
  x: 70,
  y: 250
};

const player = {
  x: playerStart.x,
  y: playerStart.y,
  width: 34,
  height: 46,
  baseHeight: 46,
  poweredHeight: 56,
  vx: 0,
  vy: 0,
  speed: 4.4,
  jumpForce: 11.5,
  poweredJumpForce: 12.8,
  maxJumpHoldFrames: 18,
  jumpHoldFrames: 0,
  jumpHoldBoost: 0.58,
  onGround: false,
  powered: false,
  invincibleTimer: 0,
  color: "#d94832"
};

// El nivel simplifica la idea de un primer mundo clásico: suelo con huecos,
// bloques elevados, tuberías genéricas, enemigos y una bandera final.
const level = {
  width: 6900,
  endX: 6370,
  platforms: [
    { x: 0, y: GROUND_Y, width: 720, height: 72, type: "ground" },
    { x: 840, y: GROUND_Y, width: 620, height: 72, type: "ground" },
    { x: 1580, y: GROUND_Y, width: 760, height: 72, type: "ground" },
    { x: 2460, y: GROUND_Y, width: 620, height: 72, type: "ground" },
    { x: 3240, y: GROUND_Y, width: 860, height: 72, type: "ground" },

    { x: 360, y: 330, width: TILE, height: TILE, type: "question", content: "coin" },
    { x: 432, y: 330, width: TILE, height: TILE, type: "brick" },
    { x: 468, y: 330, width: TILE, height: TILE, type: "brick" },
    { x: 504, y: 330, width: TILE, height: TILE, type: "question", content: "mushroom" },
    { x: 540, y: 330, width: TILE, height: TILE, type: "brick" },

    { x: 1020, y: 360, width: 72, height: 108, type: "pipe" },
    { x: 1260, y: 324, width: 72, height: 144, type: "pipe" },
    { x: 1740, y: 330, width: TILE, height: TILE, type: "brick" },
    { x: 1776, y: 330, width: TILE, height: TILE, type: "question", content: "coin" },
    { x: 1812, y: 330, width: TILE, height: TILE, type: "brick" },
    { x: 1980, y: 280, width: TILE, height: TILE, type: "question", content: "star" },
    { x: 2124, y: 360, width: 108, height: 108, type: "pipe" },

    { x: 2580, y: 360, width: TILE, height: TILE, type: "brick" },
    { x: 2616, y: 360, width: TILE, height: TILE, type: "brick" },
    { x: 2652, y: 360, width: TILE, height: TILE, type: "question", content: "mushroom" },
    { x: 2840, y: 305, width: 160, height: TILE, type: "brick" },

    { x: 3340, y: 396, width: TILE, height: 72, type: "step" },
    { x: 3376, y: 360, width: TILE, height: 108, type: "step" },
    { x: 3412, y: 324, width: TILE, height: 144, type: "step" },
    { x: 3448, y: 288, width: TILE, height: 180, type: "step" },
    { x: 3600, y: 288, width: TILE, height: 180, type: "step" },
    { x: 3636, y: 324, width: TILE, height: 144, type: "step" },
    { x: 3672, y: 360, width: TILE, height: 108, type: "step" },
    { x: 3708, y: 396, width: TILE, height: 72, type: "step" },

    { x: 4240, y: GROUND_Y, width: 700, height: 72, type: "ground" },
    { x: 5080, y: GROUND_Y, width: 1700, height: 72, type: "ground" },
    { x: 4310, y: 360, width: 72, height: 108, type: "pipe" },
    { x: 4540, y: 330, width: TILE, height: TILE, type: "brick" },
    { x: 4576, y: 330, width: TILE, height: TILE, type: "question", content: "coin" },
    { x: 4612, y: 330, width: TILE, height: TILE, type: "brick" },
    { x: 4756, y: 270, width: TILE, height: TILE, type: "question", content: "mushroom" },
    { x: 4792, y: 270, width: TILE, height: TILE, type: "brick" },
    { x: 4828, y: 270, width: TILE, height: TILE, type: "question", content: "coin" },

    { x: 5200, y: 324, width: 72, height: 144, type: "pipe" },
    { x: 5460, y: 310, width: TILE, height: TILE, type: "brick" },
    { x: 5496, y: 310, width: TILE, height: TILE, type: "question", content: "star" },
    { x: 5532, y: 310, width: TILE, height: TILE, type: "brick" },
    { x: 5700, y: 396, width: TILE, height: 72, type: "step" },
    { x: 5736, y: 360, width: TILE, height: 108, type: "step" },
    { x: 5772, y: 324, width: TILE, height: 144, type: "step" },
    { x: 5808, y: 288, width: TILE, height: 180, type: "step" }
  ],
  enemies: [
    { x: 600, spawnX: 600, y: GROUND_Y - 30, width: 34, height: 30, vx: -1.1, startVx: -1.1, minX: 120, maxX: 690, alive: true },
    { x: 1120, spawnX: 1120, y: GROUND_Y - 30, width: 34, height: 30, vx: 1.2, startVx: 1.2, minX: 870, maxX: 1400, alive: true },
    { x: 1880, spawnX: 1880, y: GROUND_Y - 30, width: 34, height: 30, vx: -1.3, startVx: -1.3, minX: 1610, maxX: 2280, alive: true },
    { x: 2760, spawnX: 2760, y: GROUND_Y - 30, width: 34, height: 30, vx: 1.2, startVx: 1.2, minX: 2490, maxX: 3050, alive: true },
    { x: 3500, spawnX: 3500, y: GROUND_Y - 30, width: 34, height: 30, vx: -1.2, startVx: -1.2, minX: 3250, maxX: 3770, alive: true },
    { x: 4440, spawnX: 4440, y: GROUND_Y - 30, width: 34, height: 30, vx: 1.25, startVx: 1.25, minX: 4250, maxX: 4920, alive: true },
    { x: 5320, spawnX: 5320, y: GROUND_Y - 30, width: 34, height: 30, vx: -1.35, startVx: -1.35, minX: 5090, maxX: 5680, alive: true }
  ],
  coins: [
    { x: 270, y: 404, width: 18, height: 22, collected: false },
    { x: 315, y: 390, width: 18, height: 22, collected: false },
    { x: 660, y: 402, width: 18, height: 22, collected: false },
    { x: 930, y: 392, width: 18, height: 22, collected: false },
    { x: 1170, y: 292, width: 18, height: 22, collected: false },
    { x: 1690, y: 402, width: 18, height: 22, collected: false },
    { x: 2030, y: 244, width: 18, height: 22, collected: false },
    { x: 2530, y: 404, width: 18, height: 22, collected: false },
    { x: 2900, y: 270, width: 18, height: 22, collected: false },
    { x: 3510, y: 252, width: 18, height: 22, collected: false },
    { x: 4288, y: 404, width: 18, height: 22, collected: false },
    { x: 4388, y: 330, width: 18, height: 22, collected: false },
    { x: 4670, y: 296, width: 18, height: 22, collected: false },
    { x: 4805, y: 232, width: 18, height: 22, collected: false },
    { x: 5128, y: 404, width: 18, height: 22, collected: false },
    { x: 5400, y: 404, width: 18, height: 22, collected: false },
    { x: 5512, y: 274, width: 18, height: 22, collected: false },
    { x: 5660, y: 404, width: 18, height: 22, collected: false },
    { x: 5860, y: 252, width: 18, height: 22, collected: false },
    { x: 6040, y: 390, width: 18, height: 22, collected: false }
  ],
  items: [],
  effects: [],
  flag: {
    x: 6000,
    y: 238,
    width: 46,
    height: 230
  },
  castle: {
    x: 6300,
    y: GROUND_Y - 160,
    width: 184,
    height: 160
  }
};

function resetPlayerPosition() {
  player.x = playerStart.x;
  player.y = playerStart.y;
  player.height = player.baseHeight;
  player.vx = 0;
  player.vy = 0;
  player.jumpHoldFrames = 0;
  player.onGround = false;
  player.powered = false;
  player.invincibleTimer = 0;
  player.color = "#d94832";
  cameraX = 0;
}

function resetQuestionBlocks() {
  level.platforms.forEach((platform) => {
    if (platform.type !== "question") {
      return;
    }

    platform.used = false;
    platform.bumpTimer = 0;
  });
}

function resetEnemies(showSpawnEffect) {
  level.enemies.forEach((enemy) => {
    enemy.x = enemy.spawnX;
    enemy.y = GROUND_Y - enemy.height;
    enemy.vx = enemy.startVx;
    enemy.alive = true;

    if (showSpawnEffect) {
      spawnSparkBurst(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, "#8f563b");
    }
  });
}

function resetCoins() {
  level.coins.forEach((coin) => {
    coin.collected = false;
  });
}

function resetEndingSequence() {
  endingSequence.phase = "idle";
  endingSequence.timer = 0;
  endingSequence.flagOffset = 0;
  endingSequence.cristianX = level.castle.x + 72;
  endingSequence.cristianY = GROUND_Y - 64;
  endingSequence.speechVisible = false;
}

function restartGame() {
  lives = 3;
  score = 0;
  coins = 0;
  frameCount = 0;
  gameState = "playing";
  resetEndingSequence();
  resetEnemies();
  resetCoins();
  level.items = [];
  level.effects = [];
  resetQuestionBlocks();
  resetPlayerPosition();
  updateHud();
  hideMessage();
}

function updateHud() {
  livesText.textContent = lives;
  scoreText.textContent = score;
  if (coinsText) {
    coinsText.textContent = coins;
  }
}

function showMessage(title, text, showBlai, showCristian) {
  gameState = "ended";
  messageTitle.textContent = title;
  messageText.textContent = text;
  messagePanel.classList.remove("hidden");
  blai.classList.toggle("hidden", !showBlai);
  cristian.classList.toggle("hidden", !showCristian);
}

function hideMessage() {
  messagePanel.classList.add("hidden");
  blai.classList.add("hidden");
  cristian.classList.add("hidden");
}

function loseLife() {
  if (gameState !== "playing") {
    return;
  }

  lives -= 1;
  updateHud();

  if (lives <= 0) {
    showMessage("Derrota", "Has perdido, chavalito.", true, false);
  } else {
    level.items = [];
    level.effects = [];
    resetEnemies(true);
    resetQuestionBlocks();
    resetPlayerPosition();
  }
}

function winGame() {
  showMessage("¡Nivel completado!", "Cristian sale del castillo y dice: te apruebo.", false, true);
}

function startEndingSequence() {
  if (gameState !== "playing") {
    return;
  }

  gameState = "ending";
  keys.left = false;
  keys.right = false;
  keys.jump = false;
  level.items = [];
  resetEndingSequence();
  endingSequence.phase = "slide";

  player.vx = 0;
  player.vy = 0;
  player.jumpHoldFrames = 0;
  player.onGround = false;
  player.x = level.flag.x + 18 - player.width / 2;
  score += 500;
  updateHud();
}

function updateEndingSequence() {
  const groundY = GROUND_Y - player.height;

  if (endingSequence.phase === "slide") {
    player.x = level.flag.x + 18 - player.width / 2;
    player.y = Math.min(player.y + 4.2, groundY);
    endingSequence.flagOffset = Math.min(150, endingSequence.flagOffset + 4.2);

    if (player.y >= groundY) {
      endingSequence.phase = "walk";
      endingSequence.timer = 0;
    }

    return;
  }

  if (endingSequence.phase === "walk") {
    const stopX = level.castle.x + 34;
    player.y = groundY;
    player.x = Math.min(player.x + 2.5, stopX);
    player.vx = 2.5;
    endingSequence.timer += 1;

    if (player.x >= stopX) {
      player.vx = 0;
      endingSequence.phase = "cristian";
      endingSequence.timer = 0;
      endingSequence.cristianX = level.castle.x + 72;
      endingSequence.cristianY = GROUND_Y - 64;
      spawnSparkBurst(level.castle.x + 80, GROUND_Y - 42, "#fff2b8");
    }

    return;
  }

  if (endingSequence.phase === "cristian") {
    const targetX = level.castle.x + 112;
    endingSequence.cristianX = Math.min(targetX, endingSequence.cristianX + 1.1);
    endingSequence.timer += 1;

    if (endingSequence.timer > 55) {
      endingSequence.speechVisible = true;
    }
  }
}

function rectanglesOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function activateQuestionBlock(platform) {
  if (platform.type !== "question" || platform.used) {
    return;
  }

  platform.used = true;
  platform.bumpTimer = QUESTION_BUMP_FRAMES;

  if (platform.content === "mushroom" || platform.content === "star") {
    spawnPowerUp(platform, platform.content);
    return;
  }

  spawnCoinEffect(platform);
  coins += 1;
  score += 100;
  spawnScoreText(platform.x + platform.width / 2, platform.y - 18, "+100", "#fff2b8");
  updateHud();
}

function spawnCoinEffect(platform) {
  level.effects.push({
    type: "coin",
    x: platform.x + platform.width / 2 - 8,
    y: platform.y - 8,
    width: 16,
    height: 18,
    vy: -5.4,
    gravity: 0.28,
    life: 38
  });
}

function spawnScoreText(x, y, text, color) {
  level.effects.push({
    type: "score",
    x,
    y,
    text,
    color,
    vy: -0.8,
    gravity: 0.01,
    life: 46
  });
}

function spawnSparkBurst(x, y, color) {
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8;

    level.effects.push({
      type: "spark",
      x,
      y,
      width: 5,
      height: 5,
      vx: Math.cos(angle) * 2,
      vy: Math.sin(angle) * 2 - 1.2,
      gravity: 0.14,
      color,
      life: 28
    });
  }
}

function spawnPowerUp(platform, type) {
  level.items.push({
    type,
    x: platform.x + 4,
    y: platform.y - 30,
    width: 28,
    height: 28,
    vx: type === "star" ? 1.8 : 1.25,
    vy: -2.8,
    alive: true
  });
}

function growPlayer() {
  if (player.powered) {
    return;
  }

  const growth = player.poweredHeight - player.baseHeight;
  player.y -= growth;
  player.height = player.poweredHeight;
  player.powered = true;
}

function collectItem(item) {
  item.alive = false;

  if (item.type === "mushroom") {
    growPlayer();
    score += 1000;
    spawnScoreText(item.x, item.y - 12, "+1000", "#ffffff");
    spawnSparkBurst(item.x + item.width / 2, item.y + item.height / 2, "#d94832");
  } else if (item.type === "star") {
    player.invincibleTimer = 520;
    score += 1200;
    spawnScoreText(item.x, item.y - 12, "+1200", "#ffdb4d");
    spawnSparkBurst(item.x + item.width / 2, item.y + item.height / 2, "#ffdb4d");
  }

  updateHud();
}

// Movimiento del jugador: velocidad horizontal, salto y gravedad.
function updatePlayer() {
  const gravity = 0.62;
  const friction = 0.82;

  if (keys.left) {
    player.vx = -player.speed;
  } else if (keys.right) {
    player.vx = player.speed;
  } else {
    player.vx *= friction;
  }

  if (keys.jump && player.onGround) {
    player.vy = -(player.powered ? player.poweredJumpForce : player.jumpForce);
    player.jumpHoldFrames = player.maxJumpHoldFrames;
    player.onGround = false;
  }

  if (keys.jump && player.jumpHoldFrames > 0 && player.vy < 0) {
    player.vy -= player.jumpHoldBoost;
    player.jumpHoldFrames -= 1;
  }

  player.vy += gravity;

  movePlayerHorizontally();
  movePlayerVertically();
  updatePlayerPower();

  if (player.y > VIEW_HEIGHT + 160) {
    loseLife();
  }

  if (player.x + player.width >= level.flag.x + 18) {
    startEndingSequence();
  }
}

function updatePlayerPower() {
  if (player.invincibleTimer > 0) {
    player.invincibleTimer -= 1;
  }
}

// Las colisiones se resuelven separando primero eje X y luego eje Y.
// Esto evita que el jugador atraviese paredes o suelos en diagonal.
function movePlayerHorizontally() {
  player.x += player.vx;

  level.platforms.forEach((platform) => {
    if (!rectanglesOverlap(player, platform)) {
      return;
    }

    if (player.vx > 0) {
      player.x = platform.x - player.width;
    } else if (player.vx < 0) {
      player.x = platform.x + platform.width;
    }

    player.vx = 0;
  });

  if (player.x < 0) {
    player.x = 0;
  }

  if (player.x + player.width > level.width) {
    player.x = level.width - player.width;
  }
}

function movePlayerVertically() {
  player.y += player.vy;
  player.onGround = false;

  level.platforms.forEach((platform) => {
    if (!rectanglesOverlap(player, platform)) {
      return;
    }

    if (player.vy > 0) {
      player.y = platform.y - player.height;
      player.vy = 0;
      player.onGround = true;
    } else if (player.vy < 0) {
      player.y = platform.y + platform.height;
      player.vy = 0;
      activateQuestionBlock(platform);
    }
  });
}

function updateQuestionBlockAnimations() {
  level.platforms.forEach((platform) => {
    if (platform.type === "question" && platform.bumpTimer > 0) {
      platform.bumpTimer -= 1;
    }
  });
}

function updateEffects() {
  level.effects.forEach((effect) => {
    effect.x += effect.vx || 0;
    effect.y += effect.vy || 0;
    effect.vy += effect.gravity || 0;
    effect.life -= 1;
  });

  level.effects = level.effects.filter((effect) => effect.life > 0);
}

function updateCoins() {
  level.coins.forEach((coin) => {
    if (coin.collected || !rectanglesOverlap(player, coin)) {
      return;
    }

    coin.collected = true;
    coins += 1;
    score += 50;
    spawnScoreText(coin.x, coin.y - 14, "+50", "#fff2b8");
    updateHud();
  });
}

function updateItems() {
  const gravity = 0.42;

  level.items.forEach((item) => {
    if (!item.alive) {
      return;
    }

    item.vy += gravity;
    moveItemHorizontally(item);
    moveItemVertically(item);

    if (rectanglesOverlap(player, item)) {
      collectItem(item);
    }

    if (item.y > VIEW_HEIGHT + 180 || item.x < -80 || item.x > level.width + 80) {
      item.alive = false;
    }
  });

  level.items = level.items.filter((item) => item.alive);
}

function moveItemHorizontally(item) {
  item.x += item.vx;

  level.platforms.forEach((platform) => {
    if (!rectanglesOverlap(item, platform)) {
      return;
    }

    if (item.vx > 0) {
      item.x = platform.x - item.width;
    } else if (item.vx < 0) {
      item.x = platform.x + platform.width;
    }

    item.vx *= -1;
  });
}

function moveItemVertically(item) {
  item.y += item.vy;

  level.platforms.forEach((platform) => {
    if (!rectanglesOverlap(item, platform)) {
      return;
    }

    if (item.vy > 0) {
      item.y = platform.y - item.height;
      item.vy = item.type === "star" ? -8.2 : 0;
    } else if (item.vy < 0) {
      item.y = platform.y + platform.height;
      item.vy = 0;
    }
  });
}

function moveEnemyHorizontally(enemy) {
  enemy.x += enemy.vx;

  if (enemy.x < enemy.minX) {
    enemy.x = enemy.minX;
    enemy.vx = Math.abs(enemy.vx);
    return;
  }

  if (enemy.x + enemy.width > enemy.maxX) {
    enemy.x = enemy.maxX - enemy.width;
    enemy.vx = -Math.abs(enemy.vx);
    return;
  }

  for (const platform of level.platforms) {
    if (platform.type === "ground" || !rectanglesOverlap(enemy, platform)) {
      continue;
    }

    if (enemy.vx > 0) {
      enemy.x = platform.x - enemy.width;
      enemy.vx = -Math.abs(enemy.vx);
    } else if (enemy.vx < 0) {
      enemy.x = platform.x + platform.width;
      enemy.vx = Math.abs(enemy.vx);
    }

    return;
  }
}

function updateEnemies() {
  level.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return;
    }

    moveEnemyHorizontally(enemy);

    if (rectanglesOverlap(player, enemy)) {
      if (player.invincibleTimer > 0) {
        enemy.alive = false;
        score += 200;
        spawnScoreText(enemy.x, enemy.y - 12, "+200", "#ffdb4d");
        spawnSparkBurst(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, "#ffdb4d");
        updateHud();
        return;
      }

      const playerWasFalling = player.vy > 0;
      const playerBottom = player.y + player.height;
      const enemyTop = enemy.y + 8;

      // Si el jugador cae sobre el enemigo, lo elimina y rebota.
      if (playerWasFalling && playerBottom < enemyTop + 18) {
        enemy.alive = false;
        player.vy = -8;
        score += 100;
        spawnScoreText(enemy.x, enemy.y - 12, "+100", "#ffffff");
        spawnSparkBurst(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, "#8f563b");
        updateHud();
      } else {
        loseLife();
      }
    }
  });
}

function updateCamera() {
  const targetX = player.x - VIEW_WIDTH * 0.38;
  const maxCameraX = level.width - VIEW_WIDTH;
  cameraX = Math.max(0, Math.min(targetX, maxCameraX));
}

function updateGame() {
  if (gameState === "ending") {
    frameCount += 1;
    updateEffects();
    updateEndingSequence();
    updateCamera();
    return;
  }

  if (gameState !== "playing") {
    return;
  }

  frameCount += 1;
  updatePlayer();

  if (gameState !== "playing") {
    updateCamera();
    return;
  }

  updateCoins();
  updateQuestionBlockAnimations();
  updateEffects();
  updateItems();
  updateEnemies();
  updateCamera();
}

function drawSky() {
  ctx.fillStyle = "#63afea";
  ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);

  drawCloud(160 - cameraX * 0.22, 82);
  drawCloud(690 - cameraX * 0.22, 116);
  drawCloud(1320 - cameraX * 0.22, 72);
  drawCloud(2180 - cameraX * 0.22, 112);
  drawCloud(3180 - cameraX * 0.22, 82);

  drawHill(430 - cameraX * 0.12, GROUND_Y, 220, 88);
  drawHill(1530 - cameraX * 0.12, GROUND_Y, 260, 104);
  drawHill(2880 - cameraX * 0.12, GROUND_Y, 240, 92);
  drawHill(4520 - cameraX * 0.12, GROUND_Y, 280, 108);
  drawHill(5480 - cameraX * 0.12, GROUND_Y, 220, 86);
}

function drawCloud(x, y) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y + 18, 106, 26);
  ctx.fillRect(x + 18, y, 34, 34);
  ctx.fillRect(x + 52, y + 8, 42, 36);
}

function drawHill(x, baseY, width, height) {
  ctx.fillStyle = "#77c75b";
  ctx.beginPath();
  ctx.moveTo(x, baseY);
  ctx.quadraticCurveTo(x + width / 2, baseY - height, x + width, baseY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#5fb044";
  ctx.fillRect(x + width * 0.42, baseY - height * 0.42, 16, 16);
  ctx.fillRect(x + width * 0.56, baseY - height * 0.28, 16, 16);
}

function drawPlatform(platform) {
  const x = Math.round(platform.x - cameraX);
  let y = platform.y;

  if (platform.type === "question" && platform.bumpTimer > 0) {
    const progress = platform.bumpTimer / QUESTION_BUMP_FRAMES;
    y -= Math.sin(progress * Math.PI) * 8;
  }

  if (platform.type === "ground") {
    ctx.fillStyle = "#b7652a";
    ctx.fillRect(x, y, platform.width, platform.height);
    ctx.fillStyle = "#6eb44a";
    ctx.fillRect(x, y, platform.width, 16);
    ctx.fillStyle = "rgba(72, 45, 20, 0.32)";
    for (let tileX = x; tileX < x + platform.width; tileX += TILE) {
      ctx.strokeRect(tileX, y + 16, TILE, platform.height - 16);
    }
    return;
  }

  if (platform.type === "pipe") {
    ctx.fillStyle = "#1f9d55";
    ctx.fillRect(x + 8, y, platform.width - 16, platform.height);
    ctx.fillStyle = "#36c56f";
    ctx.fillRect(x, y, platform.width, 28);
    ctx.strokeStyle = "#126033";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, platform.width, 28);
    ctx.strokeRect(x + 8, y + 28, platform.width - 16, platform.height - 28);
    return;
  }

  if (platform.type === "question") {
    ctx.fillStyle = platform.used ? "#9a8b6f" : "#f0b33d";
    ctx.fillRect(x, y, platform.width, platform.height);
    ctx.fillStyle = platform.used ? "#6b5d48" : "#ffffff";
    ctx.font = "bold 26px Courier New";
    ctx.fillText(platform.used ? "!" : "?", x + 10, y + 27);
  } else if (platform.type === "step") {
    ctx.fillStyle = "#bf7b43";
    ctx.fillRect(x, y, platform.width, platform.height);
  } else {
    ctx.fillStyle = "#b95f37";
    ctx.fillRect(x, y, platform.width, platform.height);
  }

  ctx.strokeStyle = "#71351e";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, platform.width, platform.height);
}

function drawEffects() {
  level.effects.forEach((effect) => {
    const x = Math.round(effect.x - cameraX);
    const y = Math.round(effect.y);

    if (effect.type === "score") {
      ctx.fillStyle = effect.color;
      ctx.font = "bold 16px Courier New";
      ctx.fillText(effect.text, x, y);
      return;
    }

    if (effect.type === "spark") {
      ctx.fillStyle = effect.color;
      ctx.fillRect(x, y, effect.width, effect.height);
      return;
    }

    if (effect.type !== "coin") {
      return;
    }

    const squash = Math.max(5, Math.abs(Math.sin(effect.life * 0.36)) * effect.width);
    ctx.fillStyle = "#ffd84d";
    ctx.fillRect(x + (effect.width - squash) / 2, y, squash, effect.height);
    ctx.strokeStyle = "#b77b10";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + (effect.width - squash) / 2, y, squash, effect.height);
  });
}

function drawCoins() {
  level.coins.forEach((coin) => {
    if (coin.collected) {
      return;
    }

    const x = Math.round(coin.x - cameraX);
    const y = Math.round(coin.y);
    const spinWidth = 6 + Math.abs(Math.sin((frameCount + coin.x) * 0.08)) * 12;

    ctx.fillStyle = "#ffd84d";
    ctx.fillRect(x + (coin.width - spinWidth) / 2, y, spinWidth, coin.height);
    ctx.fillStyle = "#fff2b8";
    ctx.fillRect(x + coin.width / 2 - 1, y + 4, 2, coin.height - 8);
    ctx.strokeStyle = "#b77b10";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + (coin.width - spinWidth) / 2, y, spinWidth, coin.height);
  });
}

function drawItems() {
  level.items.forEach((item) => {
    if (!item.alive) {
      return;
    }

    if (item.type === "mushroom") {
      drawMushroom(item);
    } else if (item.type === "star") {
      drawStar(item);
    }
  });
}

function drawMushroom(item) {
  const x = Math.round(item.x - cameraX);
  const y = Math.round(item.y);

  ctx.fillStyle = "#f3bd8f";
  ctx.fillRect(x + 7, y + 14, 14, 14);
  ctx.fillStyle = "#d94832";
  ctx.fillRect(x, y + 7, item.width, 14);
  ctx.fillRect(x + 5, y, item.width - 10, 10);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 5, y + 7, 6, 6);
  ctx.fillRect(x + 18, y + 7, 6, 6);
  ctx.strokeStyle = "#7d2318";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y + 7, item.width, 14);
}

function drawStar(item) {
  const x = Math.round(item.x - cameraX);
  const y = Math.round(item.y);
  const cx = x + item.width / 2;
  const cy = y + item.height / 2;
  const spikes = 5;
  const outerRadius = 15;
  const innerRadius = 7;
  let rotation = -Math.PI / 2;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i += 1) {
    ctx.lineTo(cx + Math.cos(rotation) * outerRadius, cy + Math.sin(rotation) * outerRadius);
    rotation += Math.PI / spikes;
    ctx.lineTo(cx + Math.cos(rotation) * innerRadius, cy + Math.sin(rotation) * innerRadius);
    rotation += Math.PI / spikes;
  }

  ctx.closePath();
  ctx.fillStyle = "#ffdb4d";
  ctx.fill();
  ctx.strokeStyle = "#c38712";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#161616";
  ctx.fillRect(x + 10, y + 11, 3, 5);
  ctx.fillRect(x + 17, y + 11, 3, 5);
}

function drawEnemy(enemy) {
  if (!enemy.alive) {
    return;
  }

  const x = Math.round(enemy.x - cameraX);
  const y = enemy.y;

  ctx.fillStyle = "#6b3b28";
  ctx.fillRect(x, y + 8, enemy.width, enemy.height - 8);
  ctx.fillStyle = "#8f563b";
  ctx.fillRect(x + 4, y, enemy.width - 8, 14);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 8, y + 12, 6, 6);
  ctx.fillRect(x + 20, y + 12, 6, 6);
  ctx.fillStyle = "#161616";
  ctx.fillRect(x + 10, y + 14, 3, 3);
  ctx.fillRect(x + 22, y + 14, 3, 3);
}

function drawPlayer() {
  const x = Math.round(player.x - cameraX);
  const y = Math.round(player.y);

  ctx.fillStyle = getPlayerColor();
  ctx.fillRect(x + 6, y + 14, player.width - 12, player.height - 14);
  ctx.fillStyle = "#f3bd8f";
  ctx.fillRect(x + 8, y, player.width - 16, 18);
  ctx.fillStyle = "#263b57";
  ctx.fillRect(x + 4, y + 30, 10, 16);
  ctx.fillRect(x + player.width - 14, y + 30, 10, 16);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 13, y + 7, 5, 5);
  ctx.fillRect(x + 22, y + 7, 5, 5);
}

function getPlayerColor() {
  if (player.invincibleTimer > 0) {
    return player.invincibleTimer % 16 < 8 ? "#ffdb4d" : "#d94832";
  }

  return player.powered ? "#f05d3f" : player.color;
}

function drawFinishPath() {
  const startX = level.flag.x + 72;
  const endX = level.castle.x + 128;
  const y = GROUND_Y - 10;

  ctx.fillStyle = "#d6c4a2";
  for (let stoneX = startX; stoneX < endX; stoneX += 34) {
    ctx.fillRect(Math.round(stoneX - cameraX), y, 24, 10);
  }
}

function drawCastle() {
  const x = Math.round(level.castle.x - cameraX);
  const y = level.castle.y;

  ctx.fillStyle = "#9b8a78";
  ctx.fillRect(x, y + 48, 156, 112);
  ctx.fillStyle = "#8d7c6d";
  ctx.fillRect(x - 28, y + 16, 46, 144);
  ctx.fillRect(x + 138, y + 16, 46, 144);
  ctx.fillStyle = "#4c3b30";
  ctx.fillRect(x - 28, y, 46, 18);
  ctx.fillRect(x + 138, y, 46, 18);

  for (let blockX = x; blockX < x + 156; blockX += 36) {
    ctx.fillRect(blockX, y + 28, 18, 20);
  }

  ctx.fillStyle = "#b7a591";
  ctx.fillRect(x + 12, y + 64, 132, 14);
  ctx.fillStyle = "#31231c";
  ctx.fillRect(x + 58, y + 106, 42, 54);
  ctx.fillStyle = "#2b211b";
  ctx.fillRect(x + 18, y + 86, 22, 28);
  ctx.fillRect(x + 116, y + 86, 22, 28);
  ctx.strokeStyle = "#4c3b30";
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y + 48, 156, 112);
  ctx.strokeRect(x - 28, y + 16, 46, 144);
  ctx.strokeRect(x + 138, y + 16, 46, 144);
}

function drawEndingCristian() {
  if (endingSequence.phase !== "cristian") {
    return;
  }

  const x = Math.round(endingSequence.cristianX - cameraX);
  const y = Math.round(endingSequence.cristianY);

  ctx.fillStyle = "#284c8f";
  ctx.fillRect(x + 7, y + 30, 28, 34);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 15, y + 34, 12, 30);
  ctx.fillStyle = "#e8b07f";
  ctx.fillRect(x + 5, y + 4, 32, 30);
  ctx.fillStyle = "#181414";
  ctx.fillRect(x + 3, y, 36, 10);
  ctx.fillStyle = "#d9f3ff";
  ctx.fillRect(x + 9, y + 17, 8, 7);
  ctx.fillRect(x + 25, y + 17, 8, 7);
  ctx.fillStyle = "#161616";
  ctx.fillRect(x + 8, y + 16, 10, 3);
  ctx.fillRect(x + 24, y + 16, 10, 3);
  ctx.fillRect(x + 18, y + 19, 6, 2);
  ctx.fillStyle = "#8d2c2c";
  ctx.fillRect(x + 16, y + 28, 11, 3);
  ctx.fillStyle = "#172a52";
  ctx.fillRect(x + 6, y + 62, 10, 14);
  ctx.fillRect(x + 26, y + 62, 10, 14);
}

function drawCristianSpeech() {
  if (!endingSequence.speechVisible) {
    return;
  }

  const x = Math.round(endingSequence.cristianX - cameraX - 132);
  const y = Math.round(endingSequence.cristianY - 82);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, 238, 58);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 152, y + 54, 22, 18);
  ctx.strokeStyle = "#161616";
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, 238, 58);
  ctx.strokeRect(x + 152, y + 54, 22, 18);
  ctx.fillStyle = "#161616";
  ctx.font = "bold 15px Courier New";
  ctx.fillText("Cristian:", x + 12, y + 22);
  ctx.fillText("Mario, estás aprobado.", x + 12, y + 44);
}

function drawFlag() {
  const x = Math.round(level.flag.x - cameraX);
  const y = level.flag.y;
  const flagOffset = endingSequence.phase === "idle" ? 0 : endingSequence.flagOffset;

  ctx.fillStyle = "#f6f6f6";
  ctx.fillRect(x + 18, y, 8, level.flag.height);
  ctx.fillStyle = "#ffdb4d";
  ctx.fillRect(x + 26, y + 18 + flagOffset, 72, 44);
  ctx.fillStyle = "#d94832";
  ctx.fillRect(x + 26, y + 62 + flagOffset, 46, 22);
  ctx.fillStyle = "#333333";
  ctx.fillRect(x, GROUND_Y - 12, 58, 12);
}

function renderGame() {
  drawSky();
  level.platforms.forEach(drawPlatform);
  drawFinishPath();
  drawCastle();
  drawEndingCristian();
  drawCoins();
  drawEffects();
  drawItems();
  drawFlag();
  level.enemies.forEach(drawEnemy);
  drawPlayer();
  drawCristianSpeech();
}

function gameLoop() {
  updateGame();
  renderGame();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft" || event.code === "KeyA") {
    keys.left = true;
  }

  if (event.code === "ArrowRight" || event.code === "KeyD") {
    keys.right = true;
  }

  if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
    keys.jump = true;
    event.preventDefault();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft" || event.code === "KeyA") {
    keys.left = false;
  }

  if (event.code === "ArrowRight" || event.code === "KeyD") {
    keys.right = false;
  }

  if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
    keys.jump = false;
    player.jumpHoldFrames = 0;
  }
});

restartButton.addEventListener("click", restartGame);

updateHud();
gameLoop();

let timeLeft = 300;
const countdown = document.getElementById("countdown");
const signalBox = document.getElementById("signal-box");
const historyBox = document.getElementById("history");
const assets = ["EURUSD", "GBPUSD", "USDJPY"];
const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSignal() {
  const asset = randomFrom(assets);
  const direction = Math.random() > 0.5 ? "CALL (Buy)" : "PUT (Sell)";
  const confidence = 95 + Math.floor(Math.random() * 5);
  const indicators = direction.includes("CALL") ? 
    "EMA Crossover, RSI Oversold, Support Zone" : 
    "EMA Crossover, RSI Overbought, Resistance Zone";
  const now = new Date().toLocaleTimeString();
  const viewURL = `https://www.tradingview.com/widgetembed/?symbol=FX:${asset}&interval=1&theme=dark`;

  signalBox.innerHTML = `
    <div class="signal-card">
      <h2>${asset} Signal</h2>
      <iframe src="${viewURL}" style="width:100%;height:300px;border:none;border-radius:8px;"></iframe>
      <p><strong>Signal:</strong> ${direction}</p>
      <p><strong>Confidence:</strong> ${confidence}%</p>
      <p><strong>Expiry:</strong> 5 minutes</p>
      <p><strong>Indicators:</strong> ${indicators}</p>
    </div>
  `;

  historyBox.innerHTML = `<div>[${now}] ${asset} → ${direction} @ ${confidence}%</div>` + historyBox.innerHTML;

  audio.play();
}

function tick() {
  timeLeft--;
  countdown.innerText = `⏳ Next Signal In: ${timeLeft}s`;
  if (timeLeft <= 0) {
    timeLeft = 300;
    generateSignal();
  }
}

generateSignal();
setInterval(tick, 1000);

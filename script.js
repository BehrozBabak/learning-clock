function drawMinuteMarks() {
  const group = document.getElementById("minute-marks");
  const centerX = 100;
  const centerY = 100;
  const outerRadius = 95;
  const innerRadius = 90;

  for (let i = 0; i < 60; i++) {
    const angle = (i * 6) * Math.PI / 180;
    const x1 = centerX + innerRadius * Math.cos(angle);
    const y1 = centerY + innerRadius * Math.sin(angle);
    const x2 = centerX + outerRadius * Math.cos(angle);
    const y2 = centerY + outerRadius * Math.sin(angle);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", i % 5 === 0 ? "#0077cc" : "#999"); // آبی برای ساعت، خاکستری برای دقیقه
    line.setAttribute("stroke-width", i % 5 === 0 ? 2 : 1);
    group.appendChild(line);
  }
}

function drawClockNumbers() {
  const numbersGroup = document.getElementById("numbers");
  const centerX = 100;
  const centerY = 102;
  const hourRadius = 83;
  const minuteRadius = 110;

  for (let i = 1; i <= 12; i++) {
    const angle = ((i - 3) * 30) * (Math.PI / 180);

    // عدد ساعت
    const hourX = centerX + hourRadius * Math.cos(angle);
    const hourY = centerY + hourRadius * Math.sin(angle);
    const hourText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    hourText.setAttribute("x", hourX);
    hourText.setAttribute("y", hourY);
    hourText.setAttribute("text-anchor", "middle");
    hourText.setAttribute("dominant-baseline", "middle");
    hourText.setAttribute("font-size", "16");
    hourText.setAttribute("fill", "#444");
    hourText.textContent = i.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
    numbersGroup.appendChild(hourText);

    // عدد دقیقه
    const minuteValue = i * 5;
    const minuteX = centerX + minuteRadius * Math.cos(angle);
    const minuteY = centerY + minuteRadius * Math.sin(angle);
    const minuteText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    minuteText.setAttribute("x", minuteX);
    minuteText.setAttribute("y", minuteY);
    minuteText.setAttribute("text-anchor", "middle");
    minuteText.setAttribute("dominant-baseline", "middle");
    minuteText.setAttribute("font-size", "14");
    minuteText.setAttribute("fill", "#009966");
    minuteText.textContent = minuteValue.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
    numbersGroup.appendChild(minuteText);
  }
}

function createHand(id, length, color, width) {
  const hand = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  const base = 100;
  const tipY = base - length;
  hand.setAttribute("points", `${base - width},${base} ${base + width},${base} ${base},${tipY}`);
  hand.setAttribute("fill", color);
  hand.setAttribute("id", id);
  return hand;
}

function generateRandomTime() {
  const hour = Math.floor(Math.random() * 13);
  const validMinutes = Array.from({ length: 60 }, (_, i) => i).filter(m => m % 5 === 0);
  const minute = validMinutes[Math.floor(Math.random() * validMinutes.length)];
  return { hour, minute };
}

function updateClockHands(hour, minute) {
  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
  const minuteAngle = minute * 6;

  document.getElementById("hour-hand").setAttribute("transform", `rotate(${hourAngle}, 100, 100)`);
  document.getElementById("minute-hand").setAttribute("transform", `rotate(${minuteAngle}, 100, 100)`);
}

function changeTime() {
  const time = generateRandomTime();
  updateClockHands(time.hour, time.minute);
}

window.onload = () => {
  drawMinuteMarks();
  drawClockNumbers();

  const handsGroup = document.getElementById("hands");
  handsGroup.appendChild(createHand("hour-hand", 40, "#0077cc", 4));
  handsGroup.appendChild(createHand("minute-hand", 60, "#ff6600", 3));

  changeTime();
};

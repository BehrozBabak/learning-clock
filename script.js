

// تولید زمان تصادفی با دقیقه‌هایی که رقم یکان‌شون ۰ یا ۵ باشه
function generateRandomTime() {
  const hour = Math.floor(Math.random() * 13); // 0 تا 12
  const validMinutes = Array.from({ length: 60 }, (_, i) => i).filter(
    (m) => m % 10 === 0 || m % 10 === 5
  );
  const minute = validMinutes[Math.floor(Math.random() * validMinutes.length)];
  return { hour, minute };
}

// تنظیم عقربه‌ها روی ساعت مشخص
function updateClockHands(hour, minute) {
  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
  const minuteAngle = minute * 6;

  document.getElementById("hour-hand").setAttribute("transform", `rotate(${hourAngle}, 100, 100)`);
  document.getElementById("minute-hand").setAttribute("transform", `rotate(${minuteAngle}, 100, 100)`);
}

// تولید اعداد ساعت روی دایره
function drawClockNumbers() {
  const numbersGroup = document.getElementById("numbers");
  const centerX = 100;
  const centerY = 104; // کمی پایین‌تر برای هم‌خوانی
  const radius = 85;

  for (let i = 1; i <= 12; i++) {
    const angle = ((i - 3) * 30) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "16");
    text.setAttribute("fill", "#444");
    text.textContent = i.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
    numbersGroup.appendChild(text);
  }
}


function changeTime() {
  const time = generateRandomTime();
  updateClockHands(time.hour, time.minute);
}

window.onload = () => {
  drawClockNumbers();
  changeTime();
};
// وضعیت‌های حالت آموزشی و راهنما
let trainingMode = false;
let helperVisible = false;

// فعال یا غیرفعال کردن راهنما
function toggleHelper() {
  helperVisible = !helperVisible;

  const helperButton = document.getElementById("helper-toggle");
  helperButton.classList.toggle("active-mode", helperVisible);

  // اعداد دقیقه همیشه با راهنما کنترل می‌شن
  document.querySelectorAll(".minute-number").forEach(el => {
    el.style.opacity = helperVisible ? "1" : "0";
  });

  // ساعت دیجیتال فقط در حالت آموزشی با راهنما کنترل می‌شه
  if (trainingMode) {
    document.getElementById("digital-time").style.opacity = helperVisible ? "1" : "0";
  }
}

// رسم خط‌های دقیقه روی ساعت
function drawMinuteMarks() {
  const group = document.getElementById("minute-marks");
  const centerX = 100, centerY = 100;
  const outerRadius = 95, innerRadius = 90;

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
    line.setAttribute("stroke", i % 5 === 0 ? "#d813df" : "#0d62e2");
    line.setAttribute("stroke-width", i % 5 === 0 ? 2.5 : 1);
    group.appendChild(line);
  }
}

// رسم اعداد ساعت و دقیقه
function drawClockNumbers() {
  const group = document.getElementById("numbers");
  const centerX = 100, centerY = 102;
  const hourRadius = 80, minuteRadius = 110;

  for (let i = 1; i <= 12; i++) {
    const angle = ((i - 3) * 30) * Math.PI / 180;

    // عدد ساعت
    const hourX = centerX + hourRadius * Math.cos(angle);
    const hourY = centerY + hourRadius * Math.sin(angle);
    const hourText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    hourText.setAttribute("x", hourX);
    hourText.setAttribute("y", hourY);
    hourText.setAttribute("text-anchor", "middle");
    hourText.setAttribute("dominant-baseline", "middle");
    hourText.setAttribute("font-size", "20");
    hourText.setAttribute("fill", "#0055aa");
    hourText.setAttribute("style", "font-family: 'BKOODB'");
    hourText.textContent = i.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
    group.appendChild(hourText);

    // عدد دقیقه
    const minuteValue = i * 5;
    const minuteX = centerX + minuteRadius * Math.cos(angle);
    const minuteY = centerY + minuteRadius * Math.sin(angle);
    const minuteText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    minuteText.setAttribute("x", minuteX);
    minuteText.setAttribute("y", minuteY);
    minuteText.classList.add("minute-number");
    minuteText.setAttribute("text-anchor", "middle");
    minuteText.setAttribute("dominant-baseline", "middle");
    minuteText.setAttribute("font-size", "14");
    minuteText.setAttribute("fill", "#3399cc");
    minuteText.setAttribute("style", "font-family: 'BKOODB'");
    minuteText.textContent = minuteValue.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
    group.appendChild(minuteText);
  }

  // مخفی کردن اعداد دقیقه در شروع
  document.querySelectorAll(".minute-number").forEach(el => el.style.opacity = "0");
}

// ساخت عقربه‌های ساعت
function createHand(id, length, color, width) {
  const base = 100;
  const tipY = base - length;
  const pathData = `
    M ${base - width} ${base}
    L ${base} ${tipY}
    L ${base + width} ${base}
    Q ${base} ${base + 6} ${base - width} ${base}
    Z
  `;
  const hand = document.createElementNS("http://www.w3.org/2000/svg", "path");
  hand.setAttribute("d", pathData.trim());
  hand.setAttribute("fill", color);
  hand.setAttribute("id", id);
  hand.setAttribute("filter", "url(#shadow)");
  return hand;
}

// ساخت عقربه ثانیه
function createSecondHand() {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", 100);
  line.setAttribute("y1", 100);
  line.setAttribute("x2", 100);
  line.setAttribute("y2", 15);
  line.setAttribute("stroke", "#cc0000");
  line.setAttribute("stroke-width", 2);
  line.setAttribute("stroke-linecap", "round");

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", 100);
  circle.setAttribute("cy", 100);
  circle.setAttribute("r", 4);
  circle.setAttribute("fill", "#cc0000");

  group.setAttribute("id", "second-hand");
  group.appendChild(line);
  group.appendChild(circle);
  return group;
}

// بروزرسانی عقربه‌ها و ساعت دیجیتال
function updateClockHands(hour, minute, second = 0) {
  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
  const minuteAngle = minute * 6;
  const secondAngle = second * 6;

  document.getElementById("hour-hand").setAttribute("transform", `rotate(${hourAngle}, 100, 100)`);
  document.getElementById("minute-hand").setAttribute("transform", `rotate(${minuteAngle}, 100, 100)`);
  document.getElementById("second-hand").setAttribute("transform", `rotate(${secondAngle}, 100, 100)`);

  updateDigitalTime(hour, minute);
}

// بروزرسانی ساعت دیجیتال
function updateDigitalTime(hour, minute) {
  const toPersian = n => n.toString().padStart(2, '0').replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  document.getElementById("time-value").textContent = `${toPersian(hour12)}:${toPersian(minute)}`;
  document.getElementById("time-period").textContent = !trainingMode ? (hour < 12 ? "صبح" : "بعدازظهر") : "";
}

// تولید ساعت تصادفی برای حالت آموزشی
function generateRandomTime() {
  const hour = Math.floor(Math.random() * 12) + 1;
  const minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55][Math.floor(Math.random() * 12)];
  return { hour, minute };
}

// بروزرسانی خودکار ساعت واقعی
function startRealTimeClock() {
  setInterval(() => {
    if (!trainingMode) {
      const now = new Date();
      updateClockHands(now.getHours(), now.getMinutes(), now.getSeconds());
    }
  }, 1000);
}

// فعال‌سازی حالت واقعی
function setRealMode(event) {
  event.stopPropagation();
  trainingMode = false;

  document.getElementById("real-mode").classList.add("active-mode");
  document.getElementById("training-mode").classList.remove("active-mode");

  document.getElementById("digital-time").style.opacity = "1";

  if (!helperVisible) {
    document.querySelectorAll(".minute-number").forEach(el => el.style.opacity = "0");
  }

  const now = new Date();
  updateClockHands(now.getHours(), now.getMinutes(), now.getSeconds());
  updateDigitalTime(now.getHours(), now.getMinutes());
}

// فعال‌سازی حالت آموزشی
function setTrainingMode(event) {
  event.stopPropagation();
  trainingMode = true;

  document.getElementById("training-mode").classList.add("active-mode");
  document.getElementById("real-mode").classList.remove("active-mode");

  const time = generateRandomTime();
  updateClockHands(time.hour, time.minute);

  // ساعت دیجیتال فقط وقتی راهنما فعال باشه دیده می‌شه
  document.getElementById("digital-time").style.opacity = helperVisible ? "1" : "0";

  // اعداد دقیقه فقط با راهنما دیده می‌شن
  document.querySelectorAll(".minute-number").forEach(el => {
    el.style.opacity = helperVisible ? "1" : "0";
  });
}

// افکت لمس روی ساعت در حالت آموزشی
function handleClockTap() {
  if (trainingMode) {
    const time = generateRandomTime();
    updateClockHands(time.hour, time.minute);

    const clock = document.getElementById("clock");
    clock.style.transition = "transform 0.2s ease";
    clock.style.transform = "scale(1.05)";
    setTimeout(() => {
      clock.style.transform = "scale(1)";
    }, 200);
  }
}

// راه‌اندازی اولیه هنگام بارگذاری صفحه
window.onload = () => {
  drawMinuteMarks();       // رسم خط‌های دقیقه
  drawClockNumbers();      // رسم اعداد ساعت و دقیقه

  // ساخت عقربه‌ها و اضافه‌کردن به گروه hands
  const handsGroup = document.getElementById("hands");
  handsGroup.appendChild(createHand("hour-hand", 50, "#0077cc", 6));     // ساعت
  handsGroup.appendChild(createHand("minute-hand", 70, "#ff6600", 4));   // دقیقه
  handsGroup.appendChild(createSecondHand());                            // ثانیه

  // فعال‌سازی حالت واقعی از ابتدا
  trainingMode = false;
  document.getElementById("real-mode").classList.add("active-mode");
  document.getElementById("training-mode").classList.remove("active-mode");

  const now = new Date();
  updateClockHands(now.getHours(), now.getMinutes(), now.getSeconds());
  updateDigitalTime(now.getHours(), now.getMinutes());

  // ساعت دیجیتال در حالت واقعی همیشه دیده می‌شه
  document.getElementById("digital-time").style.opacity = "1";

  // اعداد دقیقه فقط با راهنما دیده می‌شن
  if (!helperVisible) {
    document.querySelectorAll(".minute-number").forEach(el => el.style.opacity = "0");
  }

  // شروع بروزرسانی خودکار ساعت واقعی
  startRealTimeClock();
};

// ثبت سرویس‌ورکر برای فعال‌سازی حالت PWA و آفلاین
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(() => {
    console.log("Service Worker ثبت شد ✅");
  });
}

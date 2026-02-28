// home.js - full file
// Types three lines in sequence, appends caret AFTER typing finishes,
// then shows a Continue button 10 seconds after typing completes.

const LINES = [
  "Jared Chiew",
  "Senior Computer Science Student @ Arizona State University",
  "Seeking Data/Software-Related Full-Time/Part-Time/Internships Starting May 2026",
  "(More info about me in the Background Page)"
];

const typingContainer = document.getElementById("typing");
const homeWrap = document.querySelector(".home-wrap");
const continueBtn = document.getElementById("continueBtn");
let typingCompletedAt = null;
let continueTimerId = null;

// helper: sleep
function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

// type a single line into container, returns when finished
async function typeLine(text, speed = 35) {
  const lineWrap = document.createElement("div");
  lineWrap.className = "typed-line";
  typingContainer.appendChild(lineWrap);

  for (let i = 0; i < text.length; i++) {
    lineWrap.textContent += text[i];
    const jitter = Math.random() * 35;
    await wait(speed + jitter);
  }
  // small pause at end of line
  await wait(240);
}

// show continue button after delay (10 seconds default)
function scheduleContinueButton(delayMs = 10000) {
  // clear existing timer if any
  if (continueTimerId) clearTimeout(continueTimerId);

  continueTimerId = setTimeout(() => {
    continueBtn.classList.add("visible");
    continueBtn.setAttribute("aria-hidden", "false");
    // focusable for keyboard users
    continueBtn.focus();
  }, delayMs);
}

// main sequence
async function runTypingSequence() {
  // reveal the page container smoothly
  homeWrap.classList.remove("hidden");
  homeWrap.classList.add("visible");

  // type each line sequentially
  for (let i = 0; i < LINES.length; i++) {
    await typeLine(LINES[i], 32);
    // add a newline after line so caret will sit on the next line
    typingContainer.appendChild(document.createElement("br"));
  }

  // add caret element to the end of typingContainer (after all lines)
  const caret = document.createElement("span");
  caret.className = "caret";
  caret.setAttribute("aria-hidden", "true");
  typingContainer.appendChild(caret);

  // mark typing complete time
  typingCompletedAt = Date.now();

  // schedule the Continue button to appear 10 seconds later
  scheduleContinueButton(2000);
}

// Continue button behavior: go to menu page
continueBtn.addEventListener("click", () => {
  // small fade-out before navigation for polish
  document.body.style.transition = "opacity 0.5s ease";
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = "menu.html";
  }, 520);
});

// keyboard activation (Enter/Space) for accessibility
continueBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
    e.preventDefault();
    continueBtn.click();
  }
});

// on load, run the typing (start slightly delayed for smoother transition)
window.addEventListener("load", () => {
  // ensure we start hidden so we can animate in
  homeWrap.classList.add("hidden");
  setTimeout(runTypingSequence, 180);
});
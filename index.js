// Updated index.js — small change: fade main out before navigating to home.html

// elements
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const enterBtn = document.getElementById("enterBtn");
const pressAny = document.getElementById("pressAny");

let audioCtx = null;
let mainAppeared = false;
let navigationEnabled = false;

// Utilities: simple 8-bit style blip using WebAudio
function ensureAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Play a short 8-bit "jingle" — sequence of square-wave notes
function playChiptune() {
    try {
        ensureAudioCtx();
        const now = audioCtx.currentTime;
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
        gain.connect(audioCtx.destination);

        const osc = audioCtx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(660, now);
        osc.connect(gain);
        osc.start(now);

        osc.frequency.setValueAtTime(660, now + 0.12);
        osc.frequency.setValueAtTime(880, now + 0.20);
        osc.frequency.setValueAtTime(740, now + 0.30);

        osc.stop(now + 0.5);
    } catch (e) {
        console.warn("Audio unavailable:", e);
    }
}

// Play a short confirm blip (when ENTER pressed)
function playConfirmBlip() {
    try {
        ensureAudioCtx();
        const now = audioCtx.currentTime;
        const g = audioCtx.createGain();
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(0.18, now + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        g.connect(audioCtx.destination);

        const o = audioCtx.createOscillator();
        o.type = 'square';
        o.frequency.setValueAtTime(950, now);
        o.connect(g);
        o.start(now);
        o.stop(now + 0.11);
    } catch (e) {
        console.warn("Confirm blip failed:", e);
    }
}

// fade out current UI then navigate
function fadeOutAndNavigate(url = "home.html", fadeDuration = 700) {
    // fade out visible screens (intro/main)
    // remove visible class to trigger CSS opacity transition
    intro.classList.remove("visible");
    main.classList.remove("visible");
    pressAny.classList.remove("blink");
    enterBtn.classList.remove("blink");

    // play confirm blip
    playConfirmBlip();

    // navigate after fadeDuration (ms)
    setTimeout(() => {
        window.location.href = url;
    }, fadeDuration);
}

// Navigation function (go to homepage) — now uses fadeOutAndNavigate
function navigateHome() {
    if (!navigationEnabled) return;
    // fade out then navigate
    fadeOutAndNavigate("home.html", 700);
}

// Sequence control
function showIntroThenMain() {
    // Show intro
    intro.classList.add("visible");

    // After 3s, fade intro out and show main
    const introDuration = 3000;
    setTimeout(() => {
        intro.classList.remove("visible");
    }, introDuration);

    // Show main after a little longer (gives fade-out)
    setTimeout(() => {
        revealMain();
    }, introDuration + 600);
}

function revealMain() {
    if (mainAppeared) return;
    mainAppeared = true;

    // show main screen
    main.classList.add("visible");
    main.setAttribute("aria-hidden", "false");

    // make the button blink and show press-any
    enterBtn.classList.add("blink");
    pressAny.classList.add("blink");
    pressAny.setAttribute("aria-hidden", "false");

    // enable navigation after the main is visible
    navigationEnabled = true;

    // play chiptune
    playChiptune();
}

// User interactions
enterBtn.addEventListener("click", (e) => {
    ensureAudioCtx();
    navigationEnabled = true;
    navigateHome();
});

// pressing any key navigates (but only after main has appeared)
function onAnyKey(e) {
    // If the main hasn't appeared yet, reveal it immediately (and play sound)
    if (!mainAppeared) {
        ensureAudioCtx();
        revealMain();
        // After revealing, Enter/Space acts as immediate confirmation
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            navigationEnabled = true;
            navigateHome();
        }
        return;
    }

    // If main already shown, treat any key as enter (ignore modifiers)
    if (e.key && (e.key.length === 1 || e.key === "Enter" || e.key === " ")) {
        ensureAudioCtx();
        navigationEnabled = true;
        navigateHome();
    }
}

// clicks: reveal main first if needed, otherwise behave like enter
document.addEventListener("click", (e) => {
    if (!mainAppeared) {
        ensureAudioCtx();
        revealMain();
        return;
    }
    const tag = (e.target && e.target.tagName) || "";
    if (tag !== 'BUTTON' && navigationEnabled) {
        navigationEnabled = true;
        navigateHome();
    }
}, { passive: true });

document.addEventListener("keydown", onAnyKey, { passive: true });

// Start the sequence automatically on page load
window.addEventListener("load", () => {
    setTimeout(showIntroThenMain, 200);
});
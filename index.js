const intro = document.getElementById("intro");
const loading = document.getElementById("loading");
const main = document.getElementById("main");
const launchBtn = document.getElementById("launchBtn");
const progressFill = document.getElementById("progressFill");
const loadingPercent = document.getElementById("loadingPercent");

let mainAppeared = false;
let navigationEnabled = false;

const LOADING_DURATION = 2000;

function fadeOutAndNavigate(url = "home.html", fadeDuration = 700) {
    intro.classList.remove("visible");
    loading.classList.remove("visible");
    main.classList.remove("visible");

    setTimeout(() => {
        window.location.href = url;
    }, fadeDuration);
}

function navigateHome() {
    if (!navigationEnabled) return;
    fadeOutAndNavigate("home.html", 700);
}

function startLoading() {
    loading.classList.add("visible");
    const startTime = performance.now();

    function updateLoading(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / LOADING_DURATION, 1);
        const percent = Math.round(progress * 100);

        progressFill.style.width = percent + "%";
        loadingPercent.textContent = percent + "%";

        if (progress < 1) {
            requestAnimationFrame(updateLoading);
        } else {
            finishLoading();
        }
    }

    requestAnimationFrame(updateLoading);
}

function finishLoading() {
    loading.classList.remove("visible");
    revealMain();
}

function revealMain() {
    if (mainAppeared) return;
    mainAppeared = true;

    main.classList.add("visible");
    main.setAttribute("aria-hidden", "false");

    navigationEnabled = true;
}

function startSequence() {
    intro.classList.add("visible");

    setTimeout(() => {
        intro.classList.remove("visible");
        startLoading();
    }, 2500);
}

launchBtn.addEventListener("click", (e) => {
    navigationEnabled = true;
    navigateHome();
});

document.addEventListener("keydown", (e) => {
    if (!mainAppeared) return;

    if (e.key && (e.key.length === 1 || e.key === "Enter" || e.key === " " || e.key === "Spacebar")) {
        navigationEnabled = true;
        navigateHome();
    }
}, { passive: true });

document.addEventListener("click", (e) => {
    if (!mainAppeared) return;
    const tag = (e.target && e.target.tagName) || "";
    if (tag !== 'BUTTON' && navigationEnabled) {
        navigationEnabled = true;
        navigateHome();
    }
}, { passive: true });

window.addEventListener("load", () => {
    setTimeout(startSequence, 200);
});
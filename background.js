(function () {
  const creditsWrap = document.getElementById('credits');
  const inner = creditsWrap.querySelector('.credits-inner');
  const stage = document.getElementById('credits-stage');

  if (!inner) return;

  function applyPositionsAndDuration() {
    const contentHeight = inner.getBoundingClientRect().height;
    const viewport = window.innerHeight;

    // Start: just below viewport
    const startPx = Math.ceil(viewport + 20);

    // End: move until content fully above
    const endPx = -Math.ceil(contentHeight + 20);

    const totalDistance = startPx - endPx;
    const factor = 0.035; // seconds per px
    const seconds = Math.max(18, Math.round(totalDistance * factor));

    const root = document.documentElement;
    root.style.setProperty('--start', startPx + 'px');
    root.style.setProperty('--end', endPx + 'px');
    root.style.setProperty('--scroll-duration', seconds + 's');

    return seconds * 1000; // return duration in ms
  }

  // Initial apply after a short settle
  setTimeout(() => {
    const duration = applyPositionsAndDuration();

    // After the animation finishes: reveal static content so user can scroll
    setTimeout(() => {
      // stop animation
      inner.style.animation = "none";

      // Make the stage expand to fit content and allow scrolling
      stage.style.height = "auto";
      stage.style.overflow = "visible";

      // Make credits flow like normal document content
      inner.style.position = "relative";
      inner.style.transform = "none";

      // Create and add "SCROLL UP TO VIEW" hint (fixed at bottom center)
      const scrollText = document.createElement("div");
      scrollText.textContent = "SCROLL UP/DOWN TO VIEW";
      scrollText.style.position = "fixed";
      scrollText.style.bottom = "40px";
      scrollText.style.left = "50%";
      scrollText.style.transform = "translateX(-50%)";
      scrollText.style.fontSize = "12px";
      scrollText.style.color = "#ff8a00";
      scrollText.style.zIndex = "30";
      scrollText.style.letterSpacing = "2px";
      scrollText.style.opacity = "0";
      scrollText.style.transition = "opacity 600ms ease";

      document.body.appendChild(scrollText);

      // fade in the scroll hint a little after animation end
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollText.style.opacity = "1";
        }, 120);
      });

      // Ensure page is scrollable
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";

    }, duration);

  }, 80);

  // Recalc on resize (debounced)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      applyPositionsAndDuration();
    }, 180);
  });

  // Continue button behavior (unchanged)
  const continueBtn = document.getElementById('continueBtn');

  if (continueBtn) {
    setTimeout(() => {
      continueBtn.classList.add('show');
      continueBtn.setAttribute('aria-hidden', 'false');
    }, 5000);

    continueBtn.addEventListener('click', () => {
      window.location.href = "menu.html";
    });
  }
})();
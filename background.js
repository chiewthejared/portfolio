/* background.js
   JS calculates exact start (below viewport) and end (above content) pixel positions
   and writes them into CSS vars --start and --end. Also sets animation duration.
   Keeps the content duplicated for seamless looping.
*/

(function () {
  const creditsWrap = document.getElementById('credits');
  const inner = creditsWrap.querySelector('.credits-inner');

  if (!inner) return;

  // Clone for seamless loop
  let clone = inner.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  creditsWrap.appendChild(clone);

  // Helper to set CSS vars: start (px below viewport), end (px above top)
  function applyPositionsAndDuration() {
    // measure
    const contentHeight = inner.getBoundingClientRect().height;
    const viewport = window.innerHeight;

    // Start: position the block just below the viewport
    // We'll use pixels to be exact: start translates the block by viewport + small padding
    const startPx = Math.ceil(viewport + 20); // starts just below visible area

    // End: move the block up until it's fully out of view above the top.
    // We want the final translate to be negative such that even the cloned copy fully passes.
    // The total travel distance should be: startPx + contentHeight + viewport + extra
    // But for the final translate value we set to -(contentHeight + 20)
    const endPx = -Math.ceil(contentHeight + 20);

    // Duration: proportional to total travel distance
    const totalDistance = startPx - endPx; // in px (positive)
    // factor = seconds per 1000px
    const factor = 0.035; // seconds per px -> 20s per 1000px
    const seconds = Math.max(18, Math.round(totalDistance * factor));

    // Apply to CSS root
    const root = document.documentElement;
    root.style.setProperty('--start', startPx + 'px');
    root.style.setProperty('--end', endPx + 'px');
    root.style.setProperty('--scroll-duration', seconds + 's');
  }

  // initial apply (wait for possible fonts/images to layout)
  // use a short timeout to let layout settle
  setTimeout(() => {
    applyPositionsAndDuration();

    // Re-measure after a second in case fonts loaded late
    setTimeout(applyPositionsAndDuration, 800);
  }, 80);

  // Recalc on resize / font load etc. (debounced)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyPositionsAndDuration, 180);
  });

  // Also recalc if DOM changes (in case you update the credits dynamically)
  const obs = new MutationObserver(() => {
    // small debounce
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyPositionsAndDuration, 120);
  });
  obs.observe(inner, { childList: true, subtree: true, characterData: true });

  // Expose helper to update content dynamically (keeps clone in sync)
  window.updateCredits = function (htmlString) {
    inner.innerHTML = htmlString;
    clone.innerHTML = htmlString;
    // recalc after DOM update
    setTimeout(applyPositionsAndDuration, 80);
  };

    // Show continue button after 5 seconds
  const continueBtn = document.getElementById('continueBtn');

  if (continueBtn) {
    setTimeout(() => {
      continueBtn.classList.add('show');
      continueBtn.setAttribute('aria-hidden', 'false');
    }, 5000);

    // Change this link to wherever you want it to go
    continueBtn.addEventListener('click', () => {
      window.location.href = "menu.html"; 
    });
  }
})();
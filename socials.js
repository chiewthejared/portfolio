// socials.js
// Combines floating-image spawn logic with Continue button behavior.
// - First two social clicks spawn moving images (images/instagram.png and images/linkedin.png).
// - Third+ clicks do nothing.
// - Clicking a social still opens the social in a new tab.
// - Continue button fades out page and navigates to menu.html
// - Keyboard activation supported for links and Continue button.

(() => {
  const LINKS = Array.from(document.querySelectorAll('.terminal-link'));
  const continueBtn = document.getElementById('continueBtn');

  // ---------- Continue button behavior (restored) ----------
  function setupContinueButton() {
    if (!continueBtn) return;
    continueBtn.addEventListener("click", () => {
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = "menu.html";
      }, 520);
    });

    continueBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        continueBtn.click();
      }
    });
  }

  function getIconForLink(href) {
  if (href.includes('linkedin')) {
    return 'images/linkedin.png';
  }

  if (href.includes('instagram')) {
    return 'images/instagram.png';
  }

  if (href.includes('letterboxd')) {
    return 'images/letterboxd.png';
  }

  if (href.includes('github')) {
    return 'images/github.png';
  }

  if (href.includes('handshake')) {
    return 'images/handshake.png';
  }

  return null;
}

  const spawned = new Set();
  let spawnCount = 0; // max 2

  function getSafeMargins() {
    return {
      left: 120,
      top: 40,
      right: 140,
      bottom: 120
    };
  }

  function spawnMovingImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.className = 'floating-social';
    img.style.position = 'fixed';
    img.style.zIndex = 50; // below continue button (z-index:60 in CSS)
    img.style.width = '96px';
    img.style.height = '96px';
    img.style.pointerEvents = 'none'; // don't block UI

    document.body.appendChild(img);

    const margins = getSafeMargins();
    const safeLeft = margins.left;
    const safeTop = margins.top;

    // compute safe right/bottom factoring image size
    function computeSafeRight() {
      return Math.max(safeLeft + 20, window.innerWidth - margins.right - parseInt(img.style.width, 10));
    }
    function computeSafeBottom() {
      return Math.max(safeTop + 20, window.innerHeight - margins.bottom - parseInt(img.style.height, 10));
    }

    let safeRight = computeSafeRight();
    let safeBottom = computeSafeBottom();

    let x = safeLeft + Math.random() * Math.max(1, safeRight - safeLeft);
    let y = safeTop + Math.random() * Math.max(1, safeBottom - safeTop);

    let angle = Math.random() * Math.PI * 2;
    let speed = 1 + Math.random() * 1; // 1 - 2 px/frame
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;

    img.style.left = Math.round(x) + 'px';
    img.style.top = Math.round(y) + 'px';

    let rafId = null;
    function step() {
      x += vx;
      y += vy;

      // update bounds on resize
      safeRight = computeSafeRight();
      safeBottom = computeSafeBottom();

      if (x <= safeLeft) {
        x = safeLeft;
        vx = Math.abs(vx);
      } else if (x >= safeRight) {
        x = safeRight;
        vx = -Math.abs(vx);
      }

      if (y <= safeTop) {
        y = safeTop;
        vy = Math.abs(vy);
      } else if (y >= safeBottom) {
        y = safeBottom;
        vy = -Math.abs(vy);
      }

      img.style.left = Math.round(x) + 'px';
      img.style.top = Math.round(y) + 'px';

      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

    img.cleanup = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (img.parentNode) img.parentNode.removeChild(img);
    };

    return img;
  }

  function chooseImageForSpawn() {
    const remaining = IMAGE_POOL.filter(p => !spawned.has(p));
    if (remaining.length === 0) return null;
    if (remaining.length === IMAGE_POOL.length) {
      return remaining[Math.floor(Math.random() * remaining.length)];
    } else {
      return remaining[0];
    }
  }

  function onLinkClick(e) {
  if (!e.currentTarget || !e.currentTarget.classList.contains('terminal-link')) return;

  const href = e.currentTarget.href;
  e.preventDefault();

  try {
    window.open(href, '_blank', 'noopener,noreferrer');
  } catch (err) {
    setTimeout(() => { window.open(href, '_blank'); }, 50);
  }

  const src = getIconForLink(href);
  if (!src) return;

  spawnMovingImage(src);
}

  // attach handlers
  function attachLinkHandlers() {
    LINKS.forEach(link => {
      link.addEventListener('click', onLinkClick);
      link.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
          ev.preventDefault();
          link.click();
        }
      });
    });
  }

  // ---------- Init ----------
  function init() {
    setupContinueButton();
    attachLinkHandlers();
  }

  // run
  document.addEventListener('DOMContentLoaded', init);
})();
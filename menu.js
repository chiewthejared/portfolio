// menu.js
// App open animation + loading screen with filling dots

(function () {
  const buttons = Array.from(document.querySelectorAll('.app'));
  if (!buttons.length) return;

  function getRect(el) {
    return el.getBoundingClientRect();
  }

  function createCloneFromButton(btn) {
    const rect = getRect(btn);

    const clone = document.createElement('div');
    clone.className = 'app-clone';

    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.padding = window.getComputedStyle(btn).padding;
    clone.style.borderRadius = window.getComputedStyle(btn).borderRadius;

    const inner = document.createElement('div');
    inner.className = 'clone-inner';
    inner.innerHTML = btn.innerHTML;

    clone.appendChild(inner);
    document.body.appendChild(clone);

    return clone;
  }

  function showLoadingScreen(target){
  const loading = document.createElement('div');
  loading.className = 'loading-screen';

  loading.innerHTML = `
    <div class="loading-title">LOADING</div>
    <div class="loading-dots"></div>
  `;

  document.body.appendChild(loading);

  const dotsContainer = loading.querySelector('.loading-dots');

  const totalDots = 20;   // length of line
  let current = 0;

  // blinking cursor
  const cursor = document.createElement('span');
  cursor.textContent = '█';
  cursor.className = 'loading-cursor';
  dotsContainer.appendChild(cursor);

  function typeDot(){
    if(current < totalDots){
      const dot = document.createElement('span');
      dot.textContent = '.';
      dotsContainer.insertBefore(dot, cursor);

      current++;

      const jitter = Math.random() * 80;
      setTimeout(typeDot, 60 + jitter);
    } else {
      cursor.remove();
      setTimeout(()=>{
        window.location.href = target;
      },300);
    }
  }

  typeDot();
}

  function animateCloneOpen(cloneEl, callback) {
    cloneEl.getBoundingClientRect();

    requestAnimationFrame(() => {
      cloneEl.classList.add('app-clone--open');
    });

    setTimeout(callback, 500);
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (!target) return;

      const clone = createCloneFromButton(btn);
      btn.style.visibility = 'hidden';

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      animateCloneOpen(clone, () => {
        showLoadingScreen(target);
      });
    });
  });

})();
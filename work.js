document.addEventListener("DOMContentLoaded", function() {
  const bootScreen = document.getElementById("bootScreen");
  const bootProgress = document.getElementById("bootProgress");
  const monitorContainer = document.querySelector(".monitor-container");
  const workLogApp = document.getElementById("workLogApp");

  let progress = 0;
  const bootDuration = 4000; // 4 seconds total boot time

  // Animate boot progress bar
  const startTime = Date.now();

  function updateBoot() {
    const elapsed = Date.now() - startTime;
    progress = Math.min(elapsed / bootDuration, 1);
    bootProgress.style.width = (progress * 100) + "%";

    if (progress < 1) {
      requestAnimationFrame(updateBoot);
    } else {
      // Boot complete - fade out boot screen, show monitor
      setTimeout(function() {
        bootScreen.classList.add("hidden");
        monitorContainer.classList.add("visible");
      }, 400);
    }
  }

  updateBoot();

  // Click on Work Log app
  workLogApp.addEventListener("click", function() {
    // For now, just a simple feedback
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 200);
    // We'll add the actual app functionality in the next prompt
    console.log("Work Log app clicked!");
  });

  // Ensure monitor is hidden initially
  monitorContainer.style.opacity = "0";

  // After boot, show monitor with transition
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.classList.contains("hidden")) {
        // Boot screen hidden - show monitor
        setTimeout(function() {
          monitorContainer.style.opacity = "1";
        }, 100);
      }
    });
  });

  observer.observe(bootScreen, { attributes: true, attributeFilter: ["class"] });
});
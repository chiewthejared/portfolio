document.addEventListener("DOMContentLoaded", function() {
  const powerBtn = document.getElementById("powerBtn");

  // Power button - navigate to menu
  powerBtn.addEventListener("click", function() {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "0";
    setTimeout(function() {
      window.location.href = "menu.html";
    }, 550);
  });

  // App items already have href and target="_blank" so they work natively
  // Add a small click feedback animation
  document.querySelectorAll(".app-item").forEach(function(item) {
    item.addEventListener("click", function(e) {
      // Allow the link to open normally
      // Just add a quick scale feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);
    });
  });
});
// Populate left list and hook up preview switching.
// Modified so initial view shows a "Select a project to view" placeholder
// (keeps your project order, names, descriptions unchanged).

const projects = [
  {
    title: "SWF Java App",
    image: "images/swf.jpg",
    description: "An Android Medical Application built with Java and XML, on Android Studio for Sturge-Weber Foundation.",
    repo: "https://github.com/chiewthejared/androidcapstone"
  },
  {
    title: "Local Chatbot Project",
    image: "images/chatbot.png",
    description: "Simple Python file that handles input and output for a chatbot linked to Vertex AI.",
    repo: "https://github.com/chiewthejared/cloudspace/blob/main/chatbot.py"
  },
  {
    title: "Analysis of Tips Dataset",
    image: "images/data.png",
    description: "Simple data analysis of the 'Tips' dataset using Python, Pandas, and Matplotlib to explore tipping patterns.",
    repo: "https://github.com/chiewthejared/data/blob/main/Assignment%201.ipynb"
  },
  {
    title: "Portfolio Website",
    image: "images/portfolio.png",
    description: "A personal, retro video game-inspired portfolio website built with HTML, CSS, and JavaScript to showcase projects and skills.",
    repo: "https://github.com/chiewthejared/portfolio"
  }
];

const listEl = document.getElementById("projectsList");
const projectImage = document.getElementById("projectImage");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const previewBox = document.getElementById("previewBox");
const continueBtn = document.getElementById("continueBtn");
const repoBtn = document.getElementById("repoBtn");

// Build the left list using the same className 'terminal-link' so CSS matches exactly.
projects.forEach((p, i) => {
  const item = document.createElement("div");
  item.className = "terminal-link";
  item.tabIndex = 0; // make keyboard focusable like links
  item.innerText = `> ${p.title}`;
  item.addEventListener("click", () => showProject(i));
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      showProject(i);
    }
  });
  listEl.appendChild(item);
});

// --- NEW: initial placeholder state (no project selected) ---
setPlaceholder();

function setPlaceholder() {
  // hide image area (we hide the wrapper so the yellow frame disappears)
  const imgWrap = document.querySelector("#previewBox .img-wrap");
  if (imgWrap) imgWrap.style.display = "none";

  // apply placeholder class to allow different styling (see CSS)
  previewBox.classList.add("placeholder");

  // placeholder text only
  projectTitle.innerText = "Select a project to view";
  projectDescription.innerText = ""; // empty description initially

  // hide repo button while placeholder is active
  if (repoBtn) repoBtn.style.display = "none";
}

function showProject(index) {
  const p = projects[index];

  // restore image wrapper (so yellow frame appears) and show image
  const imgWrap = document.querySelector("#previewBox .img-wrap");
  if (imgWrap) imgWrap.style.display = ""; // reset to CSS default

  projectImage.style.display = ""; // show image element
  projectImage.src = p.image;
  projectTitle.innerText = p.title;
  projectDescription.innerText = p.description;

  // repo button: show if repo present, otherwise hide
  if (p.repo) {
    repoBtn.style.display = "inline-block";
    repoBtn.href = p.repo;
  } else {
    repoBtn.style.display = "none";
    repoBtn.href = "#";
  }

  // remove placeholder styling if it was present
  previewBox.classList.remove("placeholder");

  // small visual cue: brief opacity flash on preview box
  previewBox.style.transition = "opacity 0.18s ease";
  previewBox.style.opacity = 0.6;
  requestAnimationFrame(() => {
    setTimeout(() => { previewBox.style.opacity = 1; }, 80);
  });
}

/* Continue button behavior copied from your socials.js for consistent navigation */
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
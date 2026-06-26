// Populate left list and hook up preview switching.
// Modified so initial view shows a "Select a project to view" placeholder
// (keeps your project order, names, descriptions unchanged).

const projects = [
  {
    title: "Resume RAG Chatbot",
    image: "images/rag-chatbot.png",
    description: "Designed and developed a Retrieval-Augmented Generation (RAG) chatbot that enables natural language querying of my professional background by indexing multiple resumes (Data Analyst, Data Engineer, Data Science, Software Developer, Software Engineer) and using Google Gemini embeddings to understand content, FAISS for efficient vector retrieval, and LangChain to orchestrate the pipeline – when a user asks a question, the system retrieves the most relevant sections and generates concise, fact‑based answers, all wrapped in a Streamlit UI and deployed on Streamlit Cloud for a seamless, interactive experience.",
    repo: "https://github.com/chiewthejared/ragchatbot"
  },
  {
    title: "COVID-19 Power BI Dashboard",
    image: "images/powerbi.png",
    description: "Designed and developed an interactive COVID-19 analytics dashboard in Power BI to visualize global pandemic trends from 2020–2023, featuring Azure Maps for geographic analysis, dynamic KPI cards for total cases, deaths, and death rate, comparative continent and country-level insights, yearly trend analysis, and interactive filtering capabilities. Performed data cleaning and transformation using Power Query and DAX, including handling null values, creating time-series and latest snapshot datasets, and implementing a custom dark-themed dashboard with consistent visual styling for improved usability and presentation.",
    repo: "https://app.powerbi.com/groups/me/reports/27488b6f-a505-40d5-8256-e9777f6ef236/7951e7be1ed69008f848?experience=power-bi"
  },
  {
    title: "COVID-19 Data Dashboard",
    image: "images/covid19.png",
    description: "Developed an interactive COVID-19 data dashboard using real-world data from Our World in Data, enabling users to explore global trends in cases and deaths across countries and continents. Built with JavaScript and D3.js, the dashboard features dynamic filtering by continent, year, and country, with linked visualizations including a time-series line chart, a top countries bar chart, and a scatterplot analyzing relationships between cases, deaths, and population. The project emphasizes data cleaning, transformation, and responsive design to support intuitive exploratory analysis.",
    repo: "https://observablehq.com/@cses478/covid-dashboard"
  },
  {
    title: "Spotify Wrapped Analysis",
    image: "images/spotify.png",
    description: "Conducted a data analysis project on Spotify song trends, comparing 2025 hits with all-time popular tracks. Used R (ggplot2, plotly, dplyr) to create interactive visualizations and uncover insights showing that audio features alone do not strongly predict streaming success.",
    repo: "https://rpubs.com/chiewthejared/spotifywrapped"
  },
  {
    title: "SWF Java App",
    image: "images/swf.jpg",
    description: "An Android application developed in Java using Android Studio, with user interfaces built in XML, designed to help users track and manage seizure-related health information. The app allows users to record the time and details of seizure events, securely store medical and doctor information, visualize seizure patterns through analytics and charts, and manage appointments through an integrated medical calendar. The application follows a structured Android architecture and uses responsive UI components to provide an intuitive interface for monitoring and managing seizure data.",
    repo: "https://github.com/chiewthejared/androidcapstone"
  },
  {
    title: "Portfolio Website",
    image: "images/portfolio.png",
    description: "A personal portfolio website developed using HTML, CSS, and JavaScript to showcase projects, technical skills, and professional experience. The site features responsive design, interactive UI elements, and structured sections for projects, about, and contact information. It is deployed and hosted using GitHub Pages.",
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
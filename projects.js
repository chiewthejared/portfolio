document.addEventListener("DOMContentLoaded", function() {
  const projects = [
    {
      title: "Resume RAG Chatbot",
      sender: "Jan 2026",
      description: "Designed and developed a Retrieval-Augmented Generation (RAG) chatbot that enables natural language querying of my professional background by indexing multiple resumes (Data Analyst, Data Engineer, Data Science, Software Developer, Software Engineer) and using Google Gemini embeddings to understand content, FAISS for efficient vector retrieval, and LangChain to orchestrate the pipeline – when a user asks a question, the system retrieves the most relevant sections and generates concise, fact‑based answers, all wrapped in a Streamlit UI and deployed on Streamlit Cloud for a seamless, interactive experience.",
      image: "images/rag-chatbot.png",
      repo: "https://github.com/chiewthejared/ragchatbot"
    },
    {
      title: "COVID-19 Power BI Dashboard",
      sender: "Dec 2025",
      description: "Designed and developed an interactive COVID-19 analytics dashboard in Power BI to visualize global pandemic trends from 2020–2023, featuring Azure Maps for geographic analysis, dynamic KPI cards for total cases, deaths, and death rate, comparative continent and country-level insights, yearly trend analysis, and interactive filtering capabilities. Performed data cleaning and transformation using Power Query and DAX, including handling null values, creating time-series and latest snapshot datasets, and implementing a custom dark-themed dashboard with consistent visual styling for improved usability and presentation.",
      image: "images/powerbi.png",
      repo: "https://app.powerbi.com/groups/me/reports/27488b6f-a505-40d5-8256-e9777f6ef236/7951e7be1ed69008f848?experience=power-bi"
    },
    {
      title: "COVID-19 Data Dashboard",
      sender: "Nov 2025",
      description: "Developed an interactive COVID-19 data dashboard using real-world data from Our World in Data, enabling users to explore global trends in cases and deaths across countries and continents. Built with JavaScript and D3.js, the dashboard features dynamic filtering by continent, year, and country, with linked visualizations including a time-series line chart, a top countries bar chart, and a scatterplot analyzing relationships between cases, deaths, and population. The project emphasizes data cleaning, transformation, and responsive design to support intuitive exploratory analysis.",
      image: "images/covid19.png",
      repo: "https://observablehq.com/@cses478/covid-dashboard"
    },
    {
      title: "Spotify Wrapped Analysis",
      sender: "Oct 2025",
      description: "Conducted a data analysis project on Spotify song trends, comparing 2025 hits with all-time popular tracks. Used R (ggplot2, plotly, dplyr) to create interactive visualizations and uncover insights showing that audio features alone do not strongly predict streaming success.",
      image: "images/spotify.png",
      repo: "https://rpubs.com/chiewthejared/spotifywrapped"
    },
    {
      title: "SWF Java App",
      sender: "Sep 2025",
      description: "An Android application developed in Java using Android Studio, with user interfaces built in XML, designed to help users track and manage seizure-related health information. The app allows users to record the time and details of seizure events, securely store medical and doctor information, visualize seizure patterns through analytics and charts, and manage appointments through an integrated medical calendar. The application follows a structured Android architecture and uses responsive UI components to provide an intuitive interface for monitoring and managing seizure data.",
      image: "images/swf.jpg",
      repo: "https://github.com/chiewthejared/androidcapstone"
    },
    {
      title: "Portfolio Website",
      sender: "Aug 2025",
      description: "A personal portfolio website developed using HTML, CSS, and JavaScript to showcase projects, technical skills, and professional experience. The site features responsive design, interactive UI elements, and structured sections for projects, about, and contact information. It is deployed and hosted using GitHub Pages.",
      image: "images/portfolio.png",
      repo: "https://github.com/chiewthejared/portfolio"
    }
  ];

  const emailList = document.getElementById("emailList");
  const emailContent = document.getElementById("emailContent");
  const emailDetail = document.getElementById("emailDetail");
  const placeholder = document.getElementById("placeholder");
  const emailSubject = document.getElementById("emailSubject");
  const emailSender = document.getElementById("emailSender");
  const emailBody = document.getElementById("emailBody");
  const closeBtn = document.getElementById("closeBtn");

  let selectedIndex = -1;

  // Build email list
  projects.forEach((p, index) => {
    const item = document.createElement("div");
    item.className = "email-item";
    item.dataset.index = index;
    item.innerHTML = `
      <div class="email-item-subject">${p.title}</div>
      <div class="email-item-sender">${p.sender}</div>
    `;
    item.addEventListener("click", () => selectProject(index));
    emailList.appendChild(item);
  });

  function selectProject(index) {
    const p = projects[index];
    
    // Update selected state
    document.querySelectorAll(".email-item").forEach((el, i) => {
      el.classList.toggle("selected", i === index);
    });

    selectedIndex = index;

    // Show detail, hide placeholder
    placeholder.style.display = "none";
    emailDetail.style.display = "flex";
    emailDetail.classList.add("active");

    // Fill content
    emailSubject.textContent = p.title;
    emailSender.textContent = p.sender;

    let bodyHtml = p.description;
    if (p.image) {
      bodyHtml += `<br><br><img src="${p.image}" alt="${p.title}" style="width: 100%; max-width: 600px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">`;
    }
    if (p.repo) {
      bodyHtml += `<br><br><a href="${p.repo}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 8px 16px; background: var(--accent); color: #000; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px; margin-bottom: 8px;">View Project</a>`;
    }
    emailBody.innerHTML = bodyHtml;
  }

  // Close button - navigate to menu
  closeBtn.addEventListener("click", function() {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "0";
    setTimeout(function() {
      window.location.href = "menu.html";
    }, 550);
  });

  // Select first project by default
  setTimeout(() => selectProject(0), 100);
});
document.addEventListener("DOMContentLoaded", function() {
  const bootScreen = document.getElementById("bootScreen");
  const bootProgress = document.getElementById("bootProgress");
  const workLogApp = document.getElementById("workLogApp");
  const appWindow = document.getElementById("appWindow");
  const closeWindow = document.getElementById("closeWindow");
  const noteListView = document.getElementById("noteListView");
  const noteDetail = document.getElementById("noteDetail");
  const noteDetailTitle = document.getElementById("noteDetailTitle");
  const noteDetailBody = document.getElementById("noteDetailBody");
  const backToNotes = document.getElementById("backToNotes");
  const powerBtn = document.getElementById("powerBtn");

  const notes = [
    {
      title: "Sturge-Weber Foundation",
      body: `ROLE: Software Engineer\n\n- Engineered a native iOS version of an existing Android medical application using Xcode and Swift, ensuring full feature parity for pediatric neurology care.\n- Refactored and enhanced the original Android application using Android Studio (Java/XML), integrating new features and UI overhauls to achieve production-grade readiness.\n- Advanced the app into rigorous testing phases using GitHub CI pipelines and JUnit, which cleared beta testing and positioned the product for public launch\n\nLink to App Demo:\nhttps://drive.google.com/file/d/1oYhvGmcEgGFY7hR3xtdvG7oPSgpbHZFH/view`,
      image: 'images/swf-event.png'
    },
    {
      title: "Cloud Space Co",
      body: `ROLE: Data Engineer Intern\n\n- Built and maintained ETL workflows and SQL queries in BigQuery on Google Cloud Platform, using Bash scripts and GitHub for version control, which streamlined data pipelines and enabled timely analytics reporting \n- Developed a proof-of-concept AI chatbot with Vertex AI and AgentSpace, integrating it into client demo environments, which showcased automation capabilities and secured interest for further development\n- Assisted in organizing and transforming client datasets using SQL and Bash scripts on Google Cloud Platform, preparing them for cloud analytics and reporting systems, which improved data readiness for downstream analysis\n\nChatbot Link:\nhttps://github.com/chiewthejared/cloudspace/blob/main/chatbot.py`,
      image: 'images/cloudspace.jpg'
    }
  ];

  function linkifyText(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #ff8800; text-decoration: underline; word-break: break-all;">${url}</a>`;
    });
  }

  let progress = 0;
  const bootDuration = 4000;
  const startTime = Date.now();

  function updateBoot() {
    const elapsed = Date.now() - startTime;
    progress = Math.min(elapsed / bootDuration, 1);
    bootProgress.style.width = (progress * 100) + "%";

    if (progress < 1) {
      requestAnimationFrame(updateBoot);
    } else {
      setTimeout(function() {
        bootScreen.classList.add("hidden");
      }, 400);
    }
  }

  updateBoot();

  workLogApp.addEventListener("click", function() {
    appWindow.classList.add("open");
    noteListView.classList.remove("hidden");
    noteDetail.classList.remove("open");
  });

  closeWindow.addEventListener("click", function() {
    appWindow.classList.remove("open");
  });

  document.querySelectorAll(".note-item").forEach(function(item) {
    item.addEventListener("click", function() {
      const index = parseInt(this.dataset.note);
      const note = notes[index];
      noteDetailTitle.textContent = note.title;
      
      let bodyHtml = linkifyText(note.body);
      if (note.image) {
        bodyHtml += `<br><br><img src="${note.image}" alt="${note.title}" style="width: 100%; max-width: 600px; border-radius: 8px; margin-top: 8px; border: 1px solid #333;">`;
      }
      noteDetailBody.innerHTML = bodyHtml;
      
      noteListView.classList.add("hidden");
      noteDetail.classList.add("open");
    });
  });

  backToNotes.addEventListener("click", function() {
    noteDetail.classList.remove("open");
    noteListView.classList.remove("hidden");
  });

  powerBtn.addEventListener("click", function() {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "0";
    setTimeout(function() {
      window.location.href = "menu.html";
    }, 550);
  });
});
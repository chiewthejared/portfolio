document.addEventListener("DOMContentLoaded", function() {
    var nameEl = document.getElementById("charName");
    var titleEl = document.getElementById("charTitle");
    var exp1El = document.getElementById("exp1");
    var exp2El = document.getElementById("exp2");
    var descEl = document.getElementById("charDesc");
    var extraEl = document.getElementById("charExtra");
    var continueBtn = document.getElementById("continueBtn");

    // Set all text immediately with proper formatting
    nameEl.textContent = "Jared Chiew";
    titleEl.textContent = "B.S Computer Science '26";
    exp1El.innerHTML = 'Former Software Engineer @ <a href="https://www.linkedin.com/company/the-sturge-weber-foundation/" target="_blank" rel="noopener noreferrer" class="highlight-gold" style="text-decoration: none;">Sturge-Weber Foundation</a>';
    exp2El.innerHTML = 'Former Data Engineer Intern @ <a href="https://www.linkedin.com/company/cloud-space-co/" target="_blank" rel="noopener noreferrer" class="highlight-blue" style="text-decoration: none;">Cloud Space</a>';
    descEl.textContent = "Experienced in designing ETL pipelines within BigQuery and developing interactive Power BI dashboards for complex, real-world datasets. Proficient across Python, Java, JavaScript, Swift, SQL, and GCP services. Eager to leverage this full-stack and data engineering expertise to build innovative, impactful software solutions. Seeking Software Engineering, Data Engineering or Data Analyst roles.";

    // Set extra sections with proper formatting
    extraEl.innerHTML = 
        "<br><span class=\"skill-category\">Languages:</span> Python, Java, JavaScript, SQL, C/C++, Bash, Swift<br>" +
        "<span class=\"skill-category\">Software Development:</span> Git, GitHub, Linux/Unix, HTML/CSS, Android Studio<br>" +
        "<span class=\"skill-category\">Cloud & AI:</span> Google Cloud Platform (BigQuery, Compute Engine, Cloud Storage), Vertex AI, AgentSpace<br>" +
        "<span class=\"skill-category\">Databases:</span> PostgreSQL, BigQuery<br>" +
        "<span class=\"skill-category\">Tools:</span> Jupyter Notebook, Power BI, BigQuery, PostgreSQL, R, ggplot2, plotly, dplyr" +
        "<br><br><span class=\"highlight-school\">Arizona State University (ASU) 2023 - 2026</span><br>" +
        "B.S, Computer Science Tempe, Arizona, USA<br>" +
        "• GPA: 3.56<br>" +
        "• Achievements: Dean's List for 2026 Spring, 2025 Fall, 2024 Fall and 2023 Fall Semesters" +
        "<br><br>ASU Badminton Club 2023 - Present<br>" +
        "• 4-8th place (Quarter-finals) in Birdies' Cup (2023 Fall)<br>" +
        "American University Program, INTI College | President 2022 - 2023<br>" +
        "• Led and organized INTI's first in-campus event (July 4th Barbeque) and first off-campus event (Homecoming Night) following the COVID-19 pandemic";

    // Show continue button immediately
    continueBtn.classList.add("visible");

    continueBtn.addEventListener("click", function() {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "0";
        setTimeout(function() {
            window.location.href = "menu.html";
        }, 550);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var nameEl = document.getElementById("charName");
    var titleEl = document.getElementById("charTitle");
    var exp1El = document.getElementById("exp1");
    var exp2El = document.getElementById("exp2");
    var descEl = document.getElementById("charDesc");
    var continueBtn = document.getElementById("continueBtn");

    var lines = [
        { el: nameEl, text: "Jared Chiew", speed: 25 },
        { el: titleEl, text: "B.S Computer Science '26", speed: 20 },
        { el: exp1El, text: "Former Software Engineer @ Sturge-Weber Foundation", speed: 20, post: function() { exp1El.innerHTML = 'Former Software Engineer @ <a href="https://www.linkedin.com/company/the-sturge-weber-foundation/" target="_blank" rel="noopener noreferrer" class="highlight-gold" style="text-decoration: none;">Sturge-Weber Foundation</a>'; } },
        { el: exp2El, text: "Former Data Engineer Intern @ Cloud Space", speed: 20, post: function() { exp2El.innerHTML = 'Former Data Engineer Intern @ <a href="https://www.linkedin.com/company/cloud-space-co/" target="_blank" rel="noopener noreferrer" class="highlight-blue" style="text-decoration: none;">Cloud Space</a>'; } },
        { el: descEl, text: "Experienced in designing ETL pipelines within BigQuery and developing interactive Power BI dashboards for complex, real-world datasets. Proficient across Python, Java, JavaScript, Swift, SQL, and GCP services. Eager to leverage this full-stack and data engineering expertise to build innovative, impactful software solutions. Seeking Software Engineering, Data Engineering or Data Analyst roles.", speed: 12 }
    ];

    function typeLine(el, text, speed, post, callback) {
        var i = 0;
        el.textContent = "";
        function typeChar() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed + Math.random() * 10);
            } else {
                if (post) post();
                if (callback) callback();
            }
        }
        typeChar();
    }

    function startTyping(index) {
        if (index >= lines.length) {
            continueBtn.classList.add("visible");
            return;
        }
        var line = lines[index];
        typeLine(line.el, line.text, line.speed, line.post || null, function() {
            startTyping(index + 1);
        });
    }

    startTyping(0);

    continueBtn.addEventListener("click", function() {
        document.body.style.transition = "opacity 0.5s ease";
        document.body.style.opacity = "0";
        setTimeout(function() {
            window.location.href = "menu.html";
        }, 550);
    });
});
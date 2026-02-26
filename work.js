const entries = [
  {
    id: "swf-app",
    title: "STURGE-WEBER FOUNDATION",
    date: "AUG 2025 - PRESENT",
    body:
`ROLE: ANDROID APP DEVELOPER (PART-TIME, REMOTE)

- BUILT ANDROID APP WITH JAVAFX AND XML USING ANDROID STUDIO
- IMPLEMENTED FRONT-END & BACK-END FEATURES
- FINAL YEAR PROJECT FOR B.S COMPUTER SCIENCE (ASU)

REPO TO APP:
github.com/chiewthejared/androidcapstone`
  },
  {
    id: "cloud-space",
    title: "CLOUD SPACE CO",
    date: "JUNE 2025 - AUG 2025",
    body:
`ROLE: DATA WAREHOUSE ENGINEER INTERN (FULL-TIME, HYBRID)

- GOOGLE CLOUD PREMIER PARTNER + 2025 GOOGLE CLOUD PARTNER OF THE YEAR - MALAYSIA
- MANAGED DATA WAREHOUSING PROCESS OF CLIENTS USING GCP (BIGQUERY, GOOGLE DRIVE)
- PRODUCED A BASIC CHATBOT USING VERTEX AI AND GOOGLE AGENTSPACE

REPO TO CHATBOT:
github.com/chiewthejared/cloudspace/blob/main/chatbot.py`
  }
];

const logsUl = document.getElementById('logs');
const entryContent = document.getElementById('entryContent');
const entryTitle = document.getElementById('entryTitle');
const entryMeta = document.getElementById('entryMeta');
const entryBody = document.getElementById('entryBody');
const backButton = document.getElementById('backButton');
const placeholder = document.getElementById('placeholder');

function renderLogs(){
  logsUl.innerHTML = '';

  entries.forEach(e=>{
    const li = document.createElement('li');
    li.className = 'log-item';
    li.innerHTML = `
      <div class="log-title">${e.title}</div>
      <div class="log-time">${e.date}</div>
    `;
    li.onclick = ()=> openEntry(e);
    logsUl.appendChild(li);
  });
}

function openEntry(entry){
  placeholder.hidden = true;
  entryContent.hidden = false;

  entryTitle.textContent = entry.title;
  entryMeta.textContent = entry.date;
  entryBody.textContent = '';

  typeText(entry.body, entryBody, 18);
}

function typeText(text, el, speed){
  let i = 0;
  let buffer = "";

  function type(){
    if(i < text.length){
      buffer += text.charAt(i);
      el.textContent = buffer;
      i++;
      setTimeout(type, speed);
    } else {
      convertLinks(el);
      addCaret(el);
    }
  }
  type();
}

function convertLinks(el){
  const urlRegex = /(https?:\/\/[^\s]+|github\.com\/[^\s]+)/g;

  let html = el.innerHTML;

  html = html.replace(urlRegex, (url) => {
    let fullUrl = url.startsWith("http") ? url : "https://" + url;
    return `<a href="${fullUrl}" target="_blank" class="terminal-link">${url}</a>`;
  });

  el.innerHTML = html;
}

function addCaret(el){
  const caret = document.createElement('span');
  caret.className = 'caret';
  el.appendChild(caret);
}

backButton.onclick = ()=>{
  entryContent.hidden = true;
  placeholder.hidden = false;
  entryBody.textContent = '';
};

renderLogs();

/* ----------------------------
   Continue button behavior
   (copied from projects.js so it matches your other pages)
   ---------------------------- */
const continueBtn = document.getElementById('continueBtn');
if (continueBtn) {
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
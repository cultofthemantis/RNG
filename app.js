let people = [];
let history = [];


const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");

const fullName = document.getElementById("fullName");
const emails = document.getElementById("emails");
const historyList = document.getElementById("historyList");


fetch("people.json")
  .then(res => res.json())
  .then(data => {
    people = data;
    console.log("Loaded data:", people);
  })
  .catch(err => console.error("Error loading JSON:", err));


function getRandomPerson() {
  return people[Math.floor(Math.random() * people.length)];
}


//from google and ChatGPT
function renderHistory() {

  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = `<li class="empty">N/A</li>`;
    return;
  }

  history.slice(-5).forEach(person => {
    const li = document.createElement("li");
    li.textContent = `${person.first} ${person.last}`;
    historyList.appendChild(li);
  });
}


generateBtn.addEventListener("click", () => {
  if (people.length === 0) {
    fullName.textContent = "N/A";
    emails.textContent = "";
    return;
  }

  const person = getRandomPerson();
  const name = `${person.first} ${person.last}`;

  fullName.textContent = name;

  const emailBlock = [];
  if (person.email) emailBlock.push(`CodeStack: ${person.email}`);
  if (person.personal) emailBlock.push(`Personal: ${person.personal}`);

  emails.innerHTML = emailBlock.join("<br>");

  history.push(person);
  if (history.length > 5) history = history.slice(-5);

  renderHistory();
});

clearBtn.addEventListener("click", () => {
  history = [];
  renderHistory();

  fullName.textContent = "No person selected yet";
  emails.textContent = "Press \"Generate Person\" to begin.";
});
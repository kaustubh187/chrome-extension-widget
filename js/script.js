var pomodoroClock = {
  started: false,
  minutes: 0,
  seconds: 0,
  sessionLength: 25,
  breakLength: 5,
  interval: null,
  isBreak: false,

  init: function() {
      this.minutesDom = document.getElementById("minutes");
      this.secondsDom = document.getElementById("seconds");
      this.fillDom = document.getElementById("filler");
      this.sessionDOM = document.getElementById("session-time");
      this.breakDOM = document.getElementById("break-time");

      this.updateUI();

      document.getElementById("start").addEventListener("click", () => this.startCount());
      document.getElementById("stop").addEventListener("click", () => this.stopCount());
      document.querySelectorAll(".time-adjust").forEach(button => {
          button.addEventListener("click", (event) => this.adjustTime(event));
      });
  },

  resetVariables: function(mins, secs, started, isBreak) {
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.isBreak = isBreak;
      this.fillerIncrement = 100 / (mins * 60);
      this.fillerHeight = 0;
      this.updateUI();
  },

  startCount: function() {
      if (this.started) return;
      this.resetVariables(this.isBreak ? this.breakLength : this.sessionLength, 0, true, this.isBreak);
      this.interval = setInterval(() => this.intervalFunction(), 1000);
  },

  stopCount: function() {
      clearInterval(this.interval);
      this.resetVariables(0, 0, false, false);
      this.fillDom.style.width = '0%';
  },

  intervalFunction: function() {
      if (!this.started) return;

      if (this.seconds === 0) {
          if (this.minutes === 0) {
              this.timerDone();
              return;
          }
          this.seconds = 59;
          this.minutes--;
      } else {
          this.seconds--;
      }
      this.fillerHeight += this.fillerIncrement;
      this.updateUI();
  },

  adjustTime: function(event) {
      if (event.target.id === "sesh-plus") {
          this.sessionLength++;
      } else if (event.target.id === "sesh-minus") {
          this.sessionLength = Math.max(1, this.sessionLength - 1);
      } else if (event.target.id === "break-plus") {
          this.breakLength++;
      } else if (event.target.id === "break-minus") {
          this.breakLength = Math.max(1, this.breakLength - 1);
      }
      this.updateUI();
  },

  timerDone: function() {
      clearInterval(this.interval);
      this.started = false;
      this.isBreak = !this.isBreak;
      this.fillDom.style.width = '0%';
      this.startCount();
  },

  updateUI: function() {
      this.minutesDom.innerText = this.numberFormat(this.minutes);
      this.secondsDom.innerText = this.numberFormat(this.seconds);
      this.sessionDOM.innerText = this.sessionLength + " min";
      this.breakDOM.innerText = this.breakLength + " min";
      this.fillDom.style.width = this.fillerHeight + '%';

      if (this.isBreak) {
          document.querySelector(".clock-box").classList.add("break-active");
      } else {
          document.querySelector(".clock-box").classList.remove("break-active");
      }
  },

  numberFormat: function(num) {
      return num < 10 ? "0" + num : num;
  }
};

window.onload = function() {
  pomodoroClock.init();
};

  function updateTime() {
    const now = new Date();
    const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    // Get month name (0-indexed)
    const month = months[now.getMonth()];
  
    // Format date with day, month name (full name), and year
    const formattedDate = `${days[day]}, ${month} ${now.getDate()}, ${now.getFullYear()}`;
    
    // Format time (hh:mm:ss) with leading zeros for hours < 10
    const formattedTime = now.getHours().toString().padStart(2, '0') + ":" + 
                          now.getMinutes().toString().padStart(2, '0');
    
    const outputTime = `<span style="font-size: 4em;">${formattedTime}</span>`; // Set larger font size for time
    const outputDate = formattedDate;
    
    document.getElementById("time").innerHTML = outputTime;
    document.getElementById("date-info").innerHTML = outputDate;
  }
  updateTime();
  setInterval(updateTime, 1000);


  // Sample data - this would typically come from a database or API
const quotes = [
  {
      title: "To Kill a Mockingbird",
      quote: "Until I feared I would lose it, I never loved to read. One does not love breathing.",
      reader: "Harper Lee"
  },
  {
      title: "1984",
      quote: "Big Brother is Watching You.",
      reader: "George Orwell"
  },
  {
      title: "Pride and Prejudice",
      quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      reader: "Jane Austen"
  }
  // Add more quotes as needed
];

function updateBookQuoteWidget() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  document.getElementById('book-title').innerText = "Book: " + selectedQuote.title;
  document.getElementById('book-quote').innerText = selectedQuote.quote;
  document.getElementById('reader-info').innerText = "Read by: " + selectedQuote.reader;
}

// Update the quote every 5 seconds
setInterval(updateBookQuoteWidget, 5000);

// Initial call to display the first quote
updateBookQuoteWidget();

// Sample data - could be loaded from a server or local storage
let tasks = [
  { task: "Read 20 pages of a book", completed: false },
  { task: "Exercise for 30 minutes", completed: false }
];


function renderTasks() {
  const list = document.getElementById('dgc-list');
  list.innerHTML = ''; // Clear the list
  tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
          <span class="${task.completed ? 'completed' : ''}">${task.task}</span>
          <button onclick="removeTask(${index})">Remove</button>
      `;
      list.appendChild(li);
  });
}

function addTask() {
  const newTaskInput = document.getElementById('new-task-input');
  const taskText = newTaskInput.value.trim();
  if (taskText) {
      tasks.push({ task: taskText, completed: false });
      newTaskInput.value = '';
      renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Initial render
renderTasks();


function updateAnnouncements() {
  const announcements = [
    "New product launch on the horizon!",
    "Customer experience enhancement project underway.",
    "Data-driven decision making is our focus.",
    "Talent acquisition strategy review in progress.",
    "Committed to sustainability goals.",
    "Embarking on a digital transformation journey.",
    "Expanding employee well-being programs."
  ];

  const scrollingText = document.getElementById('scrolling-text');
  scrollingText.innerHTML = ''; // Clear existing content

  announcements.forEach(announcement => {
      const div = document.createElement('div');
      div.className = 'announcement';
      div.textContent = announcement;
      scrollingText.appendChild(div);
  });
}
// Call the function to update the announcements on page load
updateAnnouncements();


function joinMeet() {
    const meetCode = document.getElementById('gmeet-code').value.trim();
    if (meetCode) {
        window.open(`https://meet.google.com/${meetCode}`, '_blank');
    } else {
        alert('Please enter a valid Meet code.');
    }
}

// Sample opportunities data (this can be replaced with actual data from a server)
const opportunities = [
  { description: "Create an in-house tool to replace a paid marketing tool." },
  { description: "Automate repetitive tasks in the customer support team." },
  { description: "Develop a dashboard for real-time analytics for the sales team." },
];

// Function to render the opportunity board
function renderOpportunityBoard() {
  const board = document.getElementById('opportunity-board');
  board.innerHTML = ''; // Clear existing entries

  opportunities.forEach((opportunity, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = opportunity.description;
      board.appendChild(listItem);
  });
}

// Function to submit a new opportunity
function submitOpportunity() {
  const description = document.getElementById('opportunity-description').value.trim();
  if (description) {
      opportunities.push({ description });
      document.getElementById('opportunity-description').value = ''; // Clear input
      renderOpportunityBoard(); // Update the board
  } else {
      alert('Please enter a description for the opportunity.');
  }
}

// Initial render
renderOpportunityBoard();

  
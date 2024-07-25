var pomodoroClock = {
    // set variables
    started: false,
    minutes: 0,
    seconds: 0,
    sessionLength: 25,
    sessionDOM: null,
    breakLength: 5,
    breakDOM: null,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillDom: null,
    runs: 1,
    
  
    // initialize variables, set event listeners, start interval counter function.
    init: function() {
      var self = this;
  
      this.minutesDom = document.querySelector("#minutes");
      this.secondsDom = document.querySelector("#seconds");
      this.fillDom = document.querySelector("#filler");
      this.sessionDOM = document.querySelector("#session-time");
      this.breakDOM = document.querySelector("#break-time");
      this.interval = setInterval(function() {
        self.intervalFunction.apply(self);
      }, 1000);
  
      document.querySelector("#start").addEventListener("click", function() {
        self.startCount.apply(self);
      });
      document.querySelector("#stop").addEventListener("click", function() {
        self.stopCount.apply(self);
      });
      document.querySelectorAll(".time-adjust").forEach(function(e) {
        e.addEventListener("click", function() {
          if (this.id === "sesh-plus") {
            self.sessionLength++;
          }
          if (this.id === "sesh-minus") {
            self.sessionLength--;
          }
          if (this.id === "break-minus") {
            self.breakLength--;
          }
          if (this.id === "break-plus") {
            self.breakLength++;
          }
          self.adjustValue.apply(self);
        });
      });
    },
  
    // functions for our program
    resetVariables: function(mins, secs, started) {
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200 / (this.minutes * 60);
      this.fillerHeight = 0;
      this.updateUI();
    },
  
    startCount: function() {
      this.resetVariables(this.sessionLength, this.seconds, true);
      this.startAudio.play();
    },
  
    stopCount: function() {
      this.resetVariables(0, 0, false);
      this.updateUI();
    },
  // for the timer. runs every second
    intervalFunction: function() {
      if (!this.started) return false;
      if (this.seconds == 0) {
        if (this.minutes == 0) {
          this.timerDone();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateUI();
    },
  
    numberFormat: function(num) {
      if (num < 10) {
        return "0" + parseInt(num, 10);
      } else return num;
    },
  
    timerDone: function() {
      this.runs++;
      this.endAudio.play();
      if (this.runs === 2 || this.runs === 4) {
        this.resetVariables(this.breakLength, 0, true);
      } else if (this.runs === 3 || this.runs === 5) {
        this.resetVariables(this.sessionLength, 0, true);
      } else {
        this.resetVariables(this.breakLength, 0, false);
      }
  
      //  console.log(this.runs);
    },
  
    updateUI: function() {
      this.minutesDom.innerHTML = this.numberFormat(this.minutes);
      this.secondsDom.innerHTML = this.numberFormat(this.seconds);
      this.sessionDOM.innerHTML = this.sessionLength + " min";
      this.breakDOM.innerHTML = this.breakLength + " min";
      this.fillerHeight += this.fillerIncrement;
      if (this.started == true) {
        this.fillDom.style.height = this.fillerHeight + "px";
      } else {
        this.fillDom.style.height = 0 + "px";
      }
    },
  
    adjustValue: function() {
      if (!this.sessionLength > 0) {
        this.sessionLength = 1;
      }
      if (!this.breakLength > 0) {
        this.breakLength = 1;
      } else {
        this.updateUI();
      }
  
      // console.log(this.sessionLength);
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
      "Welcome to the Daily Growth Checklist!",
      "Check out our new features!",
      "Stay updated with the latest announcements."
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

  
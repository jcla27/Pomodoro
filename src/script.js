//Smooth Scroll
window.addEventListener('DOMContentLoaded', function() {
    var navItems = document.querySelectorAll('.navbar ul li a');
  
    for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener('click', smoothScroll);
    }
  
    function smoothScroll(event) {
      event.preventDefault();
  
      var targetId = this.getAttribute('href');
      var targetElement = document.querySelector(targetId);
      var targetPosition = targetElement.offsetTop;
      var startPosition = window.pageYOffset;
      var distance = targetPosition - startPosition;
      var duration = 1000;
      var start = null;
  
    function animation(currentTime) {
        if (start === null) start = currentTime;
        var timeElapsed = currentTime - start;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
  
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
    }
});

//Settings
let menu = document.getElementById("settings");
let menuicon = document.getElementById("menuicon");

menuicon.onclick = function(){
    settings.classList.toggle("open");
    if(settings.classList.contains("open")){
        menuicon.src = "close.PNG";
    }else{
        menuicon.src = "menu.png";
    }
}

//Select background image
window.addEventListener('DOMContentLoaded', function() {
    var optionElements = document.getElementsByClassName('option');
    var bannerSection = document.getElementById('banner');
    var timerSection = document.getElementById('timer-section');
    var todoSection = document.getElementById('todo-section');

    // Define the mapping of background options to corresponding images
    var backgroundImages = {
        'background/1.png': {
            banner: 'background/1.png',
            todo: 'background/12.png',
            timer: 'background/1.png'
        },
        'background/2.JPG': {
            banner: 'background/2.JPG',
            todo: 'background/22.png',
            timer: 'background/21.png'
        },
        'background/3.JPG': {
            banner: 'background/3.JPG',
            todo: 'background/31.png',
            timer: 'background/32.png'
        },
        'background/4.JPG': {
            banner: 'background/41.jpg',
            todo: 'background/42.jpg',
            timer: 'background/43.jpg'
        },
        'background/5.JPG': {
            banner: 'background/51.JPG',
            todo: 'background/52.JPG',
            timer: 'background/53.JPG'
        },
        'background/6.JPG': {
            banner: 'background/61.JPG',
            todo: 'background/62.JPG',
            timer: 'background/63.JPG'
        },
    };

    for (var i = 0; i < optionElements.length; i++) {
        optionElements[i].addEventListener('click', function() {
            var selectedValue = this.getAttribute('src');

            // Retrieve the corresponding images for the selected background option
            var selectedImages = backgroundImages[selectedValue];

            // Set background image for each section
            bannerSection.style.backgroundImage = 'url(' + selectedImages.banner + ')';
            todoSection.style.backgroundImage = 'url(' + selectedImages.todo + ')';
            timerSection.style.backgroundImage = 'url(' + selectedImages.timer + ')';
        });
    }
});

//timer
const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeSelect = document.getElementById('mode');

const durations = {
  pomodoro: 25 * 60, // 25 minutes
  shortBreak: 1 * 10, // 5 minutes
  longBreak: 15 * 60 // 15 minutes
};

let timerInterval;
let remainingTime = durations[modeSelect.value];

playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeSelect.addEventListener('change', handleModeChange);

updateTimerDisplay();

function startTimer() {
    const startTime = Date.now();
    const futureTime = startTime + (remainingTime * 1000);

    timerInterval = setInterval(updateTimer, 1000);

    playButton.disabled = true;
    pauseButton.disabled = false;
    modeSelect.disabled = true;
}

function pauseTimer() {
    clearInterval(timerInterval);

    playButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = durations[modeSelect.value];
    updateTimerDisplay();
    resetSemicirclesRotation();
    resetColor();

    playButton.disabled = false;
    pauseButton.disabled = true;
    modeSelect.disabled = false;
}

function handleModeChange() {
    if (!playButton.disabled) {
        remainingTime = durations[modeSelect.value];
        updateTimerDisplay();
    }
}

function resetSemicirclesRotation() {
    for (let i = 0; i < semicircles.length; i++) {
        semicircles[i].style.display = 'block';
        semicircles[i].style.transform = 'rotate(0deg)';
    }
}
function resetColor() {
    for (let i = 0; i < semicircles.length; i++) {
        semicircles[i].style.backgroundColor = ''; // Reset background color
    }
    timer.style.color = ''; // Reset timer color
}

function updateTimer() {
    remainingTime--;

    if (remainingTime < 0) {
        clearInterval(timerInterval);
        playButton.disabled = false;
        pauseButton.disabled = true;
        modeSelect.disabled = false;

        semicircles[0].style.display = 'none';
        semicircles[1].style.display = 'none';
        semicircles[2].style.display = 'none';

        timer.innerHTML = `
        <div>00</div>
        <div>:</div>
        <div>00</div>
        `;

        timer.style.color = "lightgray";

        // Play the alarm sound
        const alarmSound = document.getElementById('alarmSound');
        alarmSound.play();
        }

    //5sec condition
    if(remainingTime <= 5){
        semicircles[0].style.backgroundColor = "#ce796b";
        semicircles[1].style.backgroundColor = "#ce796b";
        timer.style.color = "#ce796b";
    }    

    updateTimerDisplay();
}

function updateTimerDisplay() {
  const mins = Math.floor((remainingTime / 60) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const secs = Math.floor(remainingTime % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

  const angle = (remainingTime / durations[modeSelect.value]) * 360;

  if (angle > 180) {
    semicircles[2].style.display = 'none';
    semicircles[0].style.transform = 'rotate(180deg)';
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  } else {
    semicircles[2].style.display = 'block';
    semicircles[0].style.transform = `rotate(${angle}deg)`;
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  }

  if (remainingTime <= 0) {
    mins = '00';
    secs = '00';
  }

  timer.innerHTML = `
    <div>${mins}</div>
    <div>:</div>
    <div>${secs}</div>
  `;
}
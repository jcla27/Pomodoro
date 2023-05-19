let menu = document.getElementById("menu");
let menuicon = document.getElementById("menuicon");

menuicon.onclick = function(){
    menu.classList.toggle("open");
    if(menu.classList.contains("open")){
        menuicon.src = "close.png";
    }else{
        menuicon.src = "menu.png";
    }
}

/*To-Do Section*/
document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    var addButton = document.getElementById('add-btn');
    var todoInput = document.getElementById('todo-input');
    var taskList = document.getElementById('task-list');

    // Add task function
    function addTask() {
        var taskName = todoInput.value;
        if (taskName.trim() === '') {
            return; // Ignore empty tasks
        }

        // Create new list item
        var newTask = document.createElement('li');
        var label = document.createElement('label');
        var checkbox = document.createElement('input');
        var taskText = document.createElement('p');
        var span = document.createElement('span');

        checkbox.setAttribute('type', 'checkbox');
        checkbox.addEventListener('change', toggleTask); 

        taskText.textContent = taskName;

        label.appendChild(checkbox);
        label.appendChild(taskText);
        label.appendChild(span);
        newTask.appendChild(label);
        
        taskList.appendChild(newTask);

        // Create cancel button
        var cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-button';
        cancelButton.textContent = 'X';
        cancelButton.addEventListener('click', cancelTask);
        newTask.appendChild(cancelButton);

        if (checkbox.checked) {
            taskList.appendChild(newTask);
        } else {
            // Find the first checked task
            var firstCheckedTask = taskList.querySelector('.completed');
            if (firstCheckedTask) {
                // Insert the new task before the first checked task
                taskList.insertBefore(newTask, firstCheckedTask);
            } else {
                // No checked tasks found, append the new task at the bottom
                taskList.appendChild(newTask);
            }
        }

        todoInput.value = '';
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', taskList.innerHTML);
    }

    // Add button click event listener
    addButton.addEventListener('click', addTask);

    // Add task when pressing Enter key
    todoInput.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault(); // Prevent form submission
            addTask();
        }
    });

    function toggleTask(event) {
        var checkbox = event.target;
        var listItem = checkbox.closest('li');
        if (listItem) {
            listItem.classList.toggle('completed');
            var taskText = listItem.querySelector('p'); 
            taskText.classList.toggle('completed');
            if (checkbox.checked) {
                taskList.appendChild(listItem);
            }
        }
    }

    // Cancel task function
    function cancelTask(event) {
        var cancelButton = event.target;
        var listItem = cancelButton.closest('li');
        if (listItem) {
            listItem.remove();
        }
    }
});

/*timer section  */
const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');

const min = 0;
const sec = 10;

const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = minutes + seconds;
const startTime = Date.now();
const futureTime = startTime + setTime;

const timerLoop = setInterval(countdown);
countdown();

function countdown(){
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime/setTime)*360;

    if(angle>180){
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }else{
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    //timer
    const mins = Math.floor((remainingTime/(1000*60))%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const secs = Math.floor((remainingTime/1000)%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});;

    timer.innerHTML = `
    <div>${mins}</div>
    <div>:</div>
    <div>${secs}</div>
    `;

    //5sec condition
    if(remainingTime <= 6000){
        semicircles[0].style.backgroundColor = "#ce796b";
        semicircles[1].style.backgroundColor = "#ce796b";
        timer.style.color = "#ce796b";
    }    

    //end
    if(remainingTime<0){
        clearInterval(timerLoop);
        semicircles[0].style.display = 'none';
        semicircles[1].style.display = 'none';
        semicircles[2].style.display = 'none';

        timer.innerHTML = `
        <div>00</div>
        <div>:</div>
        <div>00</div>
        `;

        timer.style.color = "lightgray";
    }
}

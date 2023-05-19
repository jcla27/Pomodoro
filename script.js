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
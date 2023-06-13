<?php 
require 'db_conn.php';
/* require 'database.php'; */
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pomodoro</title>
    <link rel="stylesheet" href="style3.css">
    <meta name="viewport" content="width=device-width", initial-scale="1"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
<header>
    <img src="menu.png" id="menuicon">
    <audio id="alarmSound" src="sound.mp3"></audio>

    <div class="navbar">
        <ul>
            <li><a href="#banner">Home</a></li>
            <li><a href="#todo-section">To-Do List</a></li>
            <li><a href="#timer-section">Timer</a></li>
            <?php
session_start();
if (isset($_SESSION["user"])) {
    // User is logged in
    echo '
    <form action="logout.php" method="post">
        <input type="submit" value="Logout">
    </form>';
} else {
    // User is logged out
    echo '
    <form action="login.php" method="post">
        <input type="submit" value="Login">
    </form>';
}
?>  
        </ul>
    </div>

    <div class="settingbox" id="settings">
        <div class="label-container">
            <label for="backgroundSelect">Select a background image</label>
        </div>
            <div id="imageOptions">
                <img src="background/1.png" alt="Background 1" class="option">
                <img src="background/2.JPG" alt="Background 2" class="option">
                <img src="background/3.JPG" alt="Background 3" class="option">
                <img value="BG1" src="background/4.JPG" alt="Background 4" class="option">
                <img src="background/5.JPG" alt="Background 5" class="option">
                <img src="background/6.JPG" alt="Background 6" class="option">
            </div>
    </div>
</header>

<section id="banner">
<div class="content">
    <h1>Pomodoro</h1>
    <p2><a href="registration.php" style="text-decoration: none;">Create an account</a></p2>
</div>
</section>

<section id="todo-section">
    <div class="main-section">
        <div class="add-section">
            <form action="app/add.php" method="POST" autocomplete="off">
            <?php if(isset($_GET['mess']) && $_GET['mess'] == 'error'){ ?>
                <input type="text" 
                     name="title" 
                     style="border-color: #ff6666"
                     placeholder="This field is required" />
                <button type="submit">Add &nbsp; <span>&#43;</span></button>

            <?php }else{ ?>
                <input type="text" 
                     name="title" 
                     placeholder="Enter your task here?" />
                <button type="submit">Add &nbsp; <span>&#43;</span></button>
            <?php } ?>
            </form>
        </div>
        <?php 
        session_start();
        $UserID = $_SESSION['id'];
        $sql = "SELECT * FROM todos WHERE user_id = $UserID";
        $todos = $conn->query("SELECT * FROM todos WHERE user_id = $UserID ORDER BY task_id DESC");
        ?>
        <div class="show-todo-section">
            <?php
            while($todo = $todos->fetch(PDO::FETCH_ASSOC)) { ?>
                <div class="todo-item">
                    <span id="<?php echo $todo['task_id']; ?>"
                          class="remove-to-do">x</span>
                    <?php if($todo['checked']){ ?> 
                        <input type="checkbox"
                               class="check-box"
                               data-todo-id ="<?php echo $todo['task_id']; ?>"
                               checked />
                        <h2 class="checked"><?php echo $todo['title'] ?></h2>
                    <?php }else { ?>
                        <input type="checkbox"
                               data-todo-id ="<?php echo $todo['task_id']; ?>"
                               class="check-box" />
                        <h2><?php echo $todo['title'] ?></h2>
                    <?php } ?>
                    <br>
                    <small>Created: <?php echo $todo['date_time'] ?></small> 
                </div>
            <?php } ?>
       </div>
    </div>
</section>

<section id="timer-section">
    <div class="mode-select">
        <label for="mode">Mode:</label>
        <select id="mode">
            <option value="pomodoro">Pomodoro</option>
            <option value="shortBreak">Short Break</option>
            <option value="longBreak">Long Break</option>
        </select>
    </div>
    <div class="container" center>
        <div class="circle">
            <div class="semicircle"></div>
            <div class="semicircle"></div>
            <div class="semicircle"></div>
            <div class="outercircle"></div>
        </div>

        <div class="timer-container">
            <div class="timer"></div>
        </div>
    </div>
    <div class="controls">
        <button id="play">Play</button>
        <button id="pause">Pause</button>
        <button id="reset">Reset</button>
    </div>
</section>

<script src="script.js"></script>
<script>
        $(document).ready(function(){
    $('.remove-to-do').click(function(){
        const clickedElement = $(this); // Store the reference to the clicked element
        const id = clickedElement.attr('id'); // Use 'id' instead of 'task_id'
        
        $.post("app/remove.php", 
            {
                task_id: id // Change 'id' to 'task_id' to match the PHP code
            },
            function(data) {
                if(data) {
                    clickedElement.parent().hide(600);
                }
            }
        );
    });

            $(".check-box").click(function (e) {
            const todoId = $(this).data('todo-id');
            const isChecked = $(this).prop('checked');

            $.post('app/check.php', {
            task_id: todoId,
            checked: isChecked ? 1 : 0
            }, function (data) {
                if (data !== 'error') {
                    const h2 = $(e.target).next('h2');
                if (isChecked) {
                    h2.addClass('checked');
                } else {
                    h2.removeClass('checked');
                }
                }
            });
        });
        });
    </script>

</body>
</html>
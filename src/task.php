<?php
    $taskName = filter_input(INPUT_POST, 'taskName');
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "login_register";

    $conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);
    if(mysqli_connect_error()){
        die('Connect Error ('. mysqli_connect_errno() .') '. mysqli_connect_error());
    }else{
        $sql = "INSERT INTO task (task_name) VALUES (?)";
        /* if($conn->query($sql)){
            echo "Task Saved";
        }else{
            echo "Error: ". $sql . $conn->error;
        }
        $conn->close(); */
        $stmt = mysqli_stmt_init($conn);
            $prepareStmt = mysqli_stmt_prepare($stmt,$sql);
            if ($prepareStmt) {
                mysqli_stmt_bind_param($stmt,"s",$taskName);
                mysqli_stmt_execute($stmt);
                echo "<div class='alert alert-success'>Task Saved.</div>";
            }else{
                die("Something went wrong");
            }
        }
?>
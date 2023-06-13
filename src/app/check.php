<?php

if(isset($_POST['task_id'])){
    require '../db_conn.php';

    $id = $_POST['task_id'];

    if(empty($id)){
       echo 'error';
    }else {
        $todos = $conn->prepare("SELECT task_id, checked FROM todos WHERE task_id=?");
        $todos->execute([$id]);

        $todo = $todos->fetch();
        $uId = $todo['task_id'];
        $checked = $todo['checked'];

        $uChecked = $checked ? 0 : 1;

        $res = $conn->query("UPDATE todos SET checked=$uChecked WHERE task_id=$uId");

        if($res){
            echo $checked;
        }else {
            echo "error";
        }
        $conn = null;
        exit();
    }
}else {
    header("Location: ../index.php?mess=error");
}
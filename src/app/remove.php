<?php

if(isset($_POST['task_id'])){
    require '../db_conn.php';

    $id = $_POST['task_id'];

    if(empty($id)){
       echo 0;
    }else {
        $stmt = $conn->prepare("DELETE FROM todos WHERE task_id=?");
        $res = $stmt->execute([$id]);

        if($res){
            echo 1;
        }else {
            echo 0;
        }
        $conn = null;
        exit();
    }
}else {
    header("Location: ../home.php?mess=error");
}
?>
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();

if (isset($_POST['title'])) {
    require '../database.php';

    $title = $_POST['title'];

    if (empty($title)) {
        header("Location: ../home.php?mess=error");
    } else {
        $stmt = $conn->prepare("INSERT INTO todos(user_id, title) VALUES(?, ?)");
        $UserID = $_SESSION['id'];
        $res = $stmt->execute([$UserID, $title]);

        if ($res) {
            header("Location: ../home.php?mess=success");
        } else {
            header("Location: ../home.php");
        }
        $conn = null;
        exit();
    }
} else {
    header("Location: ../home.php?mess=error");
}
?>
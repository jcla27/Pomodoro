<?php
session_start();
if (!isset($_SESSION["user"])) {
    header("Location: ../login.php");
    exit();
}

require_once "../database.php";

if (isset($_POST['title'])) {
    $title = $_POST['title'];
    $user_id = $_SESSION['id'];

    if (empty($title)) {
        header("Location: ../home.php?mess=error#todo-section"); // Redirect to todo section
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO todos (user_id, title) VALUES (?, ?)");
    $stmt->execute([$user_id, $title]);

    header("Location: ../home.php?mess=success#todo-section"); // Redirect to todo section
    exit();
} else {
    header("Location: ../home.php?mess=error");
    exit();
}
?>
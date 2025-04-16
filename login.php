<?php
session_start(); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); 

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$sql = "SELECT id, password, role FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    if (password_verify($password, $row['password'])) {
        $_SESSION['user_id'] = $row['id']; 
        $_SESSION['user_role'] = $row['role']; 
        $_SESSION['user_email'] = $email; 
        echo json_encode(array(
            "message" => "Login successful.",
            "user_id" => $row['id'],
            "role" => $row['role'],
            "email" => $email,
        ));
    } else {
        echo json_encode(array("message" => "Invalid password."));
    }
} else {
    echo json_encode(array("message" => "User not found."));
}

mysqli_close($conn);
?>
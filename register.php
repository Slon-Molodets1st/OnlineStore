<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

$phonenum = $data->phonenum;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (phonenum, email, password) VALUES ('$phonenum', '$email', '$password')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array("message" => "User registered successfully."));
} else {
    echo json_encode(array("message" => "Registration failed."));
}

mysqli_close($conn);
?>
<?php
$servername = "MySQL-8.0";
$username = "root";
$password = "";
$dbname = "cil";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
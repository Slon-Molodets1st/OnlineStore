<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'db_connect.php'; // Подключение к базе данных

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$description = $data->description;
$price = $data->price;
$image = $data->image;

$sql = "INSERT INTO products (name, description, price, image) 
        VALUES ('$name', '$description', '$price', '$image')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array("message" => "Товар успешно добавлен."));
} else {
    echo json_encode(array("message" => "Ошибка при добавлении товара: " . mysqli_error($conn)));
}

mysqli_close($conn);
?>
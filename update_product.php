<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$name = $data->name;
$description = $data->description;
$price = $data->price;
$image = $data->image;

$sql = "UPDATE products 
        SET name = '$name', description = '$description', price = '$price', image = '$image' 
        WHERE id = '$id'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array("message" => "Товар успешно обновлен."));
} else {
    echo json_encode(array("message" => "Ошибка при обновлении товара: " . mysqli_error($conn)));
}

mysqli_close($conn);
?>
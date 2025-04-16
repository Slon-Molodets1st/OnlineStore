<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;

$sql = "DELETE FROM products WHERE id = '$id'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array("message" => "Товар успешно удален."));
} else {
    echo json_encode(array("message" => "Ошибка при удалении товара: " . mysqli_error($conn)));
}

mysqli_close($conn);
?>
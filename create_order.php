<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Проверяем, авторизован ли пользователь
if (!isset($_SESSION['user_id'])) {
    echo json_encode(array("message" => "Пользователь не авторизован."));
    exit;
}

$userId = $_SESSION['user_id'];

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->product_name, $data->quantity, $data->price, $data->delivery_method, $data->payment_method)) {
    echo json_encode(array("message" => "Недостаточно данных для создания заказа."));
    exit;
}

$productName = $data->product_name;
$quantity = $data->quantity;
$price = $data->price;
$deliveryMethod = $data->delivery_method;
$paymentMethod = $data->payment_method;
$cardNumber = isset($data->card_number) ? $data->card_number : null;

$sql = "INSERT INTO orders (user_id, product_name, quantity, price, delivery_method, payment_method, card_number) 
        VALUES ('$userId', '$productName', '$quantity', '$price', '$deliveryMethod', '$paymentMethod', '$cardNumber')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array("message" => "Заказ успешно создан."));
} else {
    echo json_encode(array("message" => "Ошибка при создании заказа: " . mysqli_error($conn)));
}

mysqli_close($conn);
?>
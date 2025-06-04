<?php
// Отримати дані з POST
$city = $_POST['city'];
$street = $_POST['street'];
$payment = $_POST['payment'];
$delivery = $_POST['delivery'];

// Підготовка рядка для запису
$order = "Місто: $city | Вулиця: $street | Оплата: $payment | Отримання: $delivery\n";

// Збереження в файл
file_put_contents("orders.txt", $order, FILE_APPEND | LOCK_EX);

// Вивести сторінку-підтвердження
echo "<h1>Дякуємо за замовлення!</h1>";
echo "<p>Ваше замовлення прийнято.</p>";
?>

<?php
fwrite(STDOUT, "Введите первый аргумент:" . PHP_EOL);
$firstNumber = trim(fgets(STDIN));
fwrite(STDOUT, "Введите второй аргумент:" . PHP_EOL);
$secondNumber = trim(fgets(STDIN));
if (!is_numeric($firstNumber) || !is_numeric($secondNumber)) {
    fwrite(STDERR, "Пожалуйста введите число:" . PHP_EOL);
    $firstNumber = trim(fgets(STDIN));
    $secondNumber = trim(fgets(STDIN));
}
if ($secondNumber === 0) {
    fwrite(STDERR, "На ноль делить нельзя! Введите другое число:" . PHP_EOL);
    $secondNumber = trim(fgets(STDIN));
}
$result = $firstNumber / $secondNumber;
$fp = fopen('data.txt', 'w');
      fwrite($fp, 'Результат деления: ' . $result);
      fclose($fp);
fwrite(STDOUT, 'Результат деления: ' . $result);




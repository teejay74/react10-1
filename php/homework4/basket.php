<?php
declare(strict_types=1);
const OPERATION_EXIT = 0;
const OPERATION_ADD = 1;
const OPERATION_DELETE = 2;
const OPERATION_PRINT = 3;

$operations = [
    OPERATION_EXIT => OPERATION_EXIT . '. Завершить программу.',
    OPERATION_ADD => OPERATION_ADD . '. Добавить товар в список покупок.',
    OPERATION_DELETE => OPERATION_DELETE . '. Удалить товар из списка покупок.',
    OPERATION_PRINT => OPERATION_PRINT . '. Отобразить список покупок.',
];

function inputOperations(array $operationsList, array $itemsList):string {
    do {
        if (count($itemsList)) {
            echo 'Ваш список покупок: ' . PHP_EOL;
            echo implode("\n", $itemsList) . "\n";
        } else {
            echo 'Ваш список покупок пуст.' . PHP_EOL;
        }

        echo 'Выберите операцию для выполнения: ' . PHP_EOL;
        // Проверить, есть ли товары в списке? Если нет, то не отображать пункт про удаление товаров
        echo implode(PHP_EOL, $operationsList) . PHP_EOL . '> ';
        $selectedOperation = trim(fgets(STDIN));

        if (!array_key_exists($selectedOperation, $operationsList)) {
            system('clear');
            echo '!!! Неизвестный номер операции, повторите попытку.' . PHP_EOL;
        }

    } while (!array_key_exists($selectedOperation, $operationsList));

    return  $selectedOperation;
}

function productAdd(array &$itemsList) {
    echo "Введение название товара для добавления в список: \n> ";
    $itemName = trim(fgets(STDIN));
    $itemsList[] = $itemName;
}

function productDelete(array &$itemsList) {
    // Проверить, есть ли товары в списке? Если нет, то сказать об этом и попросить ввести другую операцию
    echo 'Текущий список покупок:' . PHP_EOL;
    echo 'Список покупок: ' . PHP_EOL;
    echo implode("\n", $itemsList) . "\n";

    echo 'Введение название товара для удаления из списка:' . PHP_EOL . '> ';
    $itemName = trim(fgets(STDIN));

    if (in_array($itemName, $itemsList, true) !== false) {
        while (($key = array_search($itemName, $itemsList, true)) !== false) {
            unset($itemsList[$key]);
        }
    }
}
function productPrint (array &$itemsList) {
    echo 'Ваш список покупок: ' . PHP_EOL;
    echo implode(PHP_EOL, $itemsList) . PHP_EOL;
    echo 'Всего ' . count($itemsList) . ' позиций. '. PHP_EOL;
    echo 'Нажмите enter для продолжения';
    fgets(STDIN);
}

$items = [];


do {
    system('clear');
//    system('cls'); // windows

    $operationNumber = inputOperations($operations, $items);
    echo 'Выбрана операция: '  . $operations[$operationNumber] . PHP_EOL;

    switch ($operationNumber) {
        case OPERATION_ADD:
            productAdd($items);
            break;

        case OPERATION_DELETE:
            productDelete($items);
            break;

        case OPERATION_PRINT:
            productPrint($items);
            break;
    }

    echo "\n ----- \n";
} while ($operationNumber > 0);

echo 'Программа завершена' . PHP_EOL;
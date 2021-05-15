<?php
function isWeekEnd(string $date):bool {
    if($date==="6" || $date==="7") {
        return true;
    }
    return false;
}

function getWorksDays(int $month, int $year)
{
    $currentDate = (new DateTime())->setDate($year, $month, 1);
    echo "Выбранный месяц: " . $currentDate->format('F') . PHP_EOL;
    $numsOfDays = $currentDate->format("t");
    $workDay = 0;
    for ($i=1; $i<=$numsOfDays; $i++) {
        $dayOfMonth = (new DateTime())->setDate($year, $month, $i);
        $isWorkDay = "-";
        if($workDay % 3 === 0) {
            if(isWeekEnd($dayOfMonth->format('N'))) {
                $workDay = 0;
            } else {
                $isWorkDay = "+";
                $workDay++;
            }
        } else {
            $workDay++;
        }
        echo $dayOfMonth->format("j") . $isWorkDay . PHP_EOL;
    }
}

getWorksDays(5, 2021);


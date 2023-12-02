import { readFileSync } from "fs";

async function day1PartOne() {
    const inputLines = readFileSync("./inputs/day1.txt").toString().split("\n");

    const result = inputLines.reduce((calibration, line) => {
        const lineNumbers = line.match(/\D/g);
        const firstNumber = lineNumbers[0];
        const lastNumber = lineNumbers[lineNumbers.length - 1];

        return calibration += parseInt(firstNumber + lastNumber);
    }, 0);

    console.log(result);
};

async function day1PartTwo() {
    const inputLines = readFileSync("./inputs/day1.txt").toString().split("\n");

    const toInt = { "one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9" };
    const result = inputLines.reduce((calibration, line) => {
        const lineNumbers = Array.from(line.matchAll(/(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g), x => x[1])
        const firstNumber = lineNumbers[0];
        const lastNumber = lineNumbers[lineNumbers.length - 1];
        
        const firstNumberInt = toInt[firstNumber] ? toInt[firstNumber] : firstNumber;
        const lastNumberInt = toInt[lastNumber] ? toInt[lastNumber] : lastNumber;

        return calibration += parseInt(firstNumberInt + lastNumberInt);
    }, 0);

    console.log(result);
};

day1PartTwo();
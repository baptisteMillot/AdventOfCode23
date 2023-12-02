import { readFileSync } from "fs";

async function day1() {
    const inputLines = readFileSync("./inputs/day1.txt").toString().split("\n");

    const result = inputLines.reduce((calibration, line) => {
        const lineNumbers = line.replace(/\D/g, '');
        const firstNumber = lineNumbers[0];
        const lastNumber = lineNumbers[lineNumbers.length - 1];

        return calibration += parseInt(firstNumber + lastNumber);
    }, 0);

    console.log(result);
};

day1();
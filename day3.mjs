import getInputs from "./utils/utils.mjs";
import crypto from 'crypto';

class Symbol {
    groupId;
    value;
    isNumber;
    neighbors;
    linkedTo;

    constructor(groupId, value, neighbors, linkedTo) {
        this.groupId = groupId;
        this.isNumber = /\d/g.test(value);
        this.value = this.isNumber ? parseInt(value) : value;
        this.neighbors = neighbors;
        this.linkedTo = linkedTo;
    }
}

class Line {
    symbols;

    constructor(line, lineBefore, lineAfter) {
        this.symbols = [];

        const lineSplit = line.split("");
        for (let i = 0; i < lineSplit.length ; i++) {
            let symbol = lineSplit[i];

            const symbols = [];
            const linkedTo = [];
            const neighbors = [];

            symbols.push(symbol);
            linkedTo.push(symbol);
            neighbors.push(...this.getNeighbors(i, line, lineBefore, lineAfter));

            while(i + 1 !== lineSplit.length && lineSplit[i + 1].match(/\d/g) && symbol.match(/\d/g)) {
                i += 1;
                symbol = lineSplit[i];
                neighbors.push(...this.getNeighbors(i, line, lineBefore, lineAfter));
                symbols.push(symbol);
                linkedTo.push(symbol);
            }
            
            const groupId = crypto.randomUUID();
            this.symbols.push(...symbols.map((s) => new Symbol(groupId, s, neighbors, linkedTo)));
        }
    }

    getNeighbors(symbolPosition, line, lineBefore, lineAfter) {
        const neighbors = [];

        const colStart = symbolPosition -1 < 0 ? symbolPosition : symbolPosition - 1;
        const colEnd = symbolPosition === line.length - 1 ? symbolPosition : symbolPosition + 1;

        for (let j = colStart; j <= colEnd; j++) {
            lineBefore && neighbors.push(lineBefore[j]);
            neighbors.push(line[j]);
            lineAfter && neighbors.push(lineAfter[j]);
        }

        return neighbors;
    }
}

function day3PartOne() {
    const inputLines = getInputs("./inputs/day3.txt");
    const lines = inputLines.map((line, index) => new Line(line, inputLines[index - 1]?.split(""), inputLines[index + 1]?.split("")));

    const symbols = lines.flatMap((line) => line.symbols).filter((symbol) => symbol.isNumber && symbol.neighbors.some((neighbor) => neighbor !== "." && !(/\d/g.test(neighbor))));
    const symbolsWithoutDuplicate = [...new Map(symbols.map((s) => [s.groupId, s])).values()];
    const result = symbolsWithoutDuplicate.reduce((total, symbol) => total + parseInt(symbol.linkedTo.join('')), 0);
    console.log(result)
};

function day3PartTwo() {
    const inputLines = getInputs("./inputs/day3.txt");
    const lines = inputLines.map((line, index) => new Line(line, inputLines[index - 1]?.split(""), inputLines[index + 1]?.split("")));

    const symbols = lines.flatMap((line) => line.symbols).filter((symbol) => symbol.value === "*" && symbol.neighbors.filter((neighbor) => neighbor.match(/\d/g))?.length === 2);
    console.log(symbols)
    // const symbolsWithoutDuplicate = [...new Map(symbols.map((s) => [s.groupId, s])).values()];
    // const result = symbolsWithoutDuplicate.reduce((total, symbol) => total + parseInt(symbol.linkedTo.join('')), 0);
    // console.log(result)
};

day3PartOne();
import getInputs from "./utils/utils.mjs";

class Symbol {
    value;
    isNumber;
    neighbors;

    constructor(value, neighbors) {
        this.isNumber = /\d/g.test(value);
        this.value = this.isNumber ? parseInt(value) : value;
        this.neighbors = neighbors;
    }
}

class Line {
    symbols;

    constructor(line, lineBefore, lineAfter) {
        this.symbols = [];

        const lineSplit = line.split("");
        for (let i = 0; i < lineSplit.length ; i++) {
            let symbol = lineSplit[i];
            let number = "";
            const neighbors = [];

            while(i !== lineSplit.length && symbol.match(/\d/g)) {
                neighbors.push(...this.getNeighbors(i, line, lineBefore, lineAfter));
                number += symbol;
                i += 1;
                symbol = lineSplit[i];
            }
            
            this.symbols.push(new Symbol(number || symbol, neighbors));
        }
    }

    getNeighbors(symbolPosition, line, lineBefore, lineAfter) {
        const neighbors = [];

        const colStart = symbolPosition -1 < 0 ? symbolPosition : symbolPosition - 1;
        const colEnd = symbolPosition === line.length - 1 ? symbolPosition : symbolPosition + 1;

        for (let j = colStart; j <= colEnd; j++) {
            lineBefore && neighbors.push(lineBefore[j]);
            !(/\d/g.test(line[j])) && neighbors.push(line[j]);
            lineAfter && neighbors.push(lineAfter[j]);
        }

        return neighbors;
    }
}

function day3PartOne() {
    const inputLines = getInputs("./inputs/day3.txt");
    const lines = inputLines.map((line, index) => new Line(line, inputLines[index - 1]?.split(""), inputLines[index + 1]?.split("")));

    const symbols = lines.flatMap((line) => line.symbols).filter((symbol) => symbol.neighbors.some((neighbor) => neighbor !== "."));
    const result = symbols.reduce((total, symbol) => total + symbol.value, 0);
    console.log(result)
};

day3PartOne();
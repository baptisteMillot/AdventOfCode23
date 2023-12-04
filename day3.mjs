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

    setSymbolNeighbors(symbolPosition, line, lineBefore, lineAfter) {
        const neighbors = [];
    
        const colStart = symbolPosition -1 < 0 ? symbolPosition : symbolPosition - 1;
        const colEnd = symbolPosition === line.symbols.length - 1 ? symbolPosition : symbolPosition + 1;
    
        for (let j = colStart; j <= colEnd; j++) {
            lineBefore && neighbors.push(lineBefore.symbols[j]);
            neighbors.push(line.symbols[j]);
            lineAfter && neighbors.push(lineAfter.symbols[j]);
        }
    
        this.neighbors = neighbors;
    }
}

class Line {
    symbols;

    constructor(line) {
        this.symbols = [];

        const lineSplit = line.split("");
        for (let i = 0; i < lineSplit.length ; i++) {
            let symbol = lineSplit[i];

            const symbols = [];
            const linkedTo = [];
            const neighbors = [];

            symbols.push(symbol);
            linkedTo.push(symbol);

            while(i + 1 !== lineSplit.length && lineSplit[i + 1].match(/\d/g) && symbol.match(/\d/g)) {
                i += 1;
                symbol = lineSplit[i];
                symbols.push(symbol);
                linkedTo.push(symbol);
            }
            
            const groupId = crypto.randomUUID();
            this.symbols.push(...symbols.map((s) => new Symbol(groupId, s, neighbors, linkedTo)));
        }
    }
}

function day3PartOne() {
    const inputLines = getInputs("./inputs/day3.txt");
    const lines = inputLines.map((line) => new Line(line));

    lines.forEach((line, indexLine) => {
        line.symbols.forEach((symbol, index) => {
            symbol.setSymbolNeighbors(index, line, lines[indexLine - 1], lines[indexLine + 1]);
        })
    });

    const symbols = lines.flatMap((line) => line.symbols).filter((symbol) => symbol.isNumber && symbol.neighbors.some((neighbor) => neighbor.value !== "." && !(/\d/g.test(neighbor.value))));
    const symbolsWithoutDuplicate = [...new Map(symbols.map((s) => [s.groupId, s])).values()];
    const result = symbolsWithoutDuplicate.reduce((total, symbol) => total + parseInt(symbol.linkedTo.join('')), 0);
    console.log(result)
};

function day3PartTwo() {
    const inputLines = getInputs("./inputs/day3.txt");
    const lines = inputLines.map((line) => new Line(line));

    lines.forEach((line, indexLine) => {
        line.symbols.forEach((symbol, index) => {
            symbol.setSymbolNeighbors(index, line, lines[indexLine - 1], lines[indexLine + 1]);
        })
    });

    const gearWithGoodNeighbors = lines
        .flatMap((line) => line.symbols).filter((symbol) => symbol.value === "*")
        .reduce((symbolWithDigitNeighbors, symbol) => {
            const digitOnlyNeighbors = symbol.neighbors.filter((neighbor) => neighbor.value.toString().match(/\d/g));
            const neighborsWithtDouble = [...new Map(digitOnlyNeighbors.map((s) => [s.groupId, s])).values()]
            if (neighborsWithtDouble.length === 2) {
                symbolWithDigitNeighbors.push({ ...symbol, neighbors: neighborsWithtDouble });
            }

            return symbolWithDigitNeighbors;
        }, []);

        console.log(gearWithGoodNeighbors
            .map((symbol) => symbol.neighbors)
            .reduce((totalByGear, neighbors) => totalByGear + parseInt(neighbors[0].linkedTo.join('')) * parseInt(neighbors[1].linkedTo.join('')), 0)
        );
};

day3PartOne();
day3PartTwo();
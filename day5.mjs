import getInputs from "./utils/utils.mjs";

class Range {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

class Map {
    sourceRange;
    destinationRange;

    constructor(sourceRange, destinationRange) {
        this.sourceRange = sourceRange;
        this.destinationRange = destinationRange;
    }
}

class Section {
    source;
    destination;
    maps;

    constructor(mapKind, ranges) {
        const map = mapKind.split("-");

        this.source = map[0];
        [this.destination] = map[2].split(" ");

        this.maps = ranges.map((range) => {
            const map = range.split(" ");

            const destinationStart = parseInt(map[0]);
            const sourceStart = parseInt(map[1]);
            const length = parseInt(map[2]);

            return new Map(new Range(sourceStart,  sourceStart + length - 1), new Range(destinationStart,  destinationStart + length - 1));
        })
    }
}

class Almanac {
    sections;

    constructor(lines) {
        this.sections = [];
        for (let i = 0; i < lines.length; i++) {
            let section = [];
            while(lines[i]) {
                section.push(lines[i]);
                i++;
            }
            if (section.length) {
                this.sections.push(new Section(section[0], section.slice(1)));
            }
        }
    }

    getLocationOfSeed(seed) {
        let result = seed;
        for (const section of this.sections) {
            const map = section.maps.find((map) => map.sourceRange.start <= result && map.sourceRange.end >= result);
            result = map ? result + map.destinationRange.start - map.sourceRange.start : result;
        }

        return result;
    }
}

function day5PartOne() {
    const [seedsLine, ...inputLines] = getInputs("./inputs/day5.txt");

    const seeds = seedsLine.split(" ").filter((seed) => /\d/g.test(seed)).map((seed) => parseInt(seed));
    const almanac = new Almanac(inputLines);

    let locations = seeds.map((seed) => almanac.getLocationOfSeed(seed));

    const result = Math.min(...locations)

    console.log(result)
};

function day5PartTwo() {
    const [seedsLine, ...inputLines] = getInputs("./inputs/day5.txt");

    const seedDetails = seedsLine
        .split(" ")
        .filter((seed) => /\d/g.test(seed))
        .map((seed) => parseInt(seed));

    const almanac = new Almanac(inputLines);

    let result;

    for (let i = 0; i < seedDetails.length; i = i + 2) {
        const start = seedDetails[i];
        const end = start + seedDetails[i + 1] -1;
        for (let j = start; j <= end; j++) {
            const location = almanac.getLocationOfSeed(j);
            if (!result || location < result) {
                result = location;
            }
        }
    }

    console.log(result)
};

day5PartTwo();
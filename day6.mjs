import getInputs from "./utils/utils.mjs";

class Race {
    time;
    distanceRecord;
    winnings;

    constructor(time, distanceRecord) {
        this.time = parseInt(time);
        this.distanceRecord = parseInt(distanceRecord);

        this.winnings = [];
        for (let hold = 0; hold < this.time; hold++) {
            const remainingTime = this.time - hold;
            const speed = hold;

            const distance = remainingTime * speed;

            if (distance > this.distanceRecord) {
                this.winnings.push(distance);
            }
        }
    }
}

function day6PartOne() {
    const inputLines = getInputs("./inputs/day6.txt");
    const times = inputLines[0].split(" ").filter((time) => time && /\d/g.test(time));
    const distances = inputLines[1].split(" ").filter((distance) => distance && /\d/g.test(distance));

    const races = times.map((time, i) => new Race(time, distances[i]));

    console.log(races.reduce((total, race) => total * race.winnings.length, 1));
};

function day6PartTwo() {
    const inputLines = getInputs("./inputs/day6.txt");
    const time = inputLines[0].split(" ").filter((time) => time && /\d/g.test(time)).join("");
    const distance = inputLines[1].split(" ").filter((distance) => distance && /\d/g.test(distance)).join("");

    const race = new Race(time, distance);

    console.log(race.winnings.length);
};

day6PartTwo();
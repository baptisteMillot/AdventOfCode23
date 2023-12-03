import getInputs from "./utils/utils.mjs";

const RULES = { "red": 12, "green": 13, "blue": 14 };

class Set {
    set;

    constructor(setOfCube) {
        this.set = setOfCube.trim().split(",").map((cube) => {
            const [count, kind] = cube.trim().split(" ");

            return { count: parseInt(count), kind };
        });
    }

    isRespectRule() {
        return this.set.every((set) => RULES[set.kind] >= set.count);
    }
}

class Game {
    id;
    sets;

    constructor(gameLine) {
        const [gameHeader, gameDetails] = gameLine.split(":");
        const gameId = gameHeader.match(/\d/g).join("");
        const sets = gameDetails.split(";");

        this.id = parseInt(gameId);
        this.sets = sets.map((set) => {
            return new Set(set);
        });
    }

    hasSetWithRespectRule() {
        return this.sets.every((set) => set.isRespectRule());
    }

    getMaxOfEachColor() {
        return this.sets.reduce((colors, cubes) => {
            if (colors.red < cubes.set.find((set) => set.kind === 'red')?.count) {
                colors.red = cubes.set.find((set) => set.kind === 'red').count;
            }
            if (colors.green < cubes.set.find((set) => set.kind === 'green')?.count) {
                colors.green = cubes.set.find((set) => set.kind === 'green').count;
            }
            if (colors.blue < cubes.set.find((set) => set.kind === 'blue')?.count) {
                colors.blue = cubes.set.find((set) => set.kind === 'blue')?.count;
            }

            return colors;
        }, {red: 0, green: 0, blue: 0})
    }
}

function day2PartOne() {
    const inputLines = getInputs("./inputs/day2.txt");

    const games = inputLines.map((line) => new Game(line));

    const gameWithGoodRule = games.filter((game) => game.hasSetWithRespectRule());

    console.log(gameWithGoodRule.reduce((total, game) => total += game.id,0))
};

function day2PartTwo() {
    const inputLines = getInputs("./inputs/day2.txt");

    const games = inputLines.map((line) => new Game(line));

    const result = games.reduce((total, game) => {
        const maxOfColor = game.getMaxOfEachColor();
        return total + maxOfColor["red"] * maxOfColor["green"] * maxOfColor["blue"];
    }, 0);

    console.log(result)
};

day2PartTwo();
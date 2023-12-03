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
}

async function day2PartOne() {
    const inputLines = getInputs("./inputs/day2.txt");

    const games = inputLines.map((line) => new Game(line));

    const gameWithGoodRule = games.filter((game) => game.hasSetWithRespectRule());

    console.log(gameWithGoodRule.reduce((total, game) => total += game.id,0))
};

day2PartOne();
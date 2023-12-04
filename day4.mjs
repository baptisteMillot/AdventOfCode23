import getInputs from "./utils/utils.mjs";

class Card {
    id;
    winningNumbers;
    totalPoint;

    constructor(line) {
        const [cardName, cardGame] = line.split(":");
        const [winningNumbers, playedNumber] = cardGame.split("|");

        const id = Array.from(cardName.matchAll(/\d/g), x => x[0]).join("");
        this.id = parseInt(id);
        const winningNumbersClean = winningNumbers.trim().split(" ").filter((number) => number);
        const playedNumberClean = playedNumber.trim().split(" ").filter((number) => number)

        this.winningNumbers = playedNumberClean.filter((number) => winningNumbersClean.includes(number));
        this.totalPoint = this.winningNumbers.reduce((total) => total === 0 ? 1 : total * 2, 0);
    }
}

function day4PartOne() {
    const inputLines = getInputs("./inputs/day4.txt");

    const cards = inputLines.map((line) => new Card(line));
    const result = cards.reduce((totalPoint, card) => totalPoint + card.totalPoint, 0);

    console.log(result)
};

function day4PartTwo() {
    const inputLines = getInputs("./inputs/day4.txt");

    const cards = inputLines.map((line) => new Card(line));

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        for (let j = card.id + 1; j <= card.id + card.winningNumbers.length; j++) {
            cards.push(cards.find((c) => c.id === j));
        }
    }

    console.log(cards.length)
};

day4PartTwo();
import getInputs from "./utils/utils.mjs";

class Card {
    id;
    winningNumbers;
    playedNumber;

    constructor(line) {
        const [cardName, cardGame] = line.split(":");
        const [winningNumbers, playedNumber] = cardGame.split("|");

        this.id = cardName.match(/\d/g)[0];
        this.winningNumbers = winningNumbers.trim().split(" ").filter((number) => number);
        this.playedNumber = playedNumber.trim().split(" ").filter((number) => number)
    }
}

function day4PartOne() {
    const inputLines = getInputs("./inputs/day4.txt");

    const cards = inputLines.map((line) => new Card(line));
    const result = cards.reduce((totalPoint, card) => {
        const playedWinningNumbers = card.playedNumber.filter((number) => card.winningNumbers.includes(number));

        return totalPoint + playedWinningNumbers.reduce((total) => total === 0 ? 1 : total * 2, 0);
    }, 0);
    console.log(result)
    
};

day4PartOne();
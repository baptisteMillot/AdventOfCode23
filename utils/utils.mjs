import { readFileSync } from "fs";

function getInputs(path) {
    return readFileSync(path).toString().split("\n");
};

export default getInputs;
import Teleport from "./Teleport";

export default class Move {
    constructor(name) {
        console.assert(typeof name === "string", "name must be a string!");
        console.assert(typeof click === "function", "click must be a function!");

        this.name = name;
        if (this.constructor === Move) {
            throw new TypeError("Can not construct abstract class.");
        }
    }

    click() {
    }

    static noMove = class extends Move {
        constructor() {
            super("-----")
        }
    };
}

export const Moves = {
    TELEPORT: Teleport()
};
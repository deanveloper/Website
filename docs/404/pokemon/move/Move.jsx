export default class Move {
    constructor() {
        if (this.constructor === Move) {
            throw new TypeError("Can not construct abstract class.");
        }
        if (this.click === Move.prototype.click) {
            throw new TypeError("Please implement abstract method foo.");
        }
    }

    click() {
        throw new TypeError("Do not call abstract method foo from child.");
    }
}
import {Moves} from "move/Move"

export default class Pokemon {
    constructor(name, moves) {
        // Name of the pokemon
        this.name = name;

        // Array of moves
        this.moves = moves;
    }

    click(moveString) {
        for (const move of this.moves) {
            if (moveString === move.name) {
                move.click();
                break;
            }
        }
    }

    damage() {

    }
}

export const PokemonEnum = {
    FRIENDLY: new Pokemon("Gallade", [Moves.TELEPORT]),
    ENEMY: new Pokemon("404", [])
};
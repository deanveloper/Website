import {Moves} from "./move/Move"

class Pokemon {
    constructor(name, moves) {
        // Name of the pokemon
        this.name = name;

        // Array of moves
        this.moves = moves;
    }

    use(moveString) {
        for (const move of this.moves) {
            if (moveString === move.name) {
                move.use();
                break;
            }
        }
    }
}

export const PokemonEnum = {
    FRIENDLY: new Pokemon("Gallade", [Moves.TELEPORT, Moves.NOTHING, Moves.NOTHING, Moves.NOTHING]),
    ENEMY: new Pokemon("404", [])
};
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
                move.use(this);
                break;
            }
        }
    }
}

export const PokemonEnum = {
    FRIENDLY: new Pokemon("Abra", [Moves.TELEPORT, Moves.SLASH, Moves.NOTHING, Moves.NOTHING]),
    ENEMY: new Pokemon("404", [Moves.FILE, Moves.REDIRECT, Moves.NOTHING, Moves.NOTHING])
};
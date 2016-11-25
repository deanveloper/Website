import {pokeMessage, redirToMain, mainMenu} from "../../script";
import {PokemonEnum} from "../Pokemon";

class Move {
    constructor(name) {
        console.assert(typeof name === "string", "name must be a string!");
        this.name = name;
    }

    use(pokemon) {
        if(this !== Moves.NOTHING) {
            pokeMessage(pokemon.name + " used " + this.name + "!", () => {
                window.setTimeout(this.onUse, 1000);
            });
        }
    }

    onUse() {
        console.warn("onUse not overridden");
    }

    toString() {
        return this.name;
    }
}

class Nothing extends Move {

    constructor() {
        super("-----")
    }

    onUse() {

    }
}

class Teleport extends Move {
    constructor() {
        super("Teleport")
    }

    onUse() {
        pokeMessage("You were teleported to the main page!", redirToMain)
    }
}

class Slash extends Move {
    constructor() {
        super("Slash")
    }

    use() {
        const msg = "But it " +  (Math.random() < .5 ? "missed!" : "failed!");
        pokeMessage(msg, () => (Math.random() < .75 ? Moves.FILE : Moves.REDIRECT).use(PokemonEnum.ENEMY))
    }
}

class File extends Move {

    constructor() {
        super("File");
        this.counter = 0;
    }

    use() {
        switch (this.counter) {
            case 0:
                pokeMessage("It was not found!", mainMenu);
                break;
            case 1:
                pokeMessage("It was still not found...", mainMenu);
                break;
            default:
                pokeMessage("The pokemon is corrupt! Redirecting to main page...", redirToMain);
                break;
        }

        this.counter++;
    }
}

class Redirect extends Move {
    constructor() {
        super("Redirect");
    }

    use() {
        pokeMessage("You were redirected to the main page!", redirToMain);
    }
}

export const Moves = {
    NOTHING: new Nothing(),
    TELEPORT: new Teleport(),
    SLASH: new Slash(),
    FILE: new File(),
    REDIRECT: new Redirect()
};
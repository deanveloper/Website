import {pokeMessage, redirToMain, mainMenu} from "../../script.js";
import {PokemonEnum} from "../Pokemon.js";

class Move {
    constructor(name) {
        console.assert(typeof name === "string", "name must be a string!");
        console.assert(this.use === Move.prototype.use);
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

    onUse() {
        const msg = "But it " +  (Math.random() < .5 ? "missed!" : "failed!");
        pokeMessage(msg, () => (Math.random() < .8 ? Moves.FILE : Moves.REDIRECT).use(PokemonEnum.ENEMY))
    }
}

class File extends Move {

    constructor() {
        super("File");
    }

    onUse() {
        if(!this.counter) {
            this.counter = 0;
        }

        switch (this.counter) {
            case 0:
                pokeMessage("It was not found!", mainMenu);
                break;
            case 1:
                pokeMessage("It was still not found...", mainMenu);
                break;
            case 2:
                pokeMessage("The pokemon could not be found! Fleeing from battle...", redirToMain);
                break;
            default:
                pokeMessage("You should never see this message... counter is " + this.counter, redirToMain);
                break;
        }

        this.counter++;
    }
}

class Redirect extends Move {
    constructor() {
        super("Redirect");
    }

    onUse() {
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
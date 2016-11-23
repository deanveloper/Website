import {pokeMessage, redirToMain} from "../../script";

class Move {
    constructor(name) {
        console.assert(typeof name === "string", "name must be a string!");
        this.name = name;
    }

    use() {
        if(this !== Moves.NOTHING) {
            pokeMessage("You used " + this.name + "!", () => {
                this.playAnimation();
                window.setTimeout(this.onUse, 1000);
            });
        }
    }

    /**
     * Play a 1 second animation
     */
    playAnimation() {
        console.warn("playAnimation called from superclass");
    }

    onUse() {
        console.warn("onUse called from superclass");
    }

    toString() {
        return this.name;
    }
}

class Nothing extends Move {

    constructor() {
        super("-----")
    }

    playAnimation() {

    }

    onUse() {

    }
}

class Teleport extends Move {
    constructor() {
        super("Teleport")
    }

    playAnimation() {

    }

    onUse() {
        pokeMessage("You teleported to the main page!", () => {
            window.setTimeout(redirToMain, 2000)
        })
    }
}

class Slash extends Move {
    constructor() {
        super("Slash")
    }

    playAnimation() {

    }

    use() {
        pokeMessage("You used Slash!", () => {

        });
    }
}

export const Moves = {
    NOTHING: new Nothing(),
    TELEPORT: new Teleport(),
    SLASH: new Slash()
};
import {pokeMessage, redirToMain} from "../../script";

class Move {
    constructor(name) {
        console.assert(typeof name === "string", "name must be a string!");
        this.name = name;

        if (this.constructor === Move) {
            throw new TypeError("Can not construct abstract class.");
        }
    }

    use() {
        pokeMessage("You used Teleport!", () => {
            this.playAnimation();
            window.setTimeout(this.onUse, 1000);
        });
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
}

class Teleport extends Move {
    constructor() {
        super("Teleport")
    }

    playAnimation() {

    }

    onUse() {
        pokeMessage("You used Teleport!", () => {
            pokeMessage("You teleported to the main page!", () => {
                window.setTimeout(redirToMain, 3000)
            })
        });
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
    TELEPORT: Teleport(),
    SLASH: Slash()
};
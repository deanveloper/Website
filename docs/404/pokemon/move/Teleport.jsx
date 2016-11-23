import Move from "./Move";
import {pokeMessage} from "../../script";

export default class Teleport extends Move {
    constructor() {
        super("Teleport")
    }

    click(pokemon) {
        pokeMessage(pokemon.name + " used Teleport!", () => {
            pokeMessage("You teleported to the main page!", () => {
                window.setTimeout(() => window.location.replace('https://www.deanveloper.com'), 3000)
            })
        });
    }
}
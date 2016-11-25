import {PokemonEnum} from "./pokemon/Pokemon";

export let tl;
export let tr;
export let bl;
export let br;

window.addEventListener("load", () => {
    tl = document.getElementById("tl");
    tr = document.getElementById("tr");
    bl = document.getElementById("bl");
    br = document.getElementById("br");

    const audio = document.querySelector("audio");
    audio.volume = .5;

    window.setInterval(() => {
        if (audio.currentTime >= 50.5) {
            audio.currentTime = 13.95;
        }
    }, 10);

    pokeMessage("A wild 404 appeared!", () => mainMenu());

    for (const elem of [tl, tr, bl, br]) {
        elem.addEventListener("click", () => mouseClicked(elem));
        elem.addEventListener("mouseover", () => mousedOver(elem));
        elem.addEventListener("mouseout", () => mouseOut(elem));
    }

    for (const id of ["#fPlat", "#ePlat"]) {
        const elem = document.querySelector(id);
        const ctx = elem.getContext("2d");
        ctx.beginPath();
        ctx.ellipse(elem.width / 2, elem.height / 2, elem.width / 2, elem.height / 2, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }
});

export function pokeMessage(string, callback) {
    let counter = 0;
    const div = document.querySelector("#messageBox");
    div.textContent = "";
    div.style.width = "94%";
    document.getElementById("optionsBox").style.display = "none";
    clearMenu();
    const interval = window.setInterval(() => {
        if (counter < string.length) {
            div.innerHTML += string[counter];
            counter++;
        } else {
            clearInterval(interval);
            window.setTimeout(callback, 1000);
        }
    }, 50);
}

export function mainMenu(tltext, trtext, bltext, brtext) {
    if (tltext === undefined) {
        mainMenu("FIGHT", "PKMN", "BAG", "RUN");
        return;
    }
    const box = document.getElementById("optionsBox");
    if (tltext !== "" || tltext === undefined) {
        box.style.display = "block";
        box.style.border = "4px double black";
        box.style.left = "52%";
        box.style.width = "46%";
        document.getElementById("messageBox").style.width = "46%";
    }
    tl.innerHTML = tltext;
    tr.innerHTML = trtext;
    bl.innerHTML = bltext;
    br.innerHTML = brtext;
}

export function clearMenu() {
    mainMenu("", "", "", "")
}

export function redirToMain() {
    window.top.location.href = 'https://www.deanveloper.com'
}

function mousedOver(data) {
    if (data.innerHTML !== "") data.innerHTML = "\u25B8" + data.innerHTML;
}

function mouseOut(data) {
    if (data.innerHTML[0] === "\u25B8") data.innerHTML = data.innerHTML.substring(1);
}

function mouseClicked(data) {
    const string = data.innerHTML.substring(1);
    switch (string) {
        case "FIGHT":
            pokeMessage("What would you like to do?", () => mainMenu(...PokemonEnum.FRIENDLY.moves));
            break;
        case "PKMN":
            pokeMessage("This is your only pokemon!", mainMenu);
            break;
        case "BAG":
            // TODO: IMPLEMENT POKEBALLS
            break;
        case "RUN":
            pokeMessage("Got away safely!", redirToMain);
            break;
        default:
            PokemonEnum.FRIENDLY.use(string)
    }
}
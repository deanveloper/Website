export let tl;
export let tr;
export let bl;
export let br;

window.addEventListener("load", () => {
    pokeMessage("A wild 404 appeared!", "FIGHT", "PKMN", "BAG", "RUN");
    tl = document.getElementById("tl");
    tr = document.getElementById("tr");
    bl = document.getElementById("bl");
    br = document.getElementById("br");

    for (const elem of [tl, tr, bl, br]) {
        elem.addEventListener("click", mouseClicked);
        elem.addEventListener("mouseover", mousedOver);
        elem.addEventListener("mouseout", mouseOut);
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
            div.textContent += string[counter];
            counter++;
        } else {
            clearInterval(interval);
            callback()
        }
    }, 50);
}

export function mainMenu(tltext, trtext, bltext, brtext) {
    const box = document.getElementById("optionsBox");
    if (tltext !== "") {
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
            pokeMessage("What would you like to do?", "Teleport", "Heal Pulse", "----", "----");
            break;
        case "PKMN":
            pokeMessage("This is your only pokemon!", () => {});
            break;
        case "BAG":
            // TODO: IMPLEMENT POKEBALLS
            break;
        case "RUN":
            pokeMessage("Got away safely!", clearMenu);
            break;
        default:
            currentPokemon.click(string)
    }
    if (string === "BAG") {
        // TODO: IMPLEMENT POKEBALLS
    }
    if (string === "RUN") {
    }
    if (string === "Teleport") {
        pokeMessage("Gallade used Teleport!", clearMenu);
    }
}
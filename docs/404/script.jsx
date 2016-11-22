window.addEventListener("load", () => {
    pokeMessage("A wild 404 appeared!", "FIGHT", "PKMN", "BAG", "RUN");
});

function pokeMessage(string, tl, tr, bl, br) {
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
            mainMenu(tl, tr, bl, br);
        }
    }, 50);
}

function mainMenu(tltext, trtext, bltext, brtext) {
    const tl = document.getElementById("tl");
    const tr = document.getElementById("tr");
    const bl = document.getElementById("bl");
    const br = document.getElementById("br");
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

function clearMenu() {
    document.getElementById("tl").innerHTML = "";
    document.getElementById("tr").innerHTML = "";
    document.getElementById("bl").innerHTML = "";
    document.getElementById("br").innerHTML = "";
}

function mousedOver(data) {
    if (data.innerHTML !== "") data.innerHTML = "\u25B8" + data.innerHTML;
}

function mouseOut(data) {
    if (data.innerHTML[0] === "\u25B8") data.innerHTML = data.innerHTML.substring(1);
}

function mouseClicked(data) {
    const string = data.innerHTML.substring(1);
    if (string === "FIGHT") {
        pokeMessage("What would you like to do?", "Teleport", "Heal Pulse", "----", "----");
    }
    if (string === "PKMN") {
        pokeMessage(
            "This is your only pokemon!",
            document.getElementById("tl").innerHTML,
            document.getElementById("tr").innerHTML,
            document.getElementById("bl").innerHTML,
            document.getElementById("br").innerHTML
        );
    }
    if (string === "BAG") {
        // TODO: IMPLEMENT POKEBALLS
    }
    if (string === "RUN") {
        pokeMessage("Got away safely!", "", "", "", "");
    }
    if (string === "Teleport") {
        pokeMessage("Gallade used Teleport!", "", "", "", "");
    }
    if (string === "Heal Pulse") {
        pokeMessage("Gallade used Heal Pulse!", "", "", "", "");
    }
}
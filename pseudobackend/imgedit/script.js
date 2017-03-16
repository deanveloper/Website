import {init} from "./tools"

export const $ = require("jquery");

let currentIndex = 0;
let canvases = [];

export let $base;

export function getCanvas() {
    while (canvases.length > currentIndex) {
        canvases.pop();
    }

    const $canvas = $("<canvas width='" + $base.width + "' height='" + $base.height + "'>");
    $canvas.css({position: "absolute"});

    canvases.push($canvas[0]);

    currentIndex++;

    return $canvas[0];
}

export function undo() {
    const $canvas = $(canvases[currentIndex]);
    $canvas.css({display: "none"});
    currentIndex--;
}

export function redo() {
    currentIndex++;
    const $canvas = $(canvases[currentIndex]);
    $canvas.css({display: ""});
}

export function image(keepCanvas) {
    const flat = $("<canvas width='" + $base.width + "' height='" + $base.height + "'>")[0];
    const ctx = flat.getContext('2d');

    for (const can of canvases) {
        ctx.drawImage(can, 0, 0);
    }

    if (keepCanvas) {
        return flat;
    }
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

/**
 * add listeners
 */
$(document).ready(() => {
    const upload = $("#image-upload");

    $(window).on("paste", (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file.type.startsWith("image")) {
                    showImage(window.URL.createObjectURL(file));
                } else {
                    console.log("Invalid MIME type: " + file.type);
                }
            } else {
                console.log("Not a file/image: " + item);
            }
        }
    });

    upload.click(() => {
        $("#file-input").click()
    });

    upload.on("dragenter", (e) => {
        upload.css({backgroundColor: "#C5ECAB"});
        e.stopPropagation();
        e.preventDefault();
    });

    upload.on('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();
    });

    upload.on("dragexit", (e) => {
        upload.css({backgroundColor: "#ECE7AB"});
        e.stopPropagation();
        e.preventDefault();
    });

    upload.on("drop", (e) => {
        e.stopPropagation();
        e.preventDefault();

        let files = e.originalEvent.dataTransfer.files;
        if (!files) {
            console.log("No files!");
            upload.trigger("dragexit");
        } else {
            const file = files[0];
            if (file && file.type.startsWith("image")) {
                showImage(window.URL.createObjectURL(file));
            } else {
                console.log("Invalid MIME type: " + file.type);
                upload.trigger("dragexit");
            }
        }
    });

    $("#file-input").change((e) => {
        showImage(window.URL.createObjectURL(e.target.files[0]));
    });
});

/**
 * Displays an image.
 *
 * @param link The link to the image, usually made with URL.createObjectUrl()
 */
function showImage(link) {
    const body = $("body");
    body.empty();
    const background = $("<div class='no-select'>");
    background.css({
        backgroundColor: "rgba(0, 0, 0, 75%)",
        width: "100%",
        height: "100%",
        position: "fixed",
        margin: 0
    });
    body.append(background);
    const img = new Image();
    $(img).on("load", () => {

        $base = $("<canvas id='main' width='" + img.width + "' height='" + img.height + "'>");
        $base.css({position: "absolute"});
        $base[0].getContext('2d').drawImage(img, 0, 0);

        getCanvas(); // create a base canvas

        body.append(background);
        body.append($base);

        init();
    });
    img.src = link;
}


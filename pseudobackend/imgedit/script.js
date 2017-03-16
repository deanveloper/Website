import {init} from "./tools"

export const $ = require("jquery");
export let ctx;
export let $canvas;

let $mainCanvas;

/**
 * Draws the data from the editable canvas to the main canvas.
 */
export function draw() {
    $mainCanvas[0].getContext('2d').drawImage($canvas[0], 0, 0);
    ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
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
        backgroundColor: "rgba(0, 0, 0, 50%)",
        width: "100%",
        height: "100%",
        position: "fixed",
        margin: 0
    });
    body.append(background);
    const img = new Image();
    $(img).on("load", () => {

        $canvas = $("<canvas id='edit' width='" + img.width + "' height='" + img.height + "'>");
        $canvas.css({position: "absolute"});

        $mainCanvas = $("<canvas id='main' width='" + img.width + "' height='" + img.height + "'>");
        $mainCanvas.css({position: "absolute"});

        ctx = $canvas[0].getContext('2d');
        ctx.drawImage(img, 0, 0);

        body.append(background);
        body.append($mainCanvas);
        body.append($canvas);

        draw();
        init();
    });
    img.src = link;
}
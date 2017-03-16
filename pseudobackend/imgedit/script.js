const $ = require("jquery");

$(document).ready(() => {
    const upload = $("#image-upload");

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

function showImage(link) {
    const body = $("body");
    body.empty();
    const main = $("<div class='no-select'>");
    main.css({
        backgroundColor: "rgba(0, 0, 0, 50%)",
        width: "100%",
        height: "100%",
        position: "absolute",
        margin: 0
    });
    const img = new Image();
    $(img).on("load", () => {
        const canvas = $("<canvas width='" + img.width + "' height='" + img.height + "'>");
        const ctx = canvas[0].getContext('2d');
        ctx.drawImage(img, 0, 0);
        main.append(canvas);
        body.append(main);
    });
    img.src = link;
}

window.showImage = showImage;
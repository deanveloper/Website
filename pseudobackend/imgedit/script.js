const $ = require("jquery");

$(document).ready(() => {
    const upload = $("#image-upload");

    upload.click(() => {
        $("#file-input").click()
    });

    $(window).on("dragenter", (e) => {
        upload.css({backgroundColor: "#C5ECAB"});
    });

    $(window).on("dragexit", (e) => {
        upload.css({backgroundColor: "#ECE7AB"});
    });

    $(window).on("drop", (e) => {
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            showImage(window.URL.createObjectURL(e.target.files[0]));
        }
        e.preventDefault(true);
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
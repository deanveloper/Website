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
        if (file) {
            showImage(window.URL.createObjectURL(e.target.files[0]));
        }
    });

    $("#file-input").change((e) => {
        showImage(window.URL.createObjectURL(e.target.files[0]));
    })
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
    img.src = link;
    img.css({display: "none"});
    main.append(img);



    body.append(main);
}

window.showImage = showImage;
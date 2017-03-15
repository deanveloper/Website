const $ = require("jquery");

function showImage(image) {
    const body = $("body");
    body.empty();
    const main = $("<div>");
    main.css({
        backgroundColor: "rgba(0, 0, 0, 50%)",
        width: "100%",
        height: "100%",
        margin: 0
    });
    body.append(main);
}

window.showImage = showImage;
console.log(window.showImage);
console.log("HI!!!");
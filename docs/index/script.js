const anime = require("animejs");
const $ = require("jquery");

const icons = {};

$(document).ready(() => {
    icons.github = new Icon("code");
    icons.donate = new Icon("dollar");
    icons.twitter = new Icon("twitter");
    icons.contact = new Icon("address-card-o");
    icons.blog = new Icon("file-text-o");
    icons.tools = new Icon("wrench");
});

function animateHover(icon) {

}

class Icon {
    constructor(type) {
        $("#items").append(
            $("<li>").append(
                $("<div>").attr("id", type).attr("class", "icon").append(
                    $("<i>").attr("class", "fa fa-2x fa-" + type))));
        this.elem = $("#" + type);
    }

    onClick() {

    }
}
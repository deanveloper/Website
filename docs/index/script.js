const anime = require("animejs");
const $ = require("jquery");

const icons = {};

$(document).ready(() => {
    icons.github = new Icon("github-alt", 1);
    icons.donate = new Icon("dollar", 1);
    icons.twitter = new Icon("twitter", 1);
    icons.contact = new Icon("address-card-o", 2);
    icons.blog = new Icon("file-text-o", 2);
    icons.tools = new Icon("wrench", 2);
});

function animateHover(icon) {

}

class Icon {
    constructor(type, list) {
        $("#items" + list).append(
            $("<li>").append(
                $("<div>").attr("id", type).attr("class", "icon").append(
                    $("<i>").attr("class", "fa fa-2x fa-" + type))));
        this.elem = $("#" + type);
    }

    onClick() {

    }
}
const $ = require("jquery");

const icons = {};

$(document).ready(() => {
    icons.github = new Icon("github-alt", 1, "https://github.com/Deanveloper", "GitHub");
    icons.twitter = new Icon("twitter", 1, "https://twitter.com/Deanveloper", "Twitter");
    icons.donate = new Icon("dollar", 1, "https://paypal.me/Dean98", "Donate");
    icons.email = new Icon("address-card-o", 2, "mailto:dean@deanveloper.com", "Email");
    icons.blog = new Icon("file-text-o", 2, "https://blog.deanveloper.com", "Blog [Coming Soon]");
    icons.tools = new Icon("wrench", 2, "https://www.deanveloper.com/tools", "Tools [Coming Soon]");
});

class Icon {
    constructor(type, list, link, tooltip) {
        $("#items" + list)
            .append($("<li>")
                .append($("<div>").attr("id", type).attr("class", "icon")
                    .append($("<i>").attr("class", "fa fa-2x fa-" + type)))
                .append($("<span>").attr("class", "tooltip")
                    .append(tooltip))
            );

        this.$elem = $("#" + type);

        this.$elem.mouseup(() => {
            if (!tooltip.endsWith("[Coming Soon]")) {
                window.location.href = link
            }
        });
    }
}
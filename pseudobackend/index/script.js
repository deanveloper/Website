const $ = require("jquery");

const icons = {};

$(document).ready(() => {
    icons.github = new Icon("github-alt", 1, "https://github.com/Deanveloper", "GitHub");
    icons.twitter = new Icon("twitter", 1, "https://twitter.com/Deanveloper", "Twitter");
    icons.donate = new Icon("dollar", 1, "https://paypal.me/Dean98", "Donate");
    icons.email = new Icon("address-card-o", 2, "mailto:dean@deanveloper.com", "Email");
    icons.blog = new Icon("file-text-o", 2, "https://blog.deanveloper.com", "Blog");
    icons.tools = new Icon("wrench", 2, "https://www.deanveloper.com/tools", "Tools [Coming Soon]");
});

class Icon {
    constructor(type, list, link, tooltip) {
        $("#items" + list)
            .append($("<li>")
                .append($("<a>").attr({href: link})
                    .append($("<span>").attr({id: type, class: "icon divSpan"})
                        .append($("<i>").attr({class: "fa fa-2x fa-" + type})))
                    .append($("<span>").attr("class", "tooltip")
                        .append(tooltip)))
            );

        this.$elem = $("#" + type);

        this.$elem.click((e) => {
            if (!tooltip.endsWith("[Coming Soon]")) {
                const a = $("<a>");
                a.attr({href: link});
                this.$elem.append(a);
                a.trigger("click", e);
            }
        });
    }
}
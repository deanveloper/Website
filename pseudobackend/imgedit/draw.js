import {tools} from "./tools";
import {$, pushNewCanvas} from "./script";

export let color = "#FFF";

export function currentTool() {
    const name = $("#tools").find("label:has(input:checked)").attr("id");
    for (const tool of tools) {
        if (tool.name === name) {
            return tool;
        }
    }
}

export function init() {
    pushNewCanvas();

    const $toolsWrapper = $("<div id='toolsWrapper' class='no-select'>");
    const $tools = $("<div id='tools'>");

    for (const tool of tools) {

        const $container = $("<div class='container'>");
        const $label = $("<label class='tool' id='" + tool.name + "'>");
        const $button = $("<input type='radio' name='editortools'>");
        const $span = $("<span class='buttonspan'>");

        const $tooltip = $("<span class='tooltip'>");
        $tooltip.html(tool.name);
        $container.append($tooltip);

        $label.append($button);
        $label.append($span);

        $container.append($label);

        $tools.append($container);

        if (tool === tools[0]) {
            $button.attr({checked: true})
        }

        $span.addClass("fa fa-2x fa-" + tool.icon);

        $toolsWrapper.append($tools);
        $("main").append($toolsWrapper);
    }
}
import {tools} from "./tools";
import {$, peekCanvas, pushNewCanvas} from "./script";

export let color = "#000";

export function currentTool() {
    return $("#tools").find("> label:has(input:checked)").attr("id");
}

export function init() {
    pushNewCanvas();

    const $tools = $("<div id='tools'>");
    $tools.css({position: "fixed"});

    for (const tool of tools) {

        const $label = $("<label class='tool' id='" + tool.name + "'>");
        const $button = $("<input type='radio' name='editortools'>");
        const $span = $("<span class='buttonspan'>");

        /*const $tooltip = $("<span class='tooltip'>");
        $tooltip.html(tool.name);
        $label.append($tooltip);*/

        $label.append($button);
        $label.append($span);

        $tools.append($label);

        if(tool === tools[0]) {
            $button.attr({checked: true})
        }

        $span.addClass("fa fa-2x fa-" + tool.icon);

        $("body").append($tools);
    }
}
import {tools} from "./tools";
import {$, pushNewCanvas, drawCanvas} from "./script";

let previousSelection;

export function currentTool() {
    const name = $("#tools").find("label:has(input:checked)").attr("id");
    return getTool(name);
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

        if(tool.init) {
            tool.init();
        }

        $button.change((e) => {

            if (tool.cursor) {
                $(drawCanvas).css({cursor: tool.cursor});
            }

            if (tool.onSelect) {
                tool.onSelect();
            }

            if (tool.noSticky) {
                previousSelection.trigger("click");
                return;
            }

            previousSelection = $button;
        });

    }
}

function getTool(name) {
    for (const tool of tools) {
        if (tool.name === name) {
            return tool;
        }
    }

    return tools[0];
}
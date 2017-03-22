import {tools} from "./tools";
import {$, pushNewCanvas, drawCanvas, image} from "./script";

let previousSelection;

export function currentTool() {
    const name = $("#tools").find("label:has(input:checked)").attr("id");
    return getTool(name);
}

export function init() {
    pushNewCanvas();

    drawExports();

    const $toolsWrapper = $("<div id='toolsWrapper' class='no-select'>");
    const $tools = $("<div id='tools'>");

    for (const tool of tools) {

        const $container = $("<div class='container'>");
        const $label = $(`<label class='item' id='${tool.name}'>`);
        const $button = $("<input type='radio' name='editortools'>");
        const $span = $("<span class='buttonspan'>");

        const $tooltip = $("<span class='tooltip below'>");
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

function drawExports() {
    const $exportsWrapper = $("<div id='exportsWrapper' class='no-select'>");
    const $exports = $("<div id='exports'>");
    $exportsWrapper.append($exports);

    const save = {
        container: $("<div class='container'>"),
        span: $("<span class='buttonspan fa fa-2x fa-floppy-o'>"),
        tooltip: $("<span class='tooltip above'>").html("Save")
    };
    const share = {
        container: $("<div class='container'>"),
        span: $("<span class='buttonspan fa fa-2x fa-share-square-o'>"),
        tooltip: $("<span class='tooltip above'>").html("Share")
    };
    for (const method of [save,share]) {
        method.container.append(method.tooltip);
        method.container.append(method.span);
        method.container.css({cursor: "pointer"});

        $exports.append(method.container);
    }

    save.container.click((e) => {
        const name = prompt("File Name (without extension)", "image");
        if(name) {
            const a = $("<a>").attr({
                href: image().src,
                download: name + ".png"
            });

            a.trigger("click");
        }
    });

    share.container.click((e) => {
        const $modal = $("<div>").attr({
            id: "modal",
            title: "Share to..."
        });

        $modal.dialog({
            modal: true
        });


    });
}

function getTool(name) {
    for (const tool of tools) {
        if (tool.name === name) {
            return tool;
        }
    }

    return tools[0];
}
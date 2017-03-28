import {tools} from "./tools";
import {$, pushNewCanvas, drawCanvas, flattened, modal} from "./script";

let previousButton;

export function currentTool() {
    const name = $("#tools").find("label:has(input:checked)").attr("id");
    return getTool(name);
}

export function init() {
    pushNewCanvas();

    drawTools();

    drawExports();
}

function drawTools() {
    const $toolsWrapper = $("<div id='toolsWrapper' class='noSelect'>");
    const $tools = $("<div id='tools'>");

    for (const tool of tools) {

        const $container = $("<div class='container'>");
        const $label = $(`<label class='item' id='${tool.name}'>`);
        const $button = $("<input type='radio' name='editortools'>");
        const $icon = $("<i class='icon'>");

        if (tool.name === "Cursor") {
            previousButton = $button;
        }

        const $tooltip = $("<span class='tooltip below'>");
        $tooltip.html(tool.name);
        $container.append($tooltip);

        $label.append($button);
        $label.append($icon);

        $container.append($label);

        $tools.append($container);

        if (tool === tools[0]) {
            $button.attr({checked: true})
        }

        $icon.addClass("fa fa-2x fa-" + tool.icon);

        $toolsWrapper.append($tools);
        $("main").append($toolsWrapper);

        if (tool.init) {
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
                previousButton.trigger("click");
                return;
            }

            previousButton = $button;
        });
    }
}

function drawExports() {
    const $exportsWrapper = $("<div id='exportsWrapper' class='noSelect'>");
    const $exports = $("<div id='exports'>");
    $exportsWrapper.append($exports);

    const save = {
        container: $("<div class='container'>"),
        label: $(`<label class='item' id='savelbl'>`),
        span: $("<span class='icon fa fa-2x fa-floppy-o'>"),
        tooltip: $("<span class='tooltip above'>").html("Save")
    };
    const share = {
        container: $("<div class='container'>"),
        label: $(`<label class='item' id='sharelbl'>`),
        span: $("<span class='icon fa fa-2x fa-share-square-o'>"),
        tooltip: $("<span class='tooltip above'>").html("Share")
    };
    for (const method of [save, share]) {
        method.container.append(method.label);
        method.label.append(method.span);
        method.label.append(method.tooltip);

        $exports.append(method.container);
    }

    save.container.click((e) => {
        const name = prompt("File Name (without extension)", "image");
        if (name) {
            const a = $("<a>");

            a.click((e) => {
                a.attr({
                    href: flattened().toDataURL("image/png"),
                    download: name + ".png"
                });
            });

            $("body").append(a);
            a[0].click(); // simply doing a.click() doesn't work for some reason.
            a.remove();
        }
    });

    share.container.click((e) => {
        const base64 = flattened().toDataURL("image/png").substring(22);

        $.ajax("https://api.imgur.com/3/upload", {
            method: "POST",
            data: {
                image: base64,
                type: "base64",
                name: "image.png"
            },
            headers: {
                Authorization: "Client-ID 224c4872112fea2"
            },
            dataType: "json"
        })
            .fail(e => console.error(e.responseJSON.data))
            .done(data => {
                const win = window.open("https://imgur.com/" + data.data.id, "_blank");
                if (win) {
                    win.focus();
                } else {
                    alert("Please enable popups for this website!");
                }
            });
    });

    $("main").append($exportsWrapper)
}

function getTool(name) {
    for (const tool of tools) {
        if (tool.name === name) {
            return tool;
        }
    }

    return tools[0];
}
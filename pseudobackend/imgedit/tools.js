import {$, image, getCanvas, newBase} from "./script";

let tools = [Pointer, Brush, Line, Censor];
let color = "#000";
let select = 0;

export function init() {

    if (!Function.prototype.getName) {
        Function.prototype.getName = function () {

        }
    }

    const $tools = $("<ul>");
    for (const tool of tools) {
        const $tool = $("<li class='tool'>");
        $tool.attr({alt: tool.constructor.name});
    }
}

/**
 * doesn't do anything
 */
class Pointer {
    static get icon() {
        return "mouse-pointer";
    }

    static mousedown(e, canvas) {
    }

    static mousedrag(e, canvas) {
    }

    static mouseup(e, canvas) {
    }
}

/**
 * brush that brushes
 */
class Brush {
    static get icon() {
        return "paint-brush";
    }

    static mousedown(e, canvas) {
        const ctx = canvas.getContext('2d');

        ctx.strokeStyle = color;
        ctx.lineWidth = Brush.radius;
        ctx.moveTo(e.clientX, e.clientY);
    }

    static mousedrag(e, canvas) {
        const ctx = canvas.getContext('2d');
        ctx.moveTo(e.clientX - e.movementX, e.clientY - e.movementY);
        ctx.lineTo(e.clientX, e.clientY);
    }

    static mouseup(e, canvas) {
        Brush.mousedrag(e, canvas);
    }
}

/**
 * line tool makes nice straight lines
 */
class Line {
    static get icon() {
        return "minus";
    }

    static mousedown(e, canvas) {
        const ctx = canvas.getContext('2d');

        Line.startX = e.clientX;
        Line.startY = e.clientY;

        ctx.strokeStyle = color;
        ctx.lineWidth = Line.radius;
        ctx.moveTo(e.clientX, e.clientY);
    }

    static mousedrag(e, canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.moveTo(Line.startX, Line.startY);
        ctx.lineTo(e.clientX, e.clientY);
    }

    static mouseup(e, canvas) {
        Brush.mousedrag(e, canvas);
    }
}

class Crop {
    static get icon() {
        return "crop";
    }

    static mousedown(e, canvas) {
        const ctx = canvas.getContext('2d');

        Crop.startX = e.clientX;
        Crop.startY = e.clientY;

        ctx.fillStyle = "black";
        ctx.globalAlpha = "50%";

        ctx.strokeStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.moveTo(e.clientX, e.clientY);
    }

    static mousedrag(e, canvas) {
        const ctx = canvas.getContext('2d');

        Crop.endX = e.clientX;
        Crop.endY = e.clientY;

        ctx.strokeStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "red";
        ctx.clearRect(Crop.startX, Crop.startY, e.clientX, e.clientY);
        ctx.strokeRect(Crop.startX, Crop.startY, e.clientX, e.clientY);
    }

    static mouseup(e, canvas) {
        Brush.mousedrag(e, canvas);

        if (confirm("Are you sure? This operation cannot be undone!")) {
            const flat = image(true);

            const $newCan = $("<canvas>");
            const start = {
                x: Math.min(Crop.startX, Crop.endX),
                y: Math.min(Crop.startY, Crop.endY)
            };
            const end = {
                x: Math.max(Crop.startX, Crop.endX),
                y: Math.max(Crop.startY, Crop.endY)
            };
            $newCan.attr({
                width: end.x - start.x,
                height: end.y - start.y
            });
            $newCan[0].getContext('2d').drawImage(
                flat,               // image
                start.x,            // source x
                start.y,            // source y
                end.x - start.x,    // source/dest width
                end.y - start.y,    // source/dest height
                0,                  // dest x
                0                   // dest y
            );

            newBase($newCan);
        }
    }
}

/**
 * censor tool pixelates stuff behind it
 */
class Censor {
    static get icon() {
        return "paint-brush";
    }

    static mousedown(e, canvas) {
        const ctx = canvas.getContext('2d');

        Censor.startX = e.clientX;
        Censor.startY = e.clientY;

        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.moveTo(e.clientX, e.clientY);
    }

    static mousedrag(e, canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeRect(Censor.startX, Censor.startY, e.clientX - Censor.startX, e.clientY - Censor.startY)
    }

    static mouseup(e, canvas) {
        Brush.mousedrag(e, canvas);

        const start = {x: Line.startX, y: Line.startY};
        const change = {x: e.clientX - start.x, y: e.clientY - start.y};

        if (change.x < 0) {
            start.x += change.x;
            change.x = -change.x;
        }
        if (change.y < 0) {
            start.y += change.y;
            change.y = -change.y;
        }

        const flat = image(true);
        const ctx = flat.getContext('2d');

        const data = ctx.getImageData(start.x, start.y, change.x, change.y);

        // start(X|Y) represent the start of a pixellated part
        for (let startX = start.x; startX < start.x + change.x; startX += 20) {
            for (let startY = start.y; startY < start.y + change.y; startY += 20) {
                let size = 0;
                const avg = [0, 0, 0, 0]; // average r, g, b, a

                // sums all pixels into array
                for (let i = 0; i < 20; i++) {
                    for (let j = 0; j < 20; j++) {
                        if (startX + i > change.x || startY + j > change.y) {
                            continue;
                        }
                        const index = 4 * (startY * change.x + startX);
                        avg[0] += data.data[index];
                        avg[1] += data.data[index + 1];
                        avg[2] += data.data[index + 2];
                        avg[3] += data.data[index + 3];

                        size++;
                    }
                }

                for(let i in [0, 1, 2, 3]) {
                    avg[index] = avg[index] / size;
                }

                for (let i = 0; i < 20; i++) {
                    for (let j = 0; j < 20; j++) {
                        if (startX + i > change.x || startY + j > change.y) {
                            continue;
                        }
                        const index = 4 * (startY * change.x + startX);
                        data.data[index] = avg[0];
                        data.data[index + 1] = avg[1];
                        data.data[index + 2] = avg[2];
                        data.data[index + 3] = avg[3];
                    }
                }
            }
        } // end loop

        canvas.getContext('2d').putImageData(data, 0, 0);
    }
}
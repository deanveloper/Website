import {$, image, newBase} from "./script";
import {color} from "./draw"

/**
 * doesn't do anything
 */
export class Cursor {
    static get doNothing() {
        return true;
    }

    static get name() {
        return "Cursor"
    }

    static get icon() {
        return "mouse-pointer";
    }

    static get cursor() {
        return "default";
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
export class Brush {
    static get name() {
        return "Brush"
    }

    static get icon() {
        return "paint-brush";
    }

    static get cursor() {
        return "pointer";
    }

    static mousedown(e, canvas) {
        const ctx = canvas.getContext('2d');
        const x = e.offsetX;
        const y = e.offsetY;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 10;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(x, y);
    }

    static mousedrag(e, canvas) {
        const ctx = canvas.getContext('2d');

        const x = e.offsetX;
        const y = e.offsetY;

        ctx.lineTo(x, y);
        ctx.stroke();
    }

    static mouseup(e, canvas) {
        Brush.mousedrag(e, canvas);
    }
}

/**
 * line tool makes nice straight lines
 */
export class Line {
    static get name() {
        return "Line"
    }

    static get icon() {
        return "minus";
    }

    static get cursor() {
        return "crosshair";
    }

    static mousedown(e, canvas) {
        const ctx = canvas.getContext('2d');

        const x = e.offsetX;
        const y = e.offsetY;

        Line.startX = x;
        Line.startY = y;

        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
    }

    static mousedrag(e, canvas) {
        const ctx = canvas.getContext('2d');
        const x = e.offsetX;
        const y = e.offsetY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(Line.startX, Line.startY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    static mouseup(e, canvas) {
        Line.mousedrag(e, canvas);
    }
}

/**
 * Crops an image (irreversable)
 */
export class Crop {
    static get name() {
        return "Crop"
    }

    static get icon() {
        return "crop";
    }

    static get cursor() {
        return "crosshair";
    }

    static mousedown(e, canvas) {
        const ctx = canvas.getContext('2d');

        Crop.startX = e.offsetX;
        Crop.startY = e.offsetY;

        ctx.fillStyle = "black";
        ctx.globalAlpha = "50%";

        ctx.strokeStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.moveTo(e.offsetX, e.offsetY);
    }

    static mousedrag(e, canvas) {
        const ctx = canvas.getContext('2d');

        Crop.endX = e.offsetX;
        Crop.endY = e.offsetY;

        ctx.strokeStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "red";
        ctx.clearRect(Crop.startX, Crop.startY, e.offsetX, e.offsetY);
        ctx.strokeRect(Crop.startX, Crop.startY, e.offsetX, e.offsetY);
    }

    static mouseup(e, canvas) {
        Crop.mousedrag(e, canvas);

        if (confirm("Are you sure? This operation cannot be undone!")) {
            canvas.getContext('2d').clearRect(Crop.startX, Crop.startY, e.offsetX, e.offsetY);
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
export class Censor {
    static get name() {
        return "Censor"
    }

    static get icon() {
        return "times-rectangle";
    }

    static get cursor() {
        return "crosshair";
    }

    static mousedown(e, canvas) {
        const ctx = canvas.getContext('2d');

        Censor.startX = e.offsetX;
        Censor.startY = e.offsetY;

        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    static mousedrag(e, canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeRect(Censor.startX, Censor.startY, e.offsetX - Censor.startX, e.offsetY - Censor.startY)
    }

    static mouseup(e, canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const start = {x: Censor.startX, y: Censor.startY};
        const change = {x: e.offsetX - start.x, y: e.offsetY - start.y};

        if (change.x < 0) {
            start.x += change.x;
            change.x = -change.x;
        }
        if (change.y < 0) {
            start.y += change.y;
            change.y = -change.y;
        }
        change.x = Math.min(change.x, canvas.width - start.x);
        change.y = Math.min(change.y, canvas.height - start.y);

        const flat = image(true);
        const flatctx = flat.getContext('2d');

        // start(X|Y) represent the start of a pixellated part
        for (let startX = start.x; startX < start.x + change.x; startX += 20) {
            for (let startY = start.y; startY < start.y + change.y; startY += 20) {
                const avg = [0, 0, 0]; // average r, g, b, a

                const width = Math.min(10, start.x + change.x - startX);
                const height = Math.min(10, start.y + change.y - startY);

                const data = flatctx.getImageData(startX, startY, width, height).data;

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < width; y++) {
                        const index = 4 * (y * width + x);

                        avg[0] += data[index];     // red
                        avg[1] += data[index + 1]; // green
                        avg[2] += data[index + 2]; // blue
                        // index + 3 is alpha. not needed.
                    }
                }

                for (let i = 0; i < avg.length; i++) {
                    avg[i] /= (width * height);
                    avg[i] = Math.round(avg[i]);
                }

                ctx.fillStyle = "#" + avg[0].toString(16) + avg[1].toString(16) + avg[2].toString(16);
                ctx.fillRect(startX, startY, width, height);
            }
        } // end loop
    }
}

export const tools = [Cursor, Brush, Line, Crop, Censor];
export function init() {

}

let color = "#000";
let Selected = Pointer;

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
        return "paint-brush";
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

        ctx.strokeStyle = color;
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
    }
}
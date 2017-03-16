import {$, ctx, $canvas} from "./script"

export function init() {

}

class Pen {

    constructor() {
        this.radius = 5;
    }

    select() {
        let start;

        $canvas.mousedown((e) => {
            if (e.button === 2) {
                start = {
                    x: e.clientX,
                    y: e.clientY
                }
            }

            ctx.lineWidth = this.radius;
            ctx.moveTo()
        });

    }

    unselect() {

    }

}
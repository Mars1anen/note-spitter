import { CanvasButton } from "../../models";

export class PauseButton extends CanvasButton {
    constructor(
        canvasSize: { x: number, y: number}
    ) {
        super(
            50,
            canvasSize.y / 2 - 20,
            20,
            () => console.log('Pause clicked')
        );
    }

    drawInsides() {
        console.log('Drawing pause button');
    }
}
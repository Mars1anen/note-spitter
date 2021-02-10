import { CanvasButton } from '../../models';
import { NoteGeneratorService } from '../../services/note-generator.service';

export class PauseButton extends CanvasButton {
    buttonSize: number;
    centerX: number;
    centerY: number;
    constructor(
        canvasSize: { x: number; y: number },
        private noteGenerator: NoteGeneratorService
    ) {
        super('pauseBtn', 50, canvasSize.y / 2 - 20, 20, () => {
            if (!this.noteGenerator.isPaused()) {
                this.noteGenerator.pauseTimer();
            } else {
                this.noteGenerator.unpauseTimer();
            }
        });
        this.buttonSize = 20 * 2;
        this.centerX = 50;
        this.centerY = canvasSize.y / 2;
    }

    drawInsides(cx: CanvasRenderingContext2D) {
        cx.fillStyle = '#000000';
        if (!this.noteGenerator.isPaused()) {
            cx.fillRect(
                this.centerX - this.buttonSize / 6,
                this.centerY - this.buttonSize / 4,
                this.buttonSize / 8,
                this.buttonSize / 2
            );
            cx.fillRect(
                this.centerX + this.buttonSize / 16,
                this.centerY - this.buttonSize / 4,
                this.buttonSize / 8,
                this.buttonSize / 2
            );
        } else {
            cx.beginPath();
            cx.moveTo(this.centerX - this.buttonSize / 8, this.centerY - this.buttonSize / 4);
            cx.lineTo(
              this.centerX + this.buttonSize / 4,
              this.centerY
            );
            cx.lineTo(
                this.centerX - this.buttonSize / 8,
              this.centerY + this.buttonSize / 4
            );
            cx.lineTo(this.centerX - this.buttonSize / 8, this.centerY - this.buttonSize / 4);
            cx.fill();
        }
    }
}

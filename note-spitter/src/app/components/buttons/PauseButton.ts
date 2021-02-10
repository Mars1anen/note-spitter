import { CanvasButton } from '../../models';

export class PauseButton extends CanvasButton {
  buttonSize: number;
  centerX: number;
  centerY: number;
  constructor(canvasSize: { x: number; y: number }) {
    super('pauseBtn', 50, canvasSize.y / 2 - 20, 20, () =>
      console.log('Pause clicked')
    );
    this.buttonSize = 20 * 2;
    this.centerX = 50;
    this.centerY = canvasSize.y / 2;
  }

  drawInsides(cx: CanvasRenderingContext2D) {
    cx.fillStyle = '#000000';
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
  }
}

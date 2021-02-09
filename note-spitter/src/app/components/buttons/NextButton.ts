import { CanvasButton } from '../../models';

export class NextButton extends CanvasButton {
  buttonSize: number;
  centerX: number;
  centerY: number;
  constructor(canvasSize: { x: number; y: number }) {
    super('nextBtn', canvasSize.x - 50, canvasSize.y / 2 - 20, 20, () =>
      console.log('Next clicked')
    );
    this.buttonSize = 20 * 2;
    this.centerX = canvasSize.x - 50;
    this.centerY = canvasSize.y / 2 - 20;
  }

  drawInsides(cx: CanvasRenderingContext2D) {
    cx.fillStyle = '#000000';
    cx.fillRect(
      this.centerX - this.buttonSize / 3,
      this.centerY - this.buttonSize / 12,
      this.buttonSize / 2,
      this.buttonSize / 6
    );
    cx.beginPath();
    cx.moveTo(this.centerX + this.buttonSize / 3, this.centerY);
    cx.lineTo(
      this.centerX + this.buttonSize / 8,
      this.centerY + this.buttonSize / 6
    );
    cx.lineTo(
      this.centerX + this.buttonSize / 8,
      this.centerY - this.buttonSize / 6
    );
    cx.lineTo(this.centerX + this.buttonSize / 3, this.centerY);
    cx.fill();
  }
}

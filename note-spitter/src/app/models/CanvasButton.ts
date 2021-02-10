import { CanvasElement } from './CanvasElement';

export abstract class CanvasButton extends CanvasElement {
  constructor(
    public name: string,
    public centerX: number,
    public centerY: number,
    public radius: number,
    private handler: () => any
  ) {
    super(name);
  }

  public abstract drawInsides(cx: CanvasRenderingContext2D): void;

  public checkIfButtonClicked(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;
    const bX1 = this.centerX - this.radius;
    const bX2 = this.centerX + this.radius;
    const bY1 = this.centerY - this.radius;
    const bY2 = this.centerY + this.radius;
    if (x > bX1 && x < bX2 && y > bY1 && y < bY2) {
      this.handler();
    }
  }
}

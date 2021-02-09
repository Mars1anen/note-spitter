import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CanvasButton } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CanvasHelperService {
  cx: CanvasRenderingContext2D;
  height: number;
  width: number;
  get centerY() {
    return this.height / 2;
  }
  get centerX() {
    return this.width / 2;
  }

  constructor() {}

  clearCanvas() {
    this.cx.clearRect(0, 0, this.width, this.height);
  }

  drawMiddleGuides() {
    this.cx.beginPath();
    this.cx.moveTo(0, this.centerY);
    this.cx.lineTo(this.width, this.centerY);
    this.cx.stroke();
    this.cx.beginPath();
    this.cx.moveTo(this.width / 2, 0);
    this.cx.lineTo(this.width / 2, this.height);
    this.cx.stroke();
  }

  drawButton(button: CanvasButton) {
    const buttonCenterX = button.centerX;
    const buttonCenterY = button.centerY;
    const radius = button.radius;
    this.cx.fillStyle = '#ffffff';
    this.cx.beginPath();
    this.cx.arc(buttonCenterX, buttonCenterY, radius, 0, Math.PI * 2, true);
    this.cx.fill();
    this.cx.stroke();
    button.drawInsides(this.cx);
  }

  drawText(note: string, fontSize: number) {
    this.clearCanvas();
    if (!this.cx) {
      console.error(`Rendering context not set`);
    } else {
      this.cx.font = `${fontSize}px serif`;
      this.cx.textAlign = 'center';
      this.cx.textBaseline = 'middle';
      this.cx.fillText(`${note}`, this.centerX, this.centerY, this.width);
    }
  }

  setCurrentContext(
    canvas: HTMLCanvasElement,
    height: number,
    width: number,
    buttons: CanvasButton[]
  ): Subject<any> {
    const teardown$ = new Subject();
    const subject$ = new Subject<MouseEvent>();
    fromEvent<MouseEvent>(canvas, 'click').subscribe(subject$);
    subject$
      .pipe(takeUntil(teardown$))
      .subscribe((event: MouseEvent) =>
        buttons.forEach((btn) => btn.checkIfButtonClicked(event))
      );
    const cx = canvas.getContext('2d');
    if (cx) {
      this.cx = cx;
    } else {
      throw new Error('Failed to initialize canvas');
    }
    this.height = height;
    this.width = width;
    buttons.forEach((btn) => this.drawButton(btn));
    return teardown$;
  }
}
import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { CanvasButton, CanvasElements } from '../models';
import { DrawQueueService } from './draw-queue.service';
import { NoteGeneratorService } from './note-generator.service';

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

    constructor(
        private notesGenerator: NoteGeneratorService,
        private queueService: DrawQueueService
    ) { }

    clearCanvas() {
        this.cx.clearRect(0, 0, this.width, this.height);
    }

    drawButton(button: CanvasButton) {
        const fn = (() => {
            const buttonCenterX = button.centerX;
            const buttonCenterY = button.centerY;
            const radius = button.radius;
            this.cx.fillStyle = '#ffffff';
            this.cx.beginPath();
            this.cx.arc(buttonCenterX, buttonCenterY, radius, 0, Math.PI * 2, true);
            this.cx.fill();
            this.cx.stroke();
            button.drawInsides(this.cx);
        }).bind(this);
        this.queueService.queueDelayedDraw(button.name, fn);
    }

    drawLoader(width: number) {
        const fnct = (() => {
            const fraction = this.notesGenerator.getFractionOfTimePassed();
            const unfilledColour = '#829FD9';
            const filledColour = '#230A59';
            this.cx.fillStyle = unfilledColour;
            this.cx.beginPath();
            this.cx.fillRect(this.centerX - width / 2, this.height - 60, width, 10);
            this.cx.beginPath();
            this.cx.fillStyle = filledColour;
            this.cx.fillRect(this.centerX - width / 2, this.height - 60, width * fraction / 100, 10);
            this.cx.fillStyle = '000000';
        }).bind(this);
        this.queueService.queueDelayedDraw(CanvasElements.LOADER, fnct);
    }

    drawMiddleGuides() {
        const fnct = (() => {
            this.cx.beginPath();
            this.cx.moveTo(0, this.centerY);
            this.cx.lineTo(this.width, this.centerY);
            this.cx.stroke();
            this.cx.beginPath();
            this.cx.moveTo(this.width / 2, 0);
            this.cx.lineTo(this.width / 2, this.height);
            this.cx.stroke();
        }).bind(this);
        this.queueService.queueDelayedDraw(CanvasElements.MIDDLE_GUIDES, fnct);
    }

    drawText(note: string, fontSize: number) {
        console.log(`Drawing text: notes is - ${note}`)
        const fnct = ((text: string) => {
            this.cx.font = `${fontSize}px serif`;
            this.cx.textAlign = 'center';
            this.cx.textBaseline = 'middle';
            this.cx.fillText(`${note}`, this.centerX, this.centerY, this.width);
        }).bind(this, note);
        this.queueService.queueDelayedDraw(CanvasElements.NOTES, fnct);
    }

    setCurrentContext(
        canvas: HTMLCanvasElement,
        height: number,
        width: number,
        buttons: CanvasButton[]
    ): Subject<any> {
        /**
         * A way to kill current canvas instance after component death
         */
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
        buttons.forEach(btn => this.drawButton(btn));
        this.startDrawingLoop();
        return teardown$;
    }

    startDrawingLoop() {
        window.requestAnimationFrame((() => {
            this.clearCanvas();
            const drawingFns = this.queueService.returnQueue();
            drawingFns.forEach(fn => fn());
            this.startDrawingLoop();
        }).bind(this));
    }
}

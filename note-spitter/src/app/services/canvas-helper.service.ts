import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CanvasHelperService {
    cx: CanvasRenderingContext2D;
    height: number;
    width: number;
    get centerY() {
        return this.height / 2;
    };
    get centerX() {
        return this.width / 2;
    };;

    constructor() { }

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

    dNext(buttonSize: number) {
        const buttonCenterX = this.width - (50 + buttonSize / 2);
        const buttonCenterY = this.height / 2;
        const radius = buttonSize / 2;
        this.cx.fillStyle = '#ffffff';
        this.cx.beginPath();
        this.cx.arc(buttonCenterX, buttonCenterY, radius, 0, Math.PI * 2, true);
        this.cx.fill();
        this.cx.stroke();
        this.cx.fillStyle = '#000000';
        this.cx.fillRect(buttonCenterX - buttonSize / 3, buttonCenterY - buttonSize / 12, buttonSize / 2, buttonSize / 6);
        this.cx.beginPath();
        this.cx.moveTo(buttonCenterX + buttonSize / 3, buttonCenterY);
        this.cx.lineTo(buttonCenterX + buttonSize / 8, buttonCenterY + buttonSize / 6);
        this.cx.lineTo(buttonCenterX + buttonSize / 8, buttonCenterY - buttonSize / 6);
        this.cx.lineTo(buttonCenterX + buttonSize / 3, buttonCenterY);
        this.cx.fill();
    }

    dPause(buttonSize: number) {
        const buttonCenterX = 50 + buttonSize / 2;
        const buttonCenterY = this.height / 2;
        const radius = buttonSize / 2;
        this.cx.fillStyle = '#ffffff';
        this.cx.beginPath();
        this.cx.arc(buttonCenterX, buttonCenterY, radius, 0, Math.PI * 2, true);
        this.cx.fill();
        this.cx.stroke();
        this.cx.fillStyle = '#000000';
        this.cx.fillRect(buttonCenterX - buttonSize / 6, buttonCenterY - buttonSize / 4, buttonSize / 8, buttonSize / 2);
        this.cx.fillRect(buttonCenterX + buttonSize / 16, buttonCenterY - buttonSize / 4, buttonSize / 8, buttonSize / 2);
    }

    drawText(note: string, fontSize: number) {
        if (!this.cx) {
            console.error(`Rendering context not set`);
        }
        else {
            this.cx.font = `${fontSize}px serif`;
            this.cx.textAlign = 'center';
            this.cx.textBaseline = 'middle';
            this.cx.fillText(`${note}`, this.centerX, this.centerY, this.width);
        }
    }

    setCurrentContext(cx: CanvasRenderingContext2D, height: number, width: number) {
        this.cx = cx;
        this.height = height;
        this.width = width;
    }
}

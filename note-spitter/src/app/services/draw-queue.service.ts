import { Injectable } from '@angular/core';

/**
 * Service to manage drawing queues of the elements, that we want to draw on canvas
 */
@Injectable({
    providedIn: 'root'
})
export class DrawQueueService {
    /**
     * Dictionary of elements to draw to canvas
     */
    pool: { [key: string]: {(): void}} = {};
    constructor() { }



    queueDelayedDraw(fName: string, drawingFunc: () => void) {
        this.addToQueue(fName, drawingFunc);
    }

    returnQueue(): {(): void}[] {
        return Object.values(this.pool);
    }

    private addToQueue(fName: string, fn: () => void) {
        this.pool[fName] = fn;
    }
}

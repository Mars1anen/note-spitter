import { Injectable } from '@angular/core';
import { interval, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, startWith, take, tap, withLatestFrom } from 'rxjs/operators';

import { Notes } from '../models';

/**
 * State:
 * - Current running interval
 * - Current notes array
 * - Last emission timestamp
 * 
 * APIs:
 * - A way to get a stream of randomized notes *
 * - A way to get a fraction of time that passed since last emission *
 */
@Injectable({
    providedIn: 'root'
})
export class NoteGeneratorService {
    emitter$ = new ReplaySubject(1);
    fraction: number = 0;
    /**
     * Emits fractions of time to new emition as percentages
     */
    internalTimer$: Subject<number> = new Subject();
    interval: number = 5000;
    lastEmissionTS: number = 0;
    /**
     * Flag to pause countdown
     */
    timePaused = false;
    constructor() {
        this.setUpInternalTimer();
    }

    changeInterval(newInterval: number) {
        // TODO
    }

    getFractionOfTimePassed(): number {
        return this.fraction;
    }

    getRandomizedNotesStream(): Observable<any> {
        return this.internalTimer$.asObservable()
            .pipe(
                startWith(100),
                filter(fraction => fraction === 100),
                map(() => this.getRandomNote())
            );
    }

    nextEmission() {
        this.internalTimer$.next(100);
    }

    pauseTimer() {
        this.timePaused = true;
    }

    unpauseTimer() {
        this.timePaused = false;
    }

    private setUpInternalTimer() {
        const loop = (() => {
            let fraction;
            if (this.timePaused) {
                fraction = this.fraction;
                this.lastEmissionTS = new Date().getTime() - Math.round(this.interval * fraction / 100);
            } else {
                fraction = Math.round((new Date().getTime() - this.lastEmissionTS) / this.interval * 100);
            }
            const safeFraction = fraction > 100 ? 100 : fraction;
            this.internalTimer$.next(safeFraction);
            this.fraction = safeFraction;
            window.requestAnimationFrame(loop);
        }).bind(this);
        window.requestAnimationFrame(loop);
    }

    private getRandomNote(): Notes {
        const idx = Math.ceil(Math.random() * 12);
        const zeroBased = idx === 12 ? 11 : idx;
        const note = [
            Notes.c,
            Notes.cSharp,
            Notes.d,
            Notes.dSharp,
            Notes.e,
            Notes.f,
            Notes.fSharp,
            Notes.g,
            Notes.gSharp,
            Notes.a,
            Notes.aSharp,
            Notes.b
        ][zeroBased];
        this.lastEmissionTS = new Date().getTime();
        return note;
    }
}

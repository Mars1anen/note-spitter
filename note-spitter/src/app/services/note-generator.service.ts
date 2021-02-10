import { Injectable } from '@angular/core';
import { interval, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';

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
    internalTimer$: Observable<any>;
    interval: number = 5000;
    lastEmissionTS: number = 0;
    private fractionEmitter$ = new Subject<number>();
    constructor() {
        this.setUpFractionEmitter();
        this.newInterval(this.interval);
        this.fractionEmitter$.asObservable().pipe(
            tap(fraction => this.fraction = fraction)
        ).subscribe();
    }

    newInterval(itrl: number) {
        let id = 1;
        this.internalTimer$ = interval(itrl);
        this.internalTimer$.subscribe(this.emitter$);
    }

    getFractionOfTimePassed(): number {
        return this.fraction;
    }
    
    getRandomizedNotesStream(): Observable<any> {
        return this.internalTimer$
            .pipe(
                startWith(this.getRandomNote()),
                map(() => this.getRandomNote())
            );
        // return interval(intrvl)
        //     .pipe(
        //         startWith(null),
        //         map(() => Math.random()),
        //         map((float) => Math.ceil(Math.random() * 12)),
        //         map(idx => {
        //             const zeroBased = idx === 12 ? 11 : idx;
        //             return this.getNotesArray()[zeroBased];
        //         })
        //     );
    }

    pauseTimer() {

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

    private setUpFractionEmitter() {
        const loop = (() => {
            const fraction = Math.round((new Date().getTime() - this.lastEmissionTS) / this.interval * 100);
            this.fractionEmitter$.next(fraction > 100 ? 100 : fraction);
            window.requestAnimationFrame(loop);
        }).bind(this);
        window.requestAnimationFrame(loop);
    }
}

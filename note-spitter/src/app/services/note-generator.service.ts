import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Notes } from '../models';

@Injectable({
    providedIn: 'root'
})
export class NoteGeneratorService {
    constructor() { }

    getNotesArray(): Notes[] {
        return [
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
            ];
    }

    getRandomizedNotesStream(intrvl: number = 5000): Observable<any> {
        return interval(intrvl)
            .pipe(
                startWith(null),
                map(() => Math.random()),
                map((float) => Math.ceil(Math.random() * 12)),
                map(idx => {
                    const zeroBased = idx === 12 ? 11 : idx;
                    return this.getNotesArray()[zeroBased];
                })
            );
    }
}

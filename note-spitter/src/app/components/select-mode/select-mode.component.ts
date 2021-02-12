import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { AppModes } from '../../models';

@Component({
    selector: 'ns-select-mode',
    templateUrl: './select-mode.component.html',
    styleUrls: ['./select-mode.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectModeComponent implements OnInit {
    @Input() activeMode: AppModes;

    fretboardTab = AppModes.FRETBOARD;
    noteSpitterTab = AppModes.NOTE_SPITTER;

    @Output() modeChange = new EventEmitter<AppModes>()
    constructor() { }

    ngOnInit(): void {
    }

}

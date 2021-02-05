import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { NoteGeneratorService } from '../../services/note-generator.service';

@Component({
    selector: 'ns-canvas-zone',
    templateUrl: './canvas-zone.component.html',
    styleUrls: ['./canvas-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasZoneComponent implements OnInit {
    canvasHeight: number = 500;
    canvasWidth: number = 1000;

    constructor(
        private noteGenerator: NoteGeneratorService
    ) {}

    ngOnInit(): void {
    }

}

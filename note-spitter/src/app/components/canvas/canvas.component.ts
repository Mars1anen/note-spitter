import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CanvasHelperService } from '../../services/canvas-helper.service';
import { NoteGeneratorService } from '../../services/note-generator.service';

@Component({
    selector: 'ns-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit, AfterViewInit {
    @Input() height: number;
    @Input() width: number;

    cx: CanvasRenderingContext2D;
    initialized = false;

    @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
    constructor(
        private canvasService: CanvasHelperService,
        private notesGenerator: NoteGeneratorService
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        const context = this.canvas.nativeElement.getContext('2d');
        if (context) {
            this.cx = context;
            this.initialized = true;
            this.canvasService.setCurrentContext(this.cx, this.height, this.width);
            this.notesGenerator.getRandomizedNotesStream().subscribe(note => this.drawTest(`${note}`));
        }
    }

    drawTest(note: string) {
        this.clear();
        const buttonSize = 40;
        const fontSize = 160;
        
        this.canvasService.drawText(note, fontSize);
        // this.canvasService.drawMiddleGuides();
        this.canvasService.dPause(buttonSize);
        this.canvasService.dNext(buttonSize);
    }

    private clear() {
        this.cx.clearRect(0, 0, this.width, this.height);
    }
}

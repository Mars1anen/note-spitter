import {
    Component,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

import { CanvasButton } from '../../models';
import { CanvasHelperService } from '../../services/canvas-helper.service';
import { NoteGeneratorService } from '../../services/note-generator.service';
import { NextButton } from '../../components/buttons/NextButton';
import { PauseButton } from '../../components/buttons/PauseButton';
import { DrawQueueService } from '../../services/draw-queue.service';

@Component({
    selector: 'ns-note-spitter',
    templateUrl: './note-spitter.component.html',
    styleUrls: ['./note-spitter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteSpitterComponent extends OnDestroyMixin implements OnInit {

    buttons: CanvasButton[] = [];
    fontSize = 160;
    constructor(
        private canvasService: CanvasHelperService,
        private notesGenerator: NoteGeneratorService,
        private queueService: DrawQueueService
    ) {
        super();
    }

    ngOnInit(): void {
        this.canvasService.isCanvasReady()
            .pipe(
                first(ready => ready),
                tap(() => {
                    this.canvasService.drawLoader(this.fontSize);
                    this.setUpButtons();
                    this.notesGenerator
                        .getRandomizedNotesStream()
                        .pipe(untilComponentDestroyed(this))
                        .subscribe((note) => this.drawTest(`${note}`));
                })
            ).subscribe();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.queueService.emptyQueue();
    }

    drawTest(note: string) {
        this.canvasService.drawText(note, this.fontSize);
    }

    private setUpButtons(): void {
        const { height, width } = this.canvasService.getCanvasDimensions();
        this.buttons = [
            new PauseButton({ x: width, y: height }, this.notesGenerator),
            new NextButton({ x: width, y: height }, this.notesGenerator),
        ];
        this.buttons.forEach(btn => this.canvasService.drawButton(btn));
    }
}

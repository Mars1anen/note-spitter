import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { first, tap } from 'rxjs/operators';

import { CanvasHelperService } from '../../services/canvas-helper.service';
import { DrawQueueService } from '../../services/draw-queue.service';

@Component({
    selector: 'ns-fretboard',
    templateUrl: './fretboard.component.html',
    styleUrls: ['./fretboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FretboardComponent extends OnDestroyMixin implements OnInit, OnDestroy {

    constructor(
        private canvasService: CanvasHelperService,
        private queueService: DrawQueueService
    ) {
        super();
    }

    ngOnInit(): void {
        this.canvasService.isCanvasReady()
            .pipe(
                first(ready => ready),
                tap(() => {
                    this.canvasService.drawFretboard();
                })
            ).subscribe();
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        this.queueService.emptyQueue();
    }
}

import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { Subject } from 'rxjs';

import { CanvasHelperService } from '../../services/canvas-helper.service';

@Component({
    selector: 'ns-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input('canvasHeight') height: number = 500;
    @Input('canvasWidth') width: number = 1000;

    clearSubs$: Subject<MouseEvent>;
    initialized = false;

    @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
    constructor(
        private canvasService: CanvasHelperService
    ) { }

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.initialized = true;
        this.clearSubs$ = this.canvasService.setCurrentContext(
            this.canvas.nativeElement,
            this.height,
            this.width
        );
    }

    ngOnDestroy() {
        this.clearSubs$.next();
    }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ns-main-screen',
    templateUrl: './main-screen.component.html',
    styleUrls: ['./main-screen.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainScreenComponent implements OnInit {
    canvasHeight: number = 500;
    canvasWidth: number = 1000;

    constructor() {}

    ngOnInit(): void {
    }

}

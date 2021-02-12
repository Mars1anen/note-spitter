import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

import { AppModes } from '../../models';

@Component({
    selector: 'ns-main-screen',
    templateUrl: './main-screen.component.html',
    styleUrls: ['./main-screen.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainScreenComponent extends OnDestroyMixin implements OnInit  {
    activeMode: AppModes;

    canvasHeight: number = 500;
    canvasWidth: number = 1000;

    constructor(
        private activeRoute: ActivatedRoute,
        private router: Router
    ) {
        super();
        if (!this.activeRoute.children.length) {
            this.changeAppMode(AppModes.NOTE_SPITTER);
        } else {
            this.activeRoute.children[0].url
                .pipe(untilComponentDestroyed(this))
                .subscribe((url) => {
                    if (url && url[0]) {
                        const newMode = <AppModes>url[0].path;
                        this.changeAppMode(newMode);
                    }
                })
        }
    }

    ngOnInit(): void {
    }

    changeAppMode(newMode: AppModes) {
        this.activeMode = newMode;
        this.navigateToModePage(newMode);
    }

    navigateToModePage(mode: AppModes) {
        this.router.navigate([mode]);
    }
}

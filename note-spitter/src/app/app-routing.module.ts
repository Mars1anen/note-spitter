import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteSpitterComponent } from './pages/note-spitter/note-spitter.component';
import { FretboardComponent } from './pages/fretboard/fretboard.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';

const routes: Routes = [
    {
        path: '',
        component: MainScreenComponent,
        children: [
            {
                path: 'note-spitter',
                component: NoteSpitterComponent
            },
            {
                path: 'fretboard',
                component: FretboardComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        {
            enableTracing: false
        }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }

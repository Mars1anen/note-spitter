import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanvasZoneComponent } from './components/canvas-zone/canvas-zone.component';

const routes: Routes = [
    {
        path: '',
        component: CanvasZoneComponent
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

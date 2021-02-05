import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasZoneComponent } from './components/canvas-zone/canvas-zone.component';
import { CanvasComponent } from './components/canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasZoneComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

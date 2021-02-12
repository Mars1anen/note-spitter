import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { SelectModeComponent } from './components/select-mode/select-mode.component';
import { FretboardComponent } from './pages/fretboard/fretboard.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { NoteSpitterComponent } from './pages/note-spitter/note-spitter.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    NoteSpitterComponent,
    SelectModeComponent,
    FretboardComponent,
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

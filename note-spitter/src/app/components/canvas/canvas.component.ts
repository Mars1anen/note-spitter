import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { CanvasButton } from '../../models';
import { CanvasHelperService } from '../../services/canvas-helper.service';
import { NoteGeneratorService } from '../../services/note-generator.service';
import { NextButton } from '../buttons/NextButton';
import { PauseButton } from '../buttons/PauseButton';

@Component({
  selector: 'ns-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() height: number;
  @Input() width: number;

  buttons: CanvasButton[] = [];
  clearSubs$: Subject<MouseEvent>;
  fontSize = 160;
  initialized = false;

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  constructor(
    private canvasService: CanvasHelperService,
    private notesGenerator: NoteGeneratorService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.canvasService.drawLoader(this.fontSize);
    this.setUpButtons();
    this.clearSubs$ = this.canvasService.setCurrentContext(
      this.canvas.nativeElement,
      this.height,
      this.width,
      this.buttons
    );
    this.initialized = true;
    this.notesGenerator
      .getRandomizedNotesStream()
      .subscribe((note) => this.drawTest(`${note}`));
  }

  ngOnDestroy() {
    this.clearSubs$.next();
  }

  drawTest(note: string) {
    this.canvasService.drawText(note, this.fontSize);
  }

  private setUpButtons(): void {
    this.buttons = [
      new PauseButton({ x: this.width, y: this.height }, this.notesGenerator),
      new NextButton({ x: this.width, y: this.height }, this.notesGenerator),
    ];
  }
}

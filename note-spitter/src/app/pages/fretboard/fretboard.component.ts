import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ns-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FretboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecordType } from 'src/app/models/record.type';

@Component({
  selector: 'movie-show-button',
  templateUrl: './movie-show-button.component.html',
  styleUrls: ['./movie-show-button.component.css']
})
export class MovieShowButtonComponent implements OnInit {

  @Input() title: string = ''
  @Input() badgeCount?: number
  @Input() type: RecordType = RecordType.Show
  style = {}

  @Output() onButtonClicked: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.style = { 'background': `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(122,122,122,0.3) 50%, rgba(255,255,255,0) 100%), url(assets/${this.type}.png)`}
  }

  onClick(){
    this.onButtonClicked.emit()

  }
}

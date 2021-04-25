import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecordType } from 'src/app/models/record.type';

@Component({
  selector: 'record-button',
  templateUrl: './record-button.component.html',
  styleUrls: ['./record-button.component.css']
})
export class RecordButtonComponent implements OnInit {

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

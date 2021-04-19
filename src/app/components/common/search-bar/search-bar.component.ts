import { Component, EventEmitter, Output } from '@angular/core';




@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})

export class SearchBar {
  @Output() onSearchTermChanged = new EventEmitter();
  value: string = '';

  fireSearchTermChanged() {
    this.onSearchTermChanged.emit(this.value);
  }

  setValue(newValue: string) {
    this.value = newValue;
    this.fireSearchTermChanged();
  }
}

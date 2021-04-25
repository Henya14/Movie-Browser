import { Component, OnInit } from "@angular/core"
import { RecordType } from "src/app/models/record.type"
import { SearchAfterType } from "src/app/services/record.service"

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPage implements OnInit{
  constructor() {}

  searchForMovies = true

  ngOnInit(): void {
  }

  getSearchResults() {

  }
  searchTerm: string = ''
  searchTermChanged(newSearchTerm: string) {
    this.searchTerm = newSearchTerm
  }

  getSearchAfter(): SearchAfterType[] {
    return [SearchAfterType.Title]
  }


  getSearchType(): RecordType {
    return this.searchForMovies? RecordType.Movie : RecordType.Show
  }
}

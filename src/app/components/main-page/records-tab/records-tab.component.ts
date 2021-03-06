import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Record, RecordType } from 'src/app/models/record.type';
import {
  RecordRequestResponse,
  RecordService,
  SearchAfterType,
} from 'src/app/services/record.service';

@Component({
  selector: 'records-tab',
  templateUrl: './records-tab.component.html',
  styleUrls: ['./records-tab.component.css'],
})
export class RecordsTabComponent implements OnInit, OnChanges {
  @Input() type: 'movie' | 'show' = 'movie';
  @Input() query: 'trending' | 'popular' | 'search' = 'popular';
  @Input() searchTerm?: string = '';
  @Input() searchAfter?: SearchAfterType[] = [];
  @Input() searchType: RecordType = RecordType.Movie;

  constructor(private recordService: RecordService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchType) {
      this.currentPageNumber = 1;
      this.getRecords();
      return;
    }
    if (!changes.searchTerm && !changes.searchAfter) {
      return;
    }

    let termChanged = false;
    if (changes.searchTerm) {
      termChanged = true;
    }

    let searchAfterIsTheSame: boolean = true;
    if (changes.searchAfter) {
      if (
        changes.searchAfter.previousValue?.length ===
        changes.searchAfter.currentValue?.length
      ) {
        for (let i = 0; i < changes.searchAfter.previousValue.length; i++) {
          if (
            changes.searchAfter.previousValue[i] !==
            changes.searchAfter.currentValue[i]
          ) {
            searchAfterIsTheSame = false;
            break;
          }
        }
      } else {
        searchAfterIsTheSame = false;
      }
    }

    if (searchAfterIsTheSame && !termChanged) {
      return;
    }

    this.getRecords();
  }

  records: Record[] = [];
  currentPageNumber: number = 1;
  totalPages: number = 0;

  loading: boolean = false;
  page_limit = 4;

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.loading = true;
    if (!this.searchTerm) {
      if (this.type === 'movie') {
        if (this.query === 'popular') {
          this.recordService
            .getPopularMovies(this.page_limit, this.currentPageNumber)
            .subscribe(this.handleResult.bind(this)),
            this.handleError.bind(this);
        } else if (this.query === 'trending') {
          this.recordService
            .getTrendingMovies(this.page_limit, this.currentPageNumber)
            .subscribe(
              this.handleResult.bind(this),
              this.handleError.bind(this)
            );
        }
      } else {
        if (this.query === 'popular') {
          this.recordService
            .getPopularShows(this.page_limit, this.currentPageNumber)
            .subscribe(
              this.handleResult.bind(this),
              this.handleError.bind(this)
            );
        } else {
          this.recordService
            .getTrendingShows(this.page_limit, this.currentPageNumber)
            .subscribe(
              this.handleResult.bind(this),
              this.handleError.bind(this)
            );
        }
      }
    } else {
      this.recordService
        .getSearchResults(
          this.searchTerm || '',
          this.page_limit,
          this.currentPageNumber,
          this.searchType,
          this.searchAfter
        )
        .subscribe(this.handleResult.bind(this), this.handleError.bind(this))
    }
  }

  handleResult(result: RecordRequestResponse) {
    this.records = result.records;
    this.totalPages = result.pages;
    this.loading = false;
  }

  isError: boolean = false;
  handleError(error: any) {
    this.isError = true;
  }

  nextPage() {
    this.setCurrentPageNumber(this.currentPageNumber + 1);
  }

  previousPage() {
    this.setCurrentPageNumber(this.currentPageNumber - 1);
  }

  firstPage() {
    this.setCurrentPageNumber(1);
  }

  lastPage() {
    this.setCurrentPageNumber(this.totalPages);
  }

  setCurrentPageNumber(number: number) {
    this.currentPageNumber = number;
    this.getRecords();
  }

  recordClicked(record: Record) {
    //console.log(record);
  }

  getRecordTitle(record: Record): string {
    const year = record.year ? `(${record.year})` : '';
    return `${record.title} ${year}`;
  }

  getType() {
    if(this.searchTerm) {
      return this.searchType
    } else {
      return this.type
    }
  }
}

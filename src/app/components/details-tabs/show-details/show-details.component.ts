import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from 'src/app/models/episode.type';
import { Season } from 'src/app/models/season.type';
import { ShowDetails } from 'src/app/models/show.type';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css'],
})
export class ShowDetailsComponent implements OnInit {
  constructor(
    private showService: ShowService,
    private route: ActivatedRoute
    ) {}

    show?: ShowDetails
    seasons?: Season[]
    isError: boolean = false
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let showID = +params['id'];
      this.showService.getShowById(showID).subscribe((response) => {
        this.show = response
      },
      () => (this.isError = true))

      this.showService.getSeasonsForShowByID(showID).subscribe((response) => {
        this.seasons = response;
      },
      () => (this.isError = true))
    });
  }
}

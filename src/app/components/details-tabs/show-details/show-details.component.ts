import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowDetails } from 'src/app/models/show.type';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  constructor(private showService: ShowService, private route: ActivatedRoute) { }

  show? : ShowDetails
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      let showID = +params['id']
      this.showService.getShowById(showID).subscribe(response => {
        console.log(response)
        this.show = response
      })
    })
  }

}

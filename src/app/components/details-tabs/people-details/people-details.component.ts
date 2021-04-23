import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleDetails } from 'src/app/models/people.type';
import { PeopleService } from 'src/app/services/people.service';
import {Record} from 'src/app/models/record.type'

@Component({
  selector: 'people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css']
})
export class PeopleDetailsComponent implements OnInit {

  constructor(private peopleService: PeopleService, private route: ActivatedRoute) { }

  person?: PeopleDetails
  movies?: Record[]
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let personId = +params['id']
      this.peopleService.getPersonById(personId).subscribe(response => {
        this.person = response
      })

      this.peopleService.getPersonsMoviesById(personId).subscribe(response => {
        this.movies = response
      })
    })
  }

}

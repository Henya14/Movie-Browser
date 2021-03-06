import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  backButtonEnabled = false
  constructor(private router: Router, private _location: Location) {
    _location.subscribe((value) => {
      this.backButtonEnabled = !!value.url
    })
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
        this.backButtonEnabled = router.url !== '/'
    } )
  }

  backClicked() {
    this._location.back()
  }

}

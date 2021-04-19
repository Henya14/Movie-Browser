import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  backButtonEnabled = false
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
        this.backButtonEnabled = router.url !== '/'
    } )
  }


}

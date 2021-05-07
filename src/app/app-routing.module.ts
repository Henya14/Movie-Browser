import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/details-tabs/movie-details/movie-details.component';
import { PeopleDetailsComponent } from './components/details-tabs/people-details/people-details.component';
import { ShowDetailsComponent } from './components/details-tabs/show-details/show-details.component';
import { MainPage } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: "movies/:id", component: MovieDetailsComponent },
  { path: "shows/:id", component: ShowDetailsComponent },
  { path: "people/:id", component: PeopleDetailsComponent },
  { path: "**", component: MainPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

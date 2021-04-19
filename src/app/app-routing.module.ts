import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/details-tabs/movie-details/movie-details.component';
import { ShowDetailsComponent } from './components/details-tabs/show-details/show-details.component';
import { MainPage } from './components/main-page/main-page.component';
import { MoviesShowsTabComponent } from './components/main-page/movies-shows-tab/movies-shows-tab.component';

const routes: Routes = [
    { path: "", component: MainPage },
    { path: "movies/:id", component: MovieDetailsComponent },
    { path: "shows/:id", component: ShowDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

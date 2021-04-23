import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieShowButtonComponent } from './components/common/movie-button/movie-show-button.component';
import { SearchBar } from './components/common/search-bar/search-bar.component';
import { MainPage } from './components/main-page/main-page.component';
import { MoviesShowsTabComponent } from './components/main-page/movies-shows-tab/movies-shows-tab.component';
import { CommonService } from './services/common.service';
import { RecordService } from './services/record.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MovieDetailsComponent } from './components/details-tabs/movie-details/movie-details.component';
import { ShowDetailsComponent } from './components/details-tabs/show-details/show-details.component';
import { ShowService } from './services/show.service';
import { MovieService } from './services/movie.service';
import { PeopleDetailsComponent } from './components/details-tabs/people-details/people-details.component';
import { PeopleService } from './services/people.service';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    SearchBar,
    MainPage,
    MoviesShowsTabComponent,
    MovieShowButtonComponent,
    MovieDetailsComponent,
    ShowDetailsComponent,
    PeopleDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatExpansionModule
  ],
  providers: [RecordService, CommonService, ShowService, MovieService, PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

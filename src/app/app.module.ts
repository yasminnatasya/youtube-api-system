import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './searchresult/searchresult.component';
import { YoutubeService } from './youtubeservice.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// mat
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultComponent,
    NavbarComponent,
    AboutusComponent,
    VideoDetailComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [YoutubeService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
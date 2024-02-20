import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '../youtubeservice.service';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  videos: any[] = [];
  nextPageToken: string = '';

  constructor(private youtubeService: YoutubeService, private router: Router) {}

  ngOnInit() {
    this.fetchPopularVideos();
    window.addEventListener('scroll', this.onScroll, true); // true for capture phase
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  }

  onScroll = (): void => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // You're at the bottom of the page
      if (this.nextPageToken) { // Check if there's more content to load
        this.fetchPopularVideos(this.nextPageToken);
      }
    }
  }

  fetchPopularVideos(pageToken: string = ''): void {
    this.youtubeService.getPopularVideos('US', pageToken).subscribe(data => {
      this.nextPageToken = data.nextPageToken; // Store the next page token
      const newVideos = data.items;
      this.videos = [...this.videos, ...newVideos]; // Append new videos
    }, error => {
      console.error('Error fetching more videos:', error);
    });
  }

  navigateToVideoDetail(videoId: string): void {
    this.router.navigate(['/video', videoId]);
  }
}

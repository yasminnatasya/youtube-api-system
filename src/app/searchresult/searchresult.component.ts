import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../youtubeservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchResultComponent implements OnInit {
  videos: any[] = [];
  query: string = '';

  constructor(private route: ActivatedRoute, private youtubeService: YoutubeService, private router: Router) {}

  ngOnInit(): void {
    // Optionally listen for query params if you want to allow initiating searches via URL
    this.route.queryParams.subscribe(params => {
      if(params['q']) {
        this.query = params['q'];
        this.searchVideos();
      }
    });
  }

  searchVideos() {
    if (this.query.trim() !== '') {
      this.youtubeService.searchVideos(this.query).subscribe((response: any) => {
        this.videos = response.items;
      });
    }
  }

  navigateToVideoDetail(videoId: string): void {
    this.router.navigate(['/video', videoId]);
  }
}

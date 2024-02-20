import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../youtubeservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  videoId!: string; // Using non-null assertion for simplicity
  videoDetail: any;
  searchQuery: string = '';
  hasLiked: boolean = false;
  hasDisliked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private youtubeService: YoutubeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get('id')!;
    this.fetchVideoDetail();
  }

  fetchVideoDetail() {
    if (this.videoId) {
      this.youtubeService.getVideoDetail(this.videoId).subscribe((data: any) => {
        this.videoDetail = data.items[0];
        console.log(data);
      });
    }
  }

  searchVideos() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  likeVideo() {
    this.hasLiked = !this.hasLiked;
    // If the user is toggling like, remove dislike
    if (this.hasLiked && this.hasDisliked) {
      this.hasDisliked = false;
    }
    // Call a service method to update the like status in backend (to be implemented)
  }

  dislikeVideo() {
    this.hasDisliked = !this.hasDisliked;
    // If the user is toggling dislike, remove like
    if (this.hasDisliked && this.hasLiked) {
      this.hasLiked = false;
    }
    // Call a service method to update the dislike status in backend (to be implemented)
  }

}

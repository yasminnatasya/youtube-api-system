import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey: string = environment.youtubeApiKey;
  apiUrl: string = 'https://www.googleapis.com/youtube/v3/';

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<any> {
    const url = `${this.apiUrl}search?q=${query}&part=snippet&type=video&key=${this.apiKey}`;
    return this.http.get(url);
  }

  // getRecommendations(): Observable<any> {
  //   const url = `${this.apiUrl}videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=10&key=${this.apiKey}`; // Increase maxResults as needed
  //   return this.http.get(url);
  // }
  
  getPopularVideos(regionCode: string, pageToken: string = ''): Observable<any> {
    const maxResults = 30; // Specify how many videos you want
    let url = `${this.apiUrl}videos?part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&key=${this.apiKey}`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }
    return this.http.get(url);
  }
  

  
  
  getVideoDetail(videoId: string): Observable<any> {
    const url = `${this.apiUrl}videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${this.apiKey}`;
    return this.http.get(url);
  }
  
}

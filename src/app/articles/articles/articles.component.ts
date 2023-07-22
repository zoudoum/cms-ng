import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  articles$: Observable<any[]> | null = null;
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.articles$= this.httpClient.get<any[]>('http://localhost:3000/articles');
    console.log( this.articles$)
  }
  reloadArticles(deletionSucceeded:any) {
    console.log('deletion successful: ', deletionSucceeded);
    this.articles$ = this.httpClient.get<any[]>('http://localhost:3000/articles');
  }
}

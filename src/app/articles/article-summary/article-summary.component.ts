import { Component,Input,Output } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/admin/article.service';
import { EventEmitter } from '@angular/core';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
  styleUrls: ['./article-summary.component.css']
})
export class ArticleSummaryComponent {
  @Input() article!: Article;
  isInEditMode: boolean = false;
  constructor(private articleService: ArticleService) { }
  @Output() deleteSuccess = new EventEmitter<boolean>();
  error = null;
  isWaitingForServerResponse = false;
  delete(article: Article) {
    this.isWaitingForServerResponse = true;
    this.articleService
      .deleteArticle(article)
      .pipe(
        catchError(this.handleError)
      ).subscribe(
        data => {
          // just to emulate network latence
          setTimeout(() => {
            this.isWaitingForServerResponse = false;
            this.handleSuccess(data);
          }, 2000);
        },
        err => {
          this.isWaitingForServerResponse = false;
          this.handleError(err);
        }
      );
  }
  handleError(err: any) {
    // console.log(err);
    this.error = err;
    return throwError(this.error);
  }
  handleSuccess(data:any) {
    console.log('success !!', data);
    this.deleteSuccess.emit(true);

  }
  reloadArticle(article: Article) {
    console.log(article);
    this.article = article;
  }
  toggleReadMode() {
    this.isInEditMode = !this.isInEditMode;
  }

}

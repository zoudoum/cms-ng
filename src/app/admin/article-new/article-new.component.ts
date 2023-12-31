import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { catchError } from 'rxjs';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent {
  response$: any;
  error = null;
  constructor(private fb: FormBuilder, private articleService: ArticleService) { }
  articleForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', [Validators.required, Validators.minLength(4)]],
    creationDate: new Date().toISOString()
  });
  async submit(){
    console.log('article submit',this.articleForm.value)
    this.response$ = await this.articleService.createArticle(this.articleForm.value).pipe(
      catchError(error => {
        this.error = error;
        return EMPTY;
      })
    );
  }
  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content');
  }

}

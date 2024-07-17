import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

export function CustomTranslationLoaderFactory(http: HttpClient) {
  return new CustomTranslationLoader(http);
}

@Injectable({
  providedIn: 'root',
})
export class CustomTranslationLoader implements TranslateLoader {

  baseUrl = environment.apiUrl + 'traduction/';

  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(this.baseUrl + 'fr');
  }
}

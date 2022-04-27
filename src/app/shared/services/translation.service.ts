import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class TranslationLoader implements TranslateLoader {
  constructor(private langService: TranslationService) { }

  getTranslation(lang: string): Observable<any> {
      return this.langService.getTranslation(lang);
  }
}

export function HttpLoaderFactory(translationService: TranslationService) {
  return new TranslationLoader(translationService);
}

export const defaultLanguage: string = 'fr';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private baseUrl = environment.apiUrl + 'traduction/';

  constructor(private http: HttpClient) { }

  getTranslation(lang: string | number): Observable<any> {
    if (lang === 'fr')
      lang = 1036;
    return this.http.get(this.baseUrl + 'get-traductions/' + lang);
  }
}

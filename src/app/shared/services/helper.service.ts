import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private headerHelp = 'HELP';
  private textHelp = 'HELP_TEXT';

  constructor() { }

  setHeaderTitle(title: string) {
    this.headerHelp = title;
  }

  getHeaderTitle(): string {
    return this.headerHelp;
  }

  setTextHelp(text: string) {
    this.textHelp = text;
  }

  getTextHelp(): string {
    return this.textHelp;
  }

}

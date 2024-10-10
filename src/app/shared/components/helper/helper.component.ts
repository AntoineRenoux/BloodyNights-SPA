import { Component, OnInit } from '@angular/core';
import { HelperService } from '@shared/services/helper.service';

@Component({
  selector: 'bn-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent implements OnInit {

  get Title(): string {
    return this.helperService.getHeaderTitle();
  }

  get SubHeader(): string {
    return this.helperService.getSubHeaderTitle();
  }

  get Text(): string {
    return this.helperService.getTextHelp();
  }

  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

}

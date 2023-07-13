import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '@core/models/itemMenu';

@Component({
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  navigationMenu = new Array<ItemMenu>();

  constructor() {}

  ngOnInit(): void {
  }

  scrollToTop($element): void {
    $element.scrollIntoView({behavior: "smooth"});
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ItemMenu } from '@core/models/itemMenu';

@Component({
  selector: 'bn-rules-left-fixed-menu',
  templateUrl: './left-fixed-menu.component.html',
  styleUrls: ['./left-fixed-menu.component.scss']
})
export class LeftFixedMenuComponent implements OnInit {

  @Input() menus: ItemMenu[];

  constructor() { }

  ngOnInit(): void {
  }

}

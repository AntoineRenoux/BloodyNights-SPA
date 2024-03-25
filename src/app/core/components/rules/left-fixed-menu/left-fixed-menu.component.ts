import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ItemMenu } from '@core/models/itemMenu';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'bn-rules-left-fixed-menu',
  templateUrl: './left-fixed-menu.component.html',
  styleUrls: ['./left-fixed-menu.component.scss']
})
export class LeftFixedMenuComponent implements OnInit {

  dataSource = new MatTreeNestedDataSource<ItemMenu>();

  treeControl = new NestedTreeControl<ItemMenu>(node => node.children);

  constructor(private navigationService: NavigationService) {
  }

  hasChild = (_: number, node: ItemMenu) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.navigationService.itemsMenuForNavigation$.subscribe((d) => {
      this.dataSource.data = d;
    });
  }

  scrollToTop($element): void {
    $element.scrollIntoView({behavior: "smooth"});
  }
}

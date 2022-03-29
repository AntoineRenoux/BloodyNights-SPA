import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ItemMenu } from '@core/models/itemMenu';
import { AdDirective } from '@shared/directives/ad.directive';

@Component({
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  navigationMenu = new Array<ItemMenu>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private route: Router) { }

  ngOnInit(): void {
    console.log("RulesComposent loaded");
  }

}

import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Clan } from '@core/models/game/clan';
import { Discipline } from '@core/models/game/discipline';
import { ItemMenu } from '@core/models/itemMenu';
import { AdDirective } from '@shared/directives/ad.directive';
import { ClansComponent } from '../clans/clans.component';
import { DisciplineComponent } from '../disciplines/discipline.component';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  navigationMenu = new Array<ItemMenu>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private route: Router) { }

  ngOnInit(): void {

    const currentUrl = this.route.url;

    if (currentUrl.search('disciplines')) {
      this.loadComponent(DisciplineComponent);
    }
    else if (currentUrl.search('clans')) {
      this.loadComponent(ClansComponent);
    }
  }


  loadComponent(component: any) {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const componentRef = viewContainerRef.createComponent(componentFactory);

    (componentRef.instance as DisciplineComponent).disciplines?.subscribe((disciplines: Discipline[]) => {

      disciplines.forEach(d => {
        this.navigationMenu.push(this.ConverteDisciplineToItemMenu(d, null));
      });

    });

    (componentRef.instance as ClansComponent).clans?.subscribe((clans: Clan[]) => {

      clans.forEach(c => {
        this.navigationMenu.push(this.ConverteClanToItemMenu(c, null));
      });

    });
  }

  private ConverteDisciplineToItemMenu(discipline: Discipline, previousUrl : string) : ItemMenu {

    var children = new Array<ItemMenu>();
    var url = previousUrl == null ? '/rules/disciplines/' : previousUrl;

    url += '/' + discipline.key;

    if (discipline.childrenDisciplines.length > 0) {
      discipline.childrenDisciplines.forEach(cd => {
        children.push(this.ConverteDisciplineToItemMenu(cd, url));
      });
    }

    return new ItemMenu (discipline.key, discipline.name, url, children);
  }

  private ConverteClanToItemMenu(clan: Clan, previousUrl : string) : ItemMenu {
    var children = new Array<ItemMenu>();
    var url = previousUrl == null ? '/rules/clans/' : previousUrl;

    url += '/' + clan.key;

    if (clan.bloodlines.length > 0) {
      clan.bloodlines.forEach(cb => {
        children.push(this.ConverteClanToItemMenu(cb, url));
      });
    }

    return new ItemMenu (clan.key, clan.name, url, children);
  }
}

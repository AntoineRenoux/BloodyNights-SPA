import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Discipline } from '@core/models/game/discipline';
import { ItemMenu } from '@core/models/itemMenu';
import { AdDirective } from '@shared/directives/ad.directive';
import { DisciplineComponent } from '../disciplines/discipline.component';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  navigationMenu = new Array<ItemMenu>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent(DisciplineComponent);
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
}

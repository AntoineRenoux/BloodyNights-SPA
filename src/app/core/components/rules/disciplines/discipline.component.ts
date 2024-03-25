import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discipline } from '@core/models/game/discipline';
import { ItemMenu } from '@core/models/itemMenu';
import { DisciplineService } from '@shared/services/discipline.service';
import { NavigationService } from '@shared/services/navigation.service';
import { timer } from 'rxjs';

@Component({
  templateUrl: './discipline.component.html',
  styleUrls: ['../rules.component.scss']
})
export class DisciplineComponent implements OnInit {

  discipline: Discipline;
  key: string;

  constructor(private route: ActivatedRoute,
    private disciplinesService: DisciplineService,
    private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const discipline = params.get('discipline');
      const path = params.get('path');
      this.key = path != null ? path : discipline;
      if (this.key != null) {
        this.getDisciplineByKey(this.key);
      }
    });

    timer().subscribe(() => this.setListItemsMenu());
  }

  getDisciplineByKey(key: string) {
    this.disciplinesService.getDisciplineByKey(key).subscribe((d: Discipline) => {
      this.discipline = d;
    })
  }

  setListItemsMenu() {

    let listItems = new Array<ItemMenu>();

    this.disciplinesService.getDisciplines().subscribe((d: Discipline[]) => {
      if (d != null) {
        d.forEach(disci => {
          listItems.push(this.converteDisciplineToItemMenu(disci, null));
        });
        this.navigationService.itemsMenuForNavigation$.next(listItems);
      }
    });
  }

  private converteDisciplineToItemMenu(discipline: Discipline, previousUrl: string): ItemMenu {

    var children = new Array<ItemMenu>();
    var url = previousUrl == null ? '/rules/disciplines' : previousUrl;

    url += '/' + discipline.key;

    if (discipline.childrenDisciplines.length > 0) {
      discipline.childrenDisciplines.forEach(cd => {
        children.push(this.converteDisciplineToItemMenu(cd, url));
      });
    }

    if (discipline.rituals.length > 0) {
      let ritualLevel = new Array<ItemMenu>();

      for (let index = 1; index <= discipline.rituals[discipline.rituals.length - 1].level; index++) {
        let ritualArrayCurrentLevel = new Array<ItemMenu>();

        discipline.rituals.filter(x => x.level == index).forEach(r => {
          ritualArrayCurrentLevel.push(new ItemMenu(r.key, r.name, url + '/rituals/' + r.key, null ));
        });

        ritualLevel.push(new ItemMenu(null, 'Level ' + index, null, ritualArrayCurrentLevel));
      }

      let rituals = new ItemMenu(null, 'RITUALS', url + '/rituals/home', ritualLevel)

      children.push(rituals);
    }

    return new ItemMenu(discipline.key, discipline.name, url, children);
  }
}

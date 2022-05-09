import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discipline, Ritual } from '@core/models/game/discipline';
import { ItemMenu } from '@core/models/itemMenu';
import { GameService } from '@shared/services/game.service';
import { timer } from 'rxjs';

@Component({
  templateUrl: './discipline.component.html',
  styleUrls: ['../rules.component.scss']
})
export class DisciplineComponent implements OnInit {

  discipline: Discipline;
  key: string;

  constructor(private gameService: GameService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    console.log("DisciplineComponent loaded");

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
    this.gameService.getDisciplineByKey(key).subscribe((d: Discipline) => {
      this.discipline = d;
    })
  }

  setListItemsMenu() {

    let listItems = new Array<ItemMenu>();

    this.gameService.getDisciplines().subscribe((d: Discipline[]) => {
      if (d != null) {
        d.forEach(disci => {
          listItems.push(this.converteDisciplineToItemMenu(disci, null));
        });
        this.gameService.itemsMenuForNavigation$.next(listItems);
      }
    });
  }

  private converteDisciplineToItemMenu(discipline: Discipline, previousUrl: string): ItemMenu {

    var children = new Array<ItemMenu>();
    var url = previousUrl == null ? '/rules/disciplines/' : previousUrl;

    url += '/' + discipline.key;

    if (discipline.childrenDisciplines.length > 0) {
      discipline.childrenDisciplines.forEach(cd => {
        children.push(this.converteDisciplineToItemMenu(cd, url));
      });
    }

    if (discipline.rituals.length > 0) {
      children.push(this.converteRiualsToItemMenu(discipline.rituals, discipline.url));
    }

    return new ItemMenu(discipline.key, discipline.name, url, children);
  }

  private converteRiualsToItemMenu(rituals: Ritual[], disciplineUrl: string): ItemMenu {

    var url = disciplineUrl + '/rituals';

    var ritualsItems = new Array<ItemMenu>();

    rituals.forEach(r => {
      ritualsItems.push(new ItemMenu(r.key, r.name, null, null ));
    });

    var ret = new ItemMenu(null, 'RITUALS', url, ritualsItems);
    return ret;
  }
}

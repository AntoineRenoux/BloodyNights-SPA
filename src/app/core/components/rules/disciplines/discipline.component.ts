import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discipline } from '@core/models/game/discipline';
import { ItemMenu } from '@core/models/itemMenu';
import { GameService } from '@shared/services/game.service';

@Component({
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  discipline: Discipline;
  key: string;

  listItems: ItemMenu[];

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

    this.setListItemsMenu();
  }

  getDisciplineByKey(key: string) {
    this.gameService.getDisciplineByKey(key).subscribe((d: Discipline) => {
      this.discipline = d;
    })
  }

  setListItemsMenu() {
    if (this.listItems == null){

      this.listItems = new Array<ItemMenu>();

      this.gameService.getDisciplines().subscribe((d : Discipline[]) => {
        if (d != null ) {
          d.forEach(disci => {
            this.listItems.push(this.converteDisciplineToItemMenu(disci, null));
          });
          this.gameService.itemsMenuForNavigation$.next(this.listItems);
        }
      });
    }
  }

  private converteDisciplineToItemMenu(discipline: Discipline, previousUrl : string) : ItemMenu {

    var children = new Array<ItemMenu>();
    var url = previousUrl == null ? '/rules/disciplines/' : previousUrl;

    url += '/' + discipline.key;

    if (discipline.childrenDisciplines.length > 0) {
      discipline.childrenDisciplines.forEach(cd => {
        children.push(this.converteDisciplineToItemMenu(cd, url));
      });
    }

    return new ItemMenu (discipline.key, discipline.name, url, children);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discipline } from '@core/models/game/discipline';
import { GameService } from '@shared/services/game.service';

@Component({
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  @Output() disciplines = new EventEmitter<Discipline[]>();
  discipline: Discipline;
  key: string;

  constructor(private gameService: GameService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameService.getDisciplines().subscribe((disciplines) => {
      this.disciplines.emit(disciplines);
    })

    this.route.paramMap.subscribe(params => {
      const discipline = params.get('discipline');
      const path = params.get('path');
      this.key = path != null ? path : discipline;
      if (this.key != null) {
        this.getDisciplineByKey(this.key);
      }
    })
  }

  getDisciplineByKey(key: string) {
    this.gameService.getDisciplineByKey(key).subscribe((d: Discipline) => {
      this.discipline = d;
      console.log(d);
    })
  }
}

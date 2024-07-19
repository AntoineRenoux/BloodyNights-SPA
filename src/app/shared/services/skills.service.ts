import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '@core/models/game/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private baseUrl = environment.apiUrl + 'skill/';

  private skills$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>(null);

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.baseUrl);
  }
}

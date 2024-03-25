import { ItemMenu } from '@core/models/itemMenu';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  itemsMenuForNavigation$: BehaviorSubject<ItemMenu[]> = new BehaviorSubject<ItemMenu[]>(null);
}

import { Pipe, PipeTransform } from '@angular/core';
import { Clan } from '@core/models/game/clan';

@Pipe({
  name: 'filterClans'
})
export class FilterClans implements PipeTransform {

  transform(values: Clan[], importance: string, rarity: boolean = false): Clan[] {
    var ret = values;

    if (values != null ) {
      if (importance != null) {
        ret = ret.filter(c => c.importance == importance);
      }
      if (rarity) {
        ret = ret.sort(c => c.rarity);
      }
    }

    return ret;
  }

}

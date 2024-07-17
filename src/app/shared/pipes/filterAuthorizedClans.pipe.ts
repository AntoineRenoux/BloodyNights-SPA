import { Pipe, PipeTransform } from '@angular/core';
import { Clan } from '@core/models/game/clan';

@Pipe({
    name: 'filterAutorizedClans'
})
export class FilterAuthorizedClansPipe implements PipeTransform {

    transform(values: Clan[]): Clan[] {
        const clans = values.filter(x => !isNaN(x.rarity.cost));
        clans.forEach(c => {
            c.bloodlines = c.bloodlines.filter(bl => bl.rarity?.key !== 'FORBIDDEN');
        });

        return clans;
    }

}

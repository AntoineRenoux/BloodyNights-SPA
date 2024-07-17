import { Pipe, PipeTransform } from '@angular/core';
import { Focus } from '@core/models/game/focus';

@Pipe({
  name: 'focusfilter'
})
export class FocusfilterPipe implements PipeTransform {

  transform(focusArray: Focus[], filter: string): Focus[] {
    if (!focusArray || !filter) {
      return focusArray;
    }

    return focusArray.filter(f => f.name.includes(filter));
  }

}

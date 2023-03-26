import { Allegiance } from './game/allegiance';
import { Clan } from './game/clan';
export class Chronicle {
  name: string;
  theme: string;
  ton: string;
  hook: string;
  allegianceKey: string;
  localization: string;

  clans: Clan[];
}

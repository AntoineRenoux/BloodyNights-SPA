import { AtoutFlaws } from './atoutFlaws';
import { Discipline } from './discipline';
import { Rarity } from './rarity';

export class Clan {
  key: string;
  name: string;
  history: string;
  description: string;
  organization: string;
  surname: string;
  weakness: string;
  importance: string;
  rarity: Rarity;
  parentId: string;

  disciplines: Discipline[];
  bloodlines: Clan[];
  atoutsFlaws: AtoutFlaws[];
}

import { Discipline } from './discipline';
export class Clan {
  key: string;
  name: string;
  history: string;
  description: string;
  organization: string;
  surname: string;
  weakness: string;
  importance: string;
  rarity: number;

  disciplines: Discipline[];
  bloodlines: Clan[];
}

import { Clan } from "./clan";

export class Allegiance {
  key: string;
  name: string;
  description: string;
  surname: string;
  isSect: boolean;

  clans: Clan[];
}

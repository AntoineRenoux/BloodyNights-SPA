import { Power } from "./power";
import { Ritual } from "./ritual";

export class Discipline {
  key: string;
  name: string;
  description: string;

  powers: Power[];
  childrenDisciplines: Discipline[];
  rituals: Ritual[];

  url: string;
}

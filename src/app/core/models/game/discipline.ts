import { Focus } from "./focus";

export class Discipline {
  key: string;
  name: string;
  description: string;

  powers: Power[];
  childrenDisciplines: Discipline[];
  rituals: Ritual[];

  ritualsName: string;
  primaryPathDescription: string;
  ritualDescription: string;
  ritualSystemDescription: string;
  composantsTargeting: string;

  url: string;
  level: number;
}

export class Power {
  key: string;
  name: string;
  level: number;
  description: string;
  system: string;
  exceptionnalSuccess: string;
  focusDescription: string;

  focus: Focus;
  techniques: Technique[];
}

export class Technique {
  key: string;
  name: string;
  description: string;
  system: string;
}

export class Ritual {
  key: string;
  name: string;
  description: string;
  system: string;
  level: number;
}

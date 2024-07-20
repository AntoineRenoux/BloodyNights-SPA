import { AtoutFlaws } from "./atoutFlaws";
import { Clan } from "./clan";
import { Discipline } from "./discipline";
import { Focus } from "./focus";
import { Historic } from "./historic";
import { Skill } from "./skill";

export class Character {
    concept: string;
    archetype: string;
    currentExperience: number = 0;
    clan: Clan;
    physical: number;
    mental: number;
    social: number;
    focus: Focus[];
    skills: Skill[];
    historics: Historic[];
    disciplines: Discipline[];
    atouts: AtoutFlaws[];
}
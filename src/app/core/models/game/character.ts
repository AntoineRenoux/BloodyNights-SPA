import { Clan } from "./clan";

export class Character {
    concept: string;
    archetype: string;
    currentExperience: number = 0;
    clan: Clan;
    physical: number;
    mental: number;
    social: number;
}
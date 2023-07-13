import { Clan } from "./game/clan";

export class Chronicle {
  chronicleId: string;
  name: string;
  theme: string;
  mood: string;
  hook: string;
  localization: string;
  allegianceId: string;
  initialPx: number;
  monthlyPx: number;
  clans: Clan[];
}

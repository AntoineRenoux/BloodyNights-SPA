import { Technique } from './techniques';
import { Focus } from "./focus";

export class Power {
  key: string;
  name: string;
  level: string;
  description: string;
  system: string;
  exceptionnalSuccess: string;
  focusDescription: string;
  
  focus: Focus;
  techniques: Technique[];
}

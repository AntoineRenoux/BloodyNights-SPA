export class Step {
  title: string;
  text: string;
  current: boolean;

  constructor(title: string, text: string, current: boolean) {
    this.title = title;
    this.text = text;
    this.current = current;
  }
}

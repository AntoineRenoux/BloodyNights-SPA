export class ItemMenu {
  key: string;
  name: string;

  children: ItemMenu[];
  redirectTo: string;

  constructor(key: string, name: string, redirectTo: string = null, children: ItemMenu[] = null) {
    this.key = key;
    this.name = name;
    this.redirectTo = redirectTo;
    this.children = children;
  }
}

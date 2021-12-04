export class User {
  constructor(
    public id: number = 0,
    public first_name: string = "",
    public last_name: string = "",
    public email: string = ""
  ) {}

  public get name(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
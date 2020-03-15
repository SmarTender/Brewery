export class Gpio {
  protected state: number;

  constructor(protected readonly gpio: number, protected direction: string) {
    this.state = 0;
  }

  readSync(): number {
    return this.state;
  }

  writeSync(value: number): void {
    this.state = value;
  }
}

import { Injectable } from '@nestjs/common';
import { Gpio } from 'onoff';
import { CoctailOptions } from 'src/coctail/interface/coctailOptions.type';
import {
  CoctailReceipt,
  CoctailReceiptList,
} from 'src/coctail/interface/coctailReceipt.interface';
import { FLOW_RATE, PIPES, RELAY_OFF, RELAY_ON } from 'src/common/constants';
import sleep from 'src/common/sleep';
import { PipeName } from 'src/common/types';

@Injectable()
export class SmarTender {
  protected run: boolean;
  protected pipes: Map<PipeName, Gpio>;
  protected receipts: CoctailReceiptList;
  protected drinkOptions: CoctailOptions;

  constructor() {
    this.pipes = new Map<PipeName, Gpio>();
  }

  setup(receipts: CoctailReceiptList, drinkOptions: CoctailOptions) {
    this.receipts = receipts;
    this.drinkOptions = drinkOptions;
  }

  isRunning() {
    return this.run;
  }

  async init() {
    try {
      for (const pipe in PIPES) {
        if (pipe in PIPES) {
          const pipeName: PipeName = pipe as PipeName;
          this.pipes.set(pipeName, new Gpio(PIPES[pipeName], 'out'));
          this.turnOffPipe(pipeName);
        } else {
          throw new Error(`Invalid pipe: ${pipe}`);
        }
      }
    } catch (e) {
      console.error(`Cannot initialize SmarTender. Exiting...`);
      process.exit(1);
    }
  }

  async flowDrink(pipe: PipeName, ms: number = 0): Promise<void> {
    this.turnOnPipe(pipe);
    await sleep(ms);
    this.turnOffPipe(pipe);
  }

  getPipe(pipe: PipeName): Gpio {
    return this.pipes.get(pipe);
  }

  hasPipe(pipe: PipeName): boolean {
    return this.pipes.has(pipe);
  }

  protected turnOnPipe(pipe: PipeName): void {
    if (this.hasPipe(pipe)) {
      this.getPipe(pipe).writeSync(RELAY_ON);
    }
  }

  protected turnOffPipe(pipe: PipeName) {
    if (this.hasPipe) this.getPipe(pipe).writeSync(RELAY_OFF);
  }

  protected switchPipe(pipe: PipeName) {
    if (this.getPipe(pipe).readSync() === 0) {
      this.turnOffPipe(pipe);
    } else {
      this.turnOnPipe(pipe);
    }
  }

  async check() {
    if (!this.isRunning) {
      this.run = true;

      (async () => {
        for (let pipe in PIPES) {
          if (pipe in PIPES) {
            const pipeName: PipeName = pipe as PipeName;
            this.turnOnPipe(pipeName);
            await sleep(500);
          } else {
            throw new Error(`Invalid pipe: ${pipe}`);
          }
        }
        for (let pipe in PIPES) {
          if (pipe in PIPES) {
            const pipeName: PipeName = pipe as PipeName;
            this.turnOffPipe(pipeName);
            await sleep(500);
          } else {
            throw new Error(`Invalid pipe: ${pipe}`);
          }
        }

        this.run = false;
      })();
    } else {
      throw new Error(`SmarTender is busy, please wait...`);
    }
  }

  async clean(ms: number) {
    if (!this.isRunning) {
      this.run = true;

      (async () => {
        for (let pipe in PIPES) {
          if (pipe in PIPES) {
            const pipeName: PipeName = pipe as PipeName;
            this.turnOnPipe(pipeName);
          } else {
            throw new Error(`Invalid pipe ${pipe}`);
          }
        }
        await sleep(ms);
        for (let pipe in PIPES) {
          if (pipe in PIPES) {
            const pipeName: PipeName = pipe as PipeName;
            this.turnOffPipe(pipeName);
          } else {
            throw new Error(`Invalid pipe ${pipe}`);
          }
        }
        this.run = false;
      })();
    } else {
      throw new Error(`SmarTender is busy, please wait...`);
    }
  }

  async mix(drink: CoctailReceipt) {
    if (!this.isRunning) {
      this.run = true;

      (async () => {
        const ingredients = drink.ingredients;
        const promises = [];
        for (let ingredient in ingredients) {
          for (let drinkPipe in this.drinkOptions) {
            if (ingredient === drinkPipe) {
              promises.push(
                this.flowDrink(
                  this.drinkOptions[drinkPipe].pipe,
                  ingredients[ingredient] * (1 / FLOW_RATE),
                ),
              );
            }
          }
        }
      })();
    } else {
      throw new Error(`SmarTender is busy, please wait...`);
    }
  }
}

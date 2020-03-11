import { PipeName } from 'src/common/types';

export interface CoctailProperties {
  name: string;
  pipe: PipeName;
}

export interface CoctailOptions {
  [key: string]: CoctailProperties;
}

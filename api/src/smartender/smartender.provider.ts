import { Logger, Provider } from '@nestjs/common';
import { SmarTender } from './smartender.service';

export const smarTenderProvider: Provider[] = [
  {
    provide: 'SmarTender',
    inject: [Logger],
    useFactory: async (logger: Logger) => {
      const smarTender = new SmarTender();

      smarTender.setup({}, {});

      return smarTender;
    },
  },
];

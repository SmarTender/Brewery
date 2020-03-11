import { Controller, Get, Param } from '@nestjs/common';
import ApiResponse from 'src/common/apiResponse.dto';
import { CoctailReceiptList } from './interface/coctailReceipt.interface';

@Controller('/coctail')
export class CoctailController {
  @Get('mix/:drink')
  async getCoctails(@Param('drink') drink: string): Promise<ApiResponse> {
    return new ApiResponse(true, 'Making your awesome drink!', drink);
  }

  @Get('receipt')
  async getReceipts(): Promise<CoctailReceiptList> {
    const receiptList: CoctailReceiptList = {
      ginJuice: {
        name: 'Gin & Juice',
        ingredients: {
          gin: 50,
          oj: 150,
        },
        image:
          'https://tipsybartender.com/wp-content/uploads/2018/01/GinJuiceThumb.jpg',
      },
      vodkaOrange: {
        name: 'Vodka Orange',
        ingredients: {
          vodka: 50,
          oj: 150,
        },
        image:
          'https://s3-eu-west-1.amazonaws.com/horizonlives3/PR139979/wp-content/uploads/2014/10/11173609/DRINK-GRID-whippedcream-orange.jpg',
      },
    };

    return receiptList;
  }
}

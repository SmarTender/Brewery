import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import ApiResponse from 'src/common/apiResponse.dto';
import { SmarTender } from 'src/smartender/smartender.service';
import { CoctailRecipeList } from './interface/coctailRecipe.interface';

@Controller('/coctail')
export class CoctailController {
  protected recipeList: CoctailRecipeList = {
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

  constructor(
    @Inject('SmarTender')
    protected readonly smarTender: SmarTender,
  ) {}

  @Get('mix/:drink')
  async getCoctails(@Param('drink') drink: string): Promise<ApiResponse> {
    if (!this.recipeList[drink]) {
      throw new NotFoundException(`Drink does not exist`);
    }

    try {
      await this.smarTender.mix(this.recipeList[drink]);
      return new ApiResponse(true, 'Making your awesome drink!', drink);
    } catch (e) {
      return new ApiResponse(false, e.message, drink);
    }
  }

  @Get('recipe')
  async getRecipeList(): Promise<CoctailRecipeList> {
    return this.recipeList;
  }
}

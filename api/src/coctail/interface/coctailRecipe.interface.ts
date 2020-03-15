export interface CoctailRecipeList {
  [key: string]: CoctailRecipe;
}

export interface CoctailRecipe {
  name: string;
  ingredients: CoctailIngredients;
  image?: string;
}

export interface CoctailIngredients {
  [key: string]: number;
}

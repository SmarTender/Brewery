export interface CoctailReceiptList {
  [key: string]: CoctailReceipt;
}

export interface CoctailReceipt {
  name: string;
  ingredients: CoctailIngredients;
  image?: string;
}

export interface CoctailIngredients {
  [key: string]: number;
}

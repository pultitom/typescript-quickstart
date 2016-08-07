import * as ProductCategory from "./productCategory";

export interface IProduct {
    name : string;
    price : number;
    category? : ProductCategory.SodaCategory
}

export class CocaCola implements IProduct {
    name = "CocaCola";
    price = 2.30;
    category = new ProductCategory.SodaCategory();
}

export class Sprite implements IProduct {
    name = "Sprite";
    price = 2.30;
    category = new ProductCategory.SodaCategory();
}
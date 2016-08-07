import { CocaCola, Sprite, IProduct } from "./product";

export default function GetProduct() : IProduct {  // "export default function" can be done to only one function in a module
   
    let randomNumber = Math.floor(Math.random() * 2);

    switch (randomNumber) {
        case 0: return new CocaCola();
        case 1: return new Sprite();
    }

    return new CocaCola();
}

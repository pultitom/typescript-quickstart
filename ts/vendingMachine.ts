/// <reference path="typings/knockout.d.ts" />
/// <reference path="typings/require.d.ts" />

import * as Coins from "./coin";
import { IProduct, CocaCola } from "./product"
import getRandomProduct from "./productFactory" // this one is good. import the default function with any name

export enum VendingMachineSize {
    small = 6,
    medium = 9,
    large = 12
}

class Cell {  // no need to export this class, because it's only used inside the module
    constructor(public product: IProduct) {
        
    }

    stock = ko.observable(3);
    sold = ko.observable(false);
}

export class VendingMachine {

    private paid = ko.observable(0);

    public cells = ko.observableArray([]);
    selectedCell = ko.observable(new Cell(new CocaCola()));
    
    canPay = ko.pureComputed(() => {
        return this.paid() - this.selectedCell().product.price >= 0;
    });

    acceptedCoins : Coins.Coin[] = [new Coins.Quarter(), new Coins.Dime()]; 

    set size(givenSize: VendingMachineSize) {
        this.cells([]);

        for (var index = 0; index < givenSize; index++) {
            let product = getRandomProduct();
            this.cells.push(new Cell(product));
        }
    } 
    
    acceptCoin = (coin: Coins.Coin) : void => {
        let oldTotal = this.paid();   // let has scope of block vs. var which has scope of function
        this.paid(oldTotal + coin.Value);
    }

    select = (cell: Cell) : void => {
        cell.sold(false);
        this.selectedCell(cell);
    }

    pay = () : void => {
        if (this.selectedCell().stock() < 1) {
            alert('Out of stock!');
            return;
        }
        let currentPaid = this.paid();
        this.paid(Math.round(((currentPaid - this.selectedCell().product.price)*100))/100);
        let currentStock = this.selectedCell().stock();
        this.selectedCell().stock(currentStock - 1);
        this.selectedCell().sold(true);
    }
}
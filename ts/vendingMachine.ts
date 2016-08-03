/// <reference path="quarter.ts" />
/// <reference path="productFactory.ts" />


enum VendingMachineSize {
    small = 6,
    medium = 9,
    large = 12
}

class Cell {
    constructor(public product: CocaCola) {
        
    }

    stock = ko.observable(3);
    sold = ko.observable(false);
}

class VendingMachine {

    private paid = ko.observable(0);

    cells = ko.observableArray([]);

    acceptedCoins : Quarter[] = [new Quarter()]; 

    set size(givenSize: VendingMachineSize) {
        this.cells([]);

        for (var index = 0; index < givenSize; index++) {
            let product = ProductFactory.GetProduct();
            this.cells.push(new Cell(product));
        }
    } 
    
    acceptCoin = (coin: Quarter) : void => {
        let oldTotal = this.paid();   // let has scope of block vs. var which has scope of function
        this.paid(oldTotal + coin.Value);
    }
}
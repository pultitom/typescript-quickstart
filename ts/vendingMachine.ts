/// <reference path="coin.ts" />
/// <reference path="typings/knockout.d.ts" />
/// <reference path="product.ts" />
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

    public cells = ko.observableArray([]);
    selectedCell = ko.observable(new Cell(new CocaCola()));
    
    canPay = ko.pureComputed(() => {
        return this.paid() - this.selectedCell().product.price >= 0;
    });

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
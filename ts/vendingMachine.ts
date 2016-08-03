/// <reference path="quarter.ts" />


class VendingMachine {

    private paid : any = ko.observable(0);

    acceptedCoins : Quarter[] = [new Quarter()]; 
    
    acceptCoin = (coin: Quarter) : void => {
        let oldTotal = this.paid();   // let has scope of block vs. var which has scope of function
        this.paid(oldTotal + coin.Value);
    }
}
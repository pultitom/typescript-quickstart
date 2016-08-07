export abstract class Coin {

    protected baseUrl : string = "img/";

    constructor(private value : number) {
    }

    public get Value() : number {
        return this.value;
    }

    abstract getImageUrl() : string;
}

export class Quarter extends Coin {

    constructor(){
        super(0.25);
    }

    getImageUrl() : string {
        return this.baseUrl + "quarter.png";
    }
}

export class Dime extends Coin {

    constructor(){
        super(0.10);
    }

    getImageUrl() : string {
        return this.baseUrl + "dime.jpg";
    }
}
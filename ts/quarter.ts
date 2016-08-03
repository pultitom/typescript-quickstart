class Quarter {
    constructor() {
        
    }

    private value : number = 0.25;

    getImageUrl() : string {
        return "img/quarter.png";
    }

    get Value() : number {
        return this.value;
    }

    set Value(newValue: number) {
        this.value = newValue;
    }
}
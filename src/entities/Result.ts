export interface IResult {
    id: number;
    p1: number;
    p2: number;
    p3: number;
    p4: number;
    p5: number;
    username: string;
    date: string;
}

class Result implements IResult {


    public id: number;
    public p1: number;
    public p2: number;
    public p3: number;
    public p4: number;
    public p5: number;
    public username: string;
    public date: string;

    constructor(result: IResult) {
        
        this.id = result.id;
        this.p1 = result.p1;
        this.p2 = result.p2;
        this.p3 = result.p3;
        this.p4 = result.p4;
        this.p5 = result.p5;
        this.username = result.username;
        this.date = result.date;

    }
}

export default Result;

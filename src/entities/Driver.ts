export interface IDriver {
    id: number;
    short: number;
    fname: string;
    lname: string;
    country: string;
    team: string;
    url: string;
}

class Driver implements IDriver {


    public id: number;
    public short: number;
    public fname: string;
    public lname: string;
    public country: string;
    public team: string;
    public url: string;

    constructor(driver: IDriver) {
        
        this.id = driver.id;
        this.short = driver.short;
        this.fname = driver.fname;
        this.lname = driver.lname;
        this.country = driver.country;
        this.team = driver.team;
        this.url = driver.url;

    }
}

export default Driver;

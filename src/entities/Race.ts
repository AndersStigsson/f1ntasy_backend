export interface IRace {
    id: number;
    name: string;
    country: string;
    date: string;
    url: string;
}

class Race implements IRace {


    public id: number;
    public name: string;
    public country: string;
    public date: string;
    public url: string;

    constructor(race: IRace) {
        
        this.id = race.id;
        this.name = race.name;
        this.country = race.country;
        this.date = race.date;
        this.url = race.url;

    }
}

export default Race;

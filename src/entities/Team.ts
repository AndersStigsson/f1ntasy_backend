export interface ITeam {
    short: string;
    name: string;
    color: string;
    logo: string;
    url: string;
}

class Team implements ITeam {


    public short: string;
    public name: string;
    public color: string;
    public logo: string;
    public url: string;
    
    constructor(team: ITeam) {
        
        this.short = team.short;
        this.name = team.name;
        this.color = team.color;
        this.logo = team.logo;
        this.url = team.url;

    }
}

export default Team;

import jsonfile from 'jsonfile';
import { IDriver } from '@entities/Driver';
const mariadb = require('mariadb');

interface IDatabase {
    drivers: IDriver[];
    getConnection: any;
}



class DriverDaoDB {

    private readonly dbFilePath = 'src/daos/MockDb/MockDb.json';

    private pool = mariadb.createPool({
        host: '127.0.0.1', 
        user:'root', 
        password: 'ecclestone',
        connectionLimit: 2,
   });
    protected openDb(): Promise<IDatabase> {
        
        return this.pool as Promise<IDatabase>;
    }


    protected saveDb(db: IDatabase): Promise<void> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}

export default DriverDaoDB;

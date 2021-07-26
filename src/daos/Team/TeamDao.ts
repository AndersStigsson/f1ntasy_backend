import { ITeam } from '@entities/Team';
import logger from '@shared/Logger';

import DriverDaoDB from '../Database/DriverDaoDB';

export interface ITeamDao {
    getOne: (short: string) => Promise<ITeam | null>;
    getAll: () => Promise<ITeam[]>;
}

class TeamDao extends DriverDaoDB implements ITeamDao {


    /**
     * @param email
     */
    public async getOne(short?: string): Promise<ITeam | null> {
      const db = await super.openDb();
      let conn;
      let rows;
      try {
            conn = await db.getConnection();

            rows = await conn.query("SELECT * from F1ntasy.teams where short = (?) ", [short]);

            return rows;
        } catch (err) {
          throw err;
        } finally {
          if (conn) conn.end();
        }
    }


    /**
     *
     */
    public async getAll(): Promise<ITeam[]> {
         // TODO
        const db = await super.openDb();
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query("SELECT * from F1ntasy.teams");
            logger.info(rows);
            return rows;
          } catch (err) {
            throw err;
          } finally {
            if (conn)  conn.end();
          }
    }

}

export default TeamDao;

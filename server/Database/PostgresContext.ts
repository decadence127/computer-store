import { dbConfig } from "./dbConfig";
import pg, { Pool } from "pg";
import { dbCredentials } from "../Utils/Constants/dbCredentials";

export class PostgresContext {
  private static contextInstance: PostgresContext;
  private connectionPool: Pool;

  private constructor() {
    this.connectionPool = new pg.Pool({
      host: dbCredentials.host,
      user: dbCredentials.user,
      port: Number(dbCredentials.port),
      password: dbCredentials.password,
    });
  }
  private async listAllDatabases(): Promise<String[]> {
    const result = await this.connectionPool.query(
      "SELECT datname FROM pg_database WHERE datistemplate = false;"
    );
    const dbList = result.rows.map((row) => row.datname);

    return dbList;
  }
  private async createDatabase(): Promise<void> {
    await this.connectionPool.query(`CREATE DATABASE "${dbCredentials.name}"`);
  }
  public static getInstance(): PostgresContext {
    return this.contextInstance || (this.contextInstance = new this());
  }
  async initialize(): Promise<void> {
    try {
      const dbList = await this.listAllDatabases();
      if (!dbList.includes(dbCredentials.name)) {
        await this.createDatabase();
      }
      await dbConfig.authenticate();
      await dbConfig.sync();
    } catch (e) {
      throw e;
    }
  }
}

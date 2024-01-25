import { Post, User } from "./entities";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "database.sqlite",
  entities: [User, Post],
  synchronize: true,
});

export default AppDataSource;

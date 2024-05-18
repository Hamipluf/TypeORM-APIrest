import { DataSource } from 'typeorm'
import { Users } from './entities/User'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    entities: [Users], //Aca indico las tablas que quiero que genere (entidades)
    synchronize: true,
}) 
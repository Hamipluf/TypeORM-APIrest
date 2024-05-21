import { DataSource } from 'typeorm';
import { Users } from './entities/Users';
import { Posts } from './entities/Posts';
import {
    DATABASE_PORT,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_USERNAME
} from './config';
class Database {
    // Declara una propiedad estática para almacenar la instancia única de la clase Database.
    private static instance: Database;
    // Declara una propiedad para almacenar el objeto DataSource que representa la conexión a la base de datos.
    private dataSource: DataSource;

    private constructor() {  // Define un constructor privado para evitar que se creen instancias directamente.
        this.dataSource = new DataSource({
            type: "postgres",
            host: DATABASE_HOST,
            port: parseInt(DATABASE_PORT || '5432', 10),
            username: DATABASE_USERNAME,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME,
            entities: [Users, Posts],
            ssl: true,
            synchronize: true,  // Permite que TypeORM sincronice las entidades con la base de datos (útil para desarrollo).
        });
    }

    // Método estático para obtener la instancia única de Database.
    public static getInstance(): Database {
        if (!Database.instance) {  // Si no existe una instancia, crea una nueva.
            Database.instance = new Database();
        }
        return Database.instance;  // Devuelve la instancia única.
    }

    // Método para inicializar la conexión a la base de datos.
    public async connect(): Promise<DataSource> {
        // Comprueba si el DataSource no está inicializado.
        if (!this.dataSource.isInitialized) {
            // Inicializo la conexión a la base de datos.
            try {
                await this.dataSource.initialize();
                console.log("PostgreSQL is connected!");
            } catch (error) {
                console.log("Error conectado a la base PostgreSQL", error)
            }
        }
        return this.dataSource;
    }

    // Metodo para obtener el objeto DataSource directamente.
    public getDataSource(): DataSource {
        return this.dataSource;
    }
}

const database = Database.getInstance();
export default database;


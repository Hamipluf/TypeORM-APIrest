import { DataSource } from 'typeorm';
import { Users } from './entities/User';

export class Database {
    // Declara una propiedad estática para almacenar la instancia única de la clase Database.
    private static instance: Database;
    // Declara una propiedad para almacenar el objeto DataSource que representa la conexión a la base de datos.
    private dataSource: DataSource;

    private constructor() {  // Define un constructor privado para evitar que se creen instancias directamente.
        this.dataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            database: "your_database",
            entities: [Users],
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
            await this.dataSource.initialize();
            console.log("Database connected!");  
        }
        return this.dataSource;  
    }

    // Metodo para obtener el objeto DataSource directamente.
    public getDataSource(): DataSource { 
        return this.dataSource;  
    }
}



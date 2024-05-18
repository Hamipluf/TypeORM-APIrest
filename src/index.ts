import "reflect-metadata"
import app from './app'
import { Database } from "./DB"
const db = Database.getInstance();  // Obtiene la instancia única de Database.
async function main() {

    try {
        // Conecta a la base de datos y maneja la promesa resultante.
        await db.connect()
        console.log("Database connected");  // Imprime un mensaje cuando la base de datos está lista para usar.


        app.listen(3000, () => {
            console.log("Server listening in port:", 3000)
        })
    } catch (error) {
        console.log("Database connection error: ", error)
    }

}

main()
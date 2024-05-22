import "reflect-metadata"
import app from './app'
import database from "./DB"
import { APP_PORT } from "./config"

const port = APP_PORT || 3000
async function main() {

    try {
        // Conecta a la base de datos
        await database.connect()
        app.listen(port, () => {
            console.log("Server listening in port:", port)
        })
    } catch (error) {
        console.log("Database connection error: ", error)
    }

}

main()
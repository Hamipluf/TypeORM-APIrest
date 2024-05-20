import "reflect-metadata"
import app from './app'
import database from "./DB"
async function main() {

    try {
        // Conecta a la base de datos
        await database.connect()
        app.listen(3000, () => {
            console.log("Server listening in port:", 3000)
        })
    } catch (error) {
        console.log("Database connection error: ", error)
    }

}

main()
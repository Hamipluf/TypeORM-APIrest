import "reflect-metadata"
import app from './app'
import { AppDataSource } from "./DB"
async function main() {
    
    try {
        await AppDataSource.initialize()
        console.log('DB Connected');
        
        app.listen(3000, () => {
            console.log("Server listening in port:", 3000)
        })
    } catch (error) {
        
    }

}

main()
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/user.routes'


const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)

export default app
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import postRoutes from './routes/post.routes'


const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

export default app
import express from 'express'
import { postsRoutes } from './src/routes/postsRoutes.js'

const app = express()

app.use(express.json())

app.listen(3000, () => {
  console.log('Server ready in http://localhost:3000')
})

app.use(express.static('images'))

postsRoutes(app)
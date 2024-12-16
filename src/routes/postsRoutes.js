import express from 'express'
import multer from 'multer'
import cors from 'cors'

import { getPostController, getPostsController, newPostController, updatePostController } from '../controllers/postsController.js'

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200,
}

const upload = multer({
  dest: './images'
})

export const postsRoutes = (app) => {
  app.use(express.json())
  app.use(cors(corsOptions))

  app.get('/posts', getPostsController)
  app.get('/post/:id', getPostController)
  app.post('/upload', upload.single("image"), newPostController)
  app.put('/upload/:id', updatePostController)
}
import express from 'express'
import { getPost, getPosts } from '../controllers/postsController.js'

export const postsRoutes = (app) => {
  app.use(express.json())

  app.get('/posts', getPosts)
  app.get('/post/:id', getPost)
}
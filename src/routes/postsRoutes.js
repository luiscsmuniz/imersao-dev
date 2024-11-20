import express from 'express'
import { getPosts } from '../controllers/postsController.js'

export const postsRoutes = (app) => {
  app.use(express.json())

  app.get('/posts', getPosts)
}
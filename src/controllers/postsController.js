import { getAllPosts } from "../models/postModels.js"

export const getPosts =  async (req, res) => {
  const posts = await getAllPosts()
  res.status(200).json(posts)
}
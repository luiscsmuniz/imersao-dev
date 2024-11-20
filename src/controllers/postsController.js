import { getAllPosts, getPostById } from "../models/postModels.js"

export const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve posts', error: error.message })
  }
}

export const getPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await getPostById(id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve post', error: error.message })
  }
}

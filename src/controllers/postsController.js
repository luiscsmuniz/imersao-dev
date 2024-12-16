import path from 'path'
import fs from 'fs'
import { createPost, getAllPosts, getPostById, updatePost } from "../models/postModels.js"
import { sendPrompt } from '../services/geminiService.js'

export const getPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve posts', error: error.message })
  }
}

export const getPostController = async (req, res) => {
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

export const newPostController = async (req, res) => {
  const newPost = {
    description: req.body.description || "",
    url: req.file ? req.file.originalname : "",
    alt: req.body.alt || ""
  }

  const extension = req.file ? path.extname(req.file.originalname) : null

  try {
    const newPostCreated = await createPost(newPost)

    const updateImage = `images/${newPostCreated.insertedId}${extension}`

    fs.renameSync(req.file.path, updateImage)

    res.status(200).json(newPostCreated)
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve post', error: error.message })
  }
}

export const updatePostController = async (req, res) => {
  const id = req.params.id
  const post = await getPostById(id)
  const extension = path.extname(post.url)
  const url = `http://localhost:3000/${id}${extension}`

  try {
    const imageBuffer = fs.readFileSync(`images/${id}${extension}`)

    const updateData = {
      description: req.body.description || await sendPrompt(
        'Gere uma descrição breve e objetivo do que se trata a imagem e em português do brasil',
        {
          inlineData: {
            data: imageBuffer.toString("base64"),
            mimeType: `image/${extension.replace('.', '')}`,
          },
        }
      ),
      alt: req.body.alt || await sendPrompt(
        'Gere um alt em português do brasil para a seguinte imagem',
        {
          inlineData: {
            data: imageBuffer.toString("base64"),
            mimeType: `image/${extension.replace('.', '')}`,
          },
        }
      ),
      url,
    }

    const update = await updatePost(id, updateData)
    res.status(200).json(update)
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve post', error: error.message })
  }
}

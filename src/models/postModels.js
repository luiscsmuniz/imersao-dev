import { ObjectId } from "mongodb"
import { dbConnect } from "../config/dbConnect.js"

const connect = await dbConnect()
const db = connect.db(process.env.MONGODB_DB)

export const getAllPosts = async () => {
  const collection = await db.collection('posts')

  return collection.find().toArray()
}

export const getPostById = async (id) => {
  const collection = db.collection('posts')

  const objectId = typeof id === 'string' ? new ObjectId(id) : null

  if (!objectId) {
    throw new Error('Invalid ID format')
  }

  const post = await collection.findOne({ _id: objectId })

  return post
}

export const createPost = async (newPost) => {
  const collection = await db.collection('posts')
  return collection.insertOne(newPost)
}

export const updatePost = async (id, data) => {
  const collection = await db.collection('posts')
  const objectId = ObjectId.createFromHexString(id)

  return collection.updateOne({
    _id: new ObjectId(objectId)
  }, {$set:data})
}


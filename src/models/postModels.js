import { ObjectId } from "mongodb"
import { dbConnect } from "../config/dbConnect.js"

const connect = await dbConnect()

export const getAllPosts = () => {
  const db = connect.db(process.env.MONGODB_DB)

  const collection = db.collection('posts')

  return collection.find().toArray()
}

export const getPostById = async (id) => {
  const db = connect.db(process.env.MONGODB_DB)
  const collection = db.collection('posts')

  const objectId = typeof id === 'string' ? new ObjectId(id) : null

  if (!objectId) {
    throw new Error('Invalid ID format')
  }

  const post = await collection.findOne({ _id: objectId })

  return post
}
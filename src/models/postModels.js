import { dbConnect } from "../config/dbConnect.js"

const connect = await dbConnect()

export const getAllPosts = () => {
  const db = connect.db(process.env.MONGODB_DB)

  const collection = db.collection('posts')

  return collection.find().toArray()
}
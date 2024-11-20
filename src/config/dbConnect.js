import { MongoClient } from 'mongodb'

export const dbConnect = async () => {
  let mongoClient;

  try {
    mongoClient = new MongoClient(process.env.MONGODB_CONNECTION)
    await mongoClient.connect()
    console.log('Banco de dados conectado com sucesso')
    return mongoClient
  } catch (error) {
    console.log('erro: ', error.message)
    process.exit()
  }
}
import express from 'express'

const app = express()

app.listen(3000, () => {
  console.log('Server ready in localhost:3000')
})

console.log(process.env.GEMINI_API_KEY)

app.get('/api', (req, res) => {
  res.status(200).send('hello world')
})
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export const sendPrompt = async (prompt, data) => {
  try {
    const res = await model.generateContent([prompt, data])
    return res.response.text() || ''
  } catch (error) {
    console.error("Erro ao obter resultado do prompt:", error.message, error)
    throw new Error("Erro ao obter o resultado do prompt do Gemini.")
  }
}

import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "Executive Glass AI", an elite strategic business consultant and data analyst. 
Your tone is professional, highly strategic, and concise. 
Avoid filler words. Focus on ROI, market trends, operational efficiency, and scalable growth. 
Provide insights in structured formats (bullet points, clear headings) when appropriate. 
Always remain strictly professional and executive in nature.`;

export const getBusinessInsights = async (prompt: string, history: { role: string, content: string }[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // We transform the internal roles 'assistant' to 'model' for the API
    const formattedHistory = history.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }));

    // For complex strategic reasoning with gemini-3-pro-preview, 
    // we must provide a non-zero thinking budget as the model requires it for operation.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        thinkingConfig: { thinkingBudget: 32768 }
      },
    });

    return response.text || "Unable to retrieve insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The strategic analysis system encountered a configuration issue with the reasoning engine. Please try your request again.";
  }
};

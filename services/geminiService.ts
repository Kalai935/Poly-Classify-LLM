import { GoogleGenAI, Type } from "@google/genai";
import { FewShotExample, ClassificationResult } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure the environment is configured correctly.");
  }
  return new GoogleGenAI({ apiKey });
};

export const classifyText = async (
  inputText: string,
  categories: string[],
  examples: FewShotExample[]
): Promise<ClassificationResult> => {
  const ai = getClient();

  // Constructing the Few-Shot Prompt Context
  let examplesContext = "";
  if (examples.length > 0) {
    examplesContext = "Here are some few-shot examples to guide your classification:\n";
    examples.forEach((ex, index) => {
      examplesContext += `Example ${index + 1}:\nInput: "${ex.text}"\nLabel: "${ex.label}"\n---\n`;
    });
  }

  const systemInstruction = `
    You are an expert multi-language text classifier. 
    Your task is to classify the provided text into exactly one of the following categories: ${categories.join(", ")}.
    
    ${examplesContext}
    
    Analyze the user input, determine the language, pick the most appropriate category from the allowed list, and explain your reasoning briefly.
    The confidence score should be between 0 and 1.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: inputText,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            label: {
              type: Type.STRING,
              description: "The predicted category label from the allowed list.",
            },
            confidence: {
              type: Type.NUMBER,
              description: "Confidence score between 0.0 and 1.0",
            },
            reasoning: {
              type: Type.STRING,
              description: "A brief explanation of why this label was chosen.",
            },
            detectedLanguage: {
              type: Type.STRING,
              description: "The language detected in the input text (e.g., English, Spanish, Japanese).",
            },
          },
          required: ["label", "confidence", "reasoning", "detectedLanguage"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const result = JSON.parse(text) as ClassificationResult;
    return result;

  } catch (error: any) {
    console.error("Gemini Classification Error:", error);
    throw new Error(error.message || "Failed to classify text.");
  }
};
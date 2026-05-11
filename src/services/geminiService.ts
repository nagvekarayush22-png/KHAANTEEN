import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getMealRecommendations(params: {
  budget?: number;
  calories?: string;
  mood?: string;
  timeOfDay?: string;
}) {
  const menuStr = MENU_ITEMS.map(item => `${item.name} (₹${item.price})`).join(", ");
  
  const prompt = `
    Based on the following canteen menu: ${menuStr}.
    Suggest 3 items for a user with:
    - Budget: ₹${params.budget || 'Any'}
    - Calories preference: ${params.calories || 'Any'}
    - Mood: ${params.mood || 'Any'}
    - Time of day: ${params.timeOfDay || 'Any'}
    
    Return the names of the 3 items as a comma separated list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    const suggestedNames = response.text?.split(",").map(n => n.trim()) || [];
    return MENU_ITEMS.filter(item => suggestedNames.some(name => name.includes(item.name)));
  } catch (error) {
    console.error("Gemini Error:", error);
    return MENU_ITEMS.slice(0, 3); // Fallback
  }
}

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

async function findModels() {
  try {
    console.log("Checking available models...");
    const list = await client.models.list();
    
    console.log("\n✅ VALID MODEL NAMES FOR YOU:");
    list.data.forEach(model => {
        // Only show models that are "ready"
        if (model.id.includes("gemini")) {
            console.log(`- ${model.id}`);
        }
    });
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

findModels();
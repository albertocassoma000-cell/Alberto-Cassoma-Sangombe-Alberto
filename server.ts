import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up JSON body parser with increased limit for base64 image uploads
app.use(express.json({ limit: "10mb" }));

// Lazy initializer for Google GenAI client
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// 2. API: Nutritional AI Assistant Chat Proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Mensagem é necessária." });
      return;
    }

    const ai = getGeminiClient();

    // Map custom history structure to Gemini chat contents if provided, or use standard string
    const systemInstruction = 
      "Você é o Assistente Virtual Nutricional do aplicativo 'Vida Saudável'. " +
      "Seu objetivo é fornecer respostas claras, educativas e baseadas em evidências científicas confiáveis sobre nutrição, " +
      "benefícios de alimentos, perda de peso, hipertrofia e dietas saudáveis. " +
      "Por favor, responda SEMPRE em português com um tom acolhedor, profissional, motivador e cientificamente correto. " +
      "Sempre inclua conselhos práticos e fáceis de aplicar no dia a dia. Se o usuário perguntar sobre alimentos típicos de Angola " +
      "(como Funge, Kizaka, Calulu, Mufete, Cacusso), mostre orgulho e conhecimento cultural sobre as tradições gastronómicas angolanas.";

    // Simple single-turn generation with context to prevent history mapping errors
    let contextPrompt = `Instrução: ${systemInstruction}\n\n`;
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        const senderLabel = msg.sender === "user" ? "Usuário" : "Assistente";
        contextPrompt += `${senderLabel}: ${msg.text}\n`;
      });
    }
    contextPrompt += `Usuário: ${message}\nAssistente:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contextPrompt,
    });

    const replyText = response.text || "Desculpe, não consegui processar sua resposta no momento.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Erro no chat da IA:", error);
    res.status(500).json({ 
      error: "Erro ao comunicar com o assistente de IA.", 
      details: error.message || error 
    });
  }
});

// 3. API: Smart Food Image Scanner Proxy
app.post("/api/scan", async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;
    if (!imageBase64 || !mimeType) {
      res.status(400).json({ error: "Dados da imagem e tipo MIME são necessários." });
      return;
    }

    const ai = getGeminiClient();

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: imageBase64,
      },
    };

    const promptString = 
      "Analise esta imagem de comida. Identifique o alimento principal presente na imagem e forneça as informações nutricionais detalhadas e completas por cada 100g. " +
      "Retorne OBRIGATORIAMENTE um objeto JSON válido correspondente ao seguinte esquema:";

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Nome comum do alimento em português" },
        scientificName: { type: Type.STRING, description: "Nome científico do alimento" },
        category: { type: Type.STRING, description: "Categoria do alimento (ex: Fruta, Legume, Verdura, Carne, Peixe, Cereal, Bebida, Prato Tradicional)" },
        family: { type: Type.STRING, description: "Família botânica ou biológica" },
        origin: { type: Type.STRING, description: "Origem geográfica comum" },
        description: { type: Type.STRING, description: "Breve descrição sobre o alimento e sua textura ou sabor" },
        calories: { type: Type.INTEGER, description: "Calorias por 100g em kcal" },
        water: { type: Type.NUMBER, description: "Teor de água em gramas por 100g" },
        protein: { type: Type.NUMBER, description: "Proteínas em gramas por 100g" },
        carbs: { type: Type.NUMBER, description: "Carboidratos em gramas por 100g" },
        fats: { type: Type.NUMBER, description: "Gorduras totais em gramas por 100g" },
        fiber: { type: Type.NUMBER, description: "Fibras alimentares em gramas por 100g" },
        sugar: { type: Type.NUMBER, description: "Açúcares em gramas por 100g" },
        glycemicIndex: { type: Type.INTEGER, description: "Índice glicêmico aproximado (0-100)" },
        benefits: { type: Type.STRING, description: "Lista compacta de 3 a 4 benefícios principais para o corpo" },
        contraindications: { type: Type.STRING, description: "Quem deve evitar ou contraindicações importantes" },
      },
      required: ["name", "scientificName", "category", "calories", "protein", "carbs", "fats", "benefits"],
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, { text: promptString }],
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("A IA gerou uma resposta vazia.");
    }

    const parsedJson = JSON.parse(resultText.trim());
    res.json(parsedJson);
  } catch (error: any) {
    console.error("Erro no scanner da IA:", error);
    res.status(500).json({ 
      error: "Falha ao identificar o alimento na imagem.", 
      details: error.message || error 
    });
  }
});

// Serve Frontend using Vite middleware in dev or static files in production
async function boot() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Vida Saudável running on http://localhost:${PORT}`);
  });
}

boot().catch((err) => {
  console.error("Failed to start server:", err);
});

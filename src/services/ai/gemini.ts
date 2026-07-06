/**
 * Centralized Gemini AI Service
 *
 * All future AI features must route through this service.
 * This ensures consistent error handling, rate limiting hooks,
 * token tracking, and a single point of configuration.
 *
 * Usage:
 *   import { gemini } from "@/services/ai/gemini";
 *   const result = await gemini.generate({ prompt: "...", model: "gemini-pro" });
 */

export interface GeminiRequestOptions {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemInstruction?: string;
  responseFormat?: "text" | "json";
}

export interface GeminiResponse {
  text: string;
  tokensUsed: number;
  model: string;
  finishReason: string;
}

export interface GeminiError {
  code: string;
  message: string;
  status: number;
}

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL = "gemini-2.0-flash";

class GeminiService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY ?? "";
  }

  get isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  async generate(options: GeminiRequestOptions): Promise<GeminiResponse> {
    if (!this.isConfigured) {
      throw new Error("Gemini API key is not configured");
    }

    const model = options.model ?? DEFAULT_MODEL;
    const url = `${GEMINI_API_URL}/models/${model}:generateContent?key=${this.apiKey}`;

    const body: Record<string, unknown> = {
      contents: [
        {
          parts: [{ text: options.prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: options.maxTokens ?? 2048,
        temperature: options.temperature ?? 0.7,
      },
    };

    if (options.systemInstruction) {
      body.systemInstruction = {
        parts: [{ text: options.systemInstruction }],
      };
    }

    if (options.responseFormat === "json") {
      (body.generationConfig as Record<string, unknown>).responseMimeType =
        "application/json";
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw {
        code: "GEMINI_ERROR",
        message: error?.error?.message ?? "Gemini API request failed",
        status: response.status,
      } as GeminiError;
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text ?? "";
    const tokensUsed =
      (data.usageMetadata?.promptTokenCount ?? 0) +
      (data.usageMetadata?.candidatesTokenCount ?? 0);

    return {
      text,
      tokensUsed,
      model,
      finishReason: candidate?.finishReason ?? "STOP",
    };
  }
}

export const gemini = new GeminiService();

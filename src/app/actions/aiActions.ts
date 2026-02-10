/**
AI ASSISTANT SERVER ACTIONS:
 * Purpose: Provides server-side AI functionality using OpenAI's GPT-4 for:
 * 1. Student major recommendations based on profile
 * 2. General chat assistance
 */

"use server";

import OpenAI from "openai";
import { t, type Lang } from "./actionsTranslation";

// Student profile data structure for AI analysis
export type StudentAIInput = {
  gpa: number;
  highSchoolField: string;
  city: string;
  preferSameCity: "yes" | "no";
  preferredLanguages: string[];
  subjectsStudied: string[];
  preferredFieldType: string;
};

// Chat message structure
interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* Function to get AI-powered major recommendations for a student based on:
 * 1. Student's academic profile and preferences
 * 2. Response language ("en" or "ar")
 */
export async function askAI(input: StudentAIInput, language: "en" | "ar") {
  const chatLanguage = language == "en" ? "English" : "Arabic";

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an academic advisor.
                  Please advise me based on the info describing a high school student (me).
                  Your job is to analyze it and give me advice on suitable college fields/majors based on where I live and my intrests.
                  Assume I live in Iraq and the city is determined in the info I sent.
                  NOTE: Please send the response in ${chatLanguage} language.`,
      },
      {
        role: "user",
        content: JSON.stringify(input),
      },
    ],
  });

  return completion.choices[0].message.content;
}

// Function to send a message to the AI assistant (general chat)
export async function sendMessage(messages: AIMessage[], lang: Lang = "en") {
  try {
    // Validate input
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages format");
    }

    // Send conversation to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7, // Creativity level (0-1)
      max_tokens: 1000, // Response length limit (use reasonable quota)
    });

    return {
      success: true,
      message: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      success: false,
      message: t(lang, "aiError"), // Localized error message
    };
  }
}

"use server";

import OpenAI from "openai";
import { t, type Lang } from "./actionsTranslation";

export type StudentAIInput = {
  gpa: number;
  highSchoolField: string;
  city: string;
  preferSameCity: "yes" | "no";
  preferredLanguages: string[];
  subjectsStudied: string[];
  preferredFieldType: string;
};

interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

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

export async function sendMessage(messages: AIMessage[], lang: Lang = "en") {
  try {
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages format");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      success: true,
      message: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      success: false,
      message: t(lang, "aiError"),
    };
  }
}

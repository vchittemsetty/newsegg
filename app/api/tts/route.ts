import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await client.audio.speech.create({
      model: "gpt-4o-mini-tts", // OpenAI TTS model
      voice: "alloy",           // other options: "verse", "sage", etc.
      input: text,
    });

    // Convert response to ArrayBuffer (MP3 stream)
    const buffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "TTS failed" }, { status: 500 });
  }
}

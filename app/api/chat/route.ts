import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 🔴 PASTE YOUR GROQ KEY HERE (starts with gsk_...)
    // ✅ SAFE
    const apiKey = process.env.GROQ_API_KEY; 

    if (!apiKey || apiKey.includes("PASTE_YOUR_KEY")) {
      return NextResponse.json({ error: "Missing Groq API Key" }, { status: 500 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // ✅ UPDATED: The new stable model name
        model: "llama-3.3-70b-versatile", 
        messages: [
          {
            role: "system",
            content: "You are Mindx, a helpful portfolio assistant for Saransh. Answer questions about his projects and skills briefly."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("❌ Groq Error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const reply = data.choices[0]?.message?.content || "System Error";

    return NextResponse.json({ text: reply });

  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
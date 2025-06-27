import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {notes}=await req.json();
  try {
    const completion = await openai.chat.completions.create({
      // model: "google/gemini-2.0-flash-exp:free",
      model:"google/gemini-2.0-flash-001",
      messages: [
        {role:"system",content:JSON.stringify(AIDoctorAgents)},
        { role: "user", content: `User Notes/Symptoms: ${notes}. Based on this, return an array as: { suggested_doctors: doctorAgent[] }` }
    ],
    });

    const rawResp=completion.choices[0].message || "";
    //@ts-ignore
    const Resp=rawResp.content.trim().replace('```json','').replace('```','');
    const JSONResp=JSON.parse(Resp);
    // console.log(JSONResp);
    return NextResponse.json(JSONResp);
    
  } catch (error) {
    console.log(error);
  }
}

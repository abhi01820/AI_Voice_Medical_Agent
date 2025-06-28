import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { AIDoctorAgents } from "@/shared/list";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { report } from "process";



const REPORT_GEN_PROMPT = `
You are an AI Medical Voice Agent that has just completed a voice conversation with a user regarding their medical condition.

Your job is to generate a **fully detailed and helpful medical session report**, even if the user did not provide complete information. You must **infer** possible answers using medical reasoning based on the conversation and the doctor’s specialty.

Generate the report in the following format:

{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}

Instructions:
- If the user didn’t explicitly mention something (like duration, medications, etc.), make **reasonable assumptions** based on typical medical knowledge.
- For example: 
   - “fever and cough” often implies “Paracetamol” and “Rest, hydration, visit a doctor if persistent.”
   - If no name is provided, use "Anonymous".
   - If medications are not mentioned, suggest common ones for the symptoms.
- Avoid leaving any fields blank or as “Unknown” unless there is absolutely no clue.

Be professional, concise, and medically sound. 
Output only the valid JSON object. Do NOT include any explanations, markdown syntax, or extra formatting.
`;





export async function POST(req:NextRequest){
    const {sessionId,sessionDetail,messages}=await req.json();

    try {
        const UserInput="AI Doctor Agent Info : "+ JSON.stringify(sessionDetail)+" . Conversation :"+JSON.stringify(messages);
        const completion = await openai.chat.completions.create({
              // model: "google/gemini-2.0-flash-exp:free",
              model:"google/gemini-2.0-flash-001",
              messages: [
                {role:"system",content:REPORT_GEN_PROMPT},
                { role: "user", content:UserInput}
            ],
            });
        
            const rawResp=completion.choices[0].message || "";
            //@ts-ignore
            const Resp=rawResp.content.trim().replace('```json','').replace('```','');
            const JSONResp=JSON.parse(Resp);

            const result=await db.update(SessionChatTable).set({
                report:JSONResp,
                conversation:messages
            }).where(eq(SessionChatTable.sessionId,sessionId));
            return NextResponse.json(JSONResp);
    } catch (e) {
        return NextResponse.json(e);
    }
}
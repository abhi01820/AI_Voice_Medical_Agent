"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";
import { Messages } from "openai/resources/chat/completions.mjs";
import { toast } from "sonner";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currenRoll, setCurrentRole] = useState<string>();
  const [transcripts, setTranscripts] = useState<
    { role: string; text: string }[]
  >([]);
  const [currentTranscript, setCurrentTranscript] = useState<string>("");
  const [currentRole, setRole] = useState<string>("assistant");
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
 const router=useRouter();



  const handleCallStart = () => {
    setCallStarted(true);
  };

  const handleCallEnd = () => {
    setCallStarted(false);
  };

  const handleMessage = (message: any) => {
    if (message.type === "transcript") {
      const { role, transcriptType, transcript } = message;
      if (transcriptType === "partial") {
        setCurrentTranscript(transcript);
        setRole(role);
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
          setTranscripts((prev) => [
            ...prev.slice(-3),
            { role, text: transcript },
          ]);
          setCurrentTranscript("");
        }, 1000);
      }
    }
  };

  const handleSpeechStart = () => setCurrentRole("assistant");
  const handleSpeechEnd = () => setCurrentRole("user");

  const StartCall = () => {
    setLoading(true);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    vapi.on("call-start", () => {
      handleCallStart();
      setLoading(false);
    });

    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);

    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
  };

  const endCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;
    vapiInstance.off("call-start", handleCallStart);
    vapiInstance.off("call-end", handleCallEnd);
    vapiInstance.off("message", handleMessage);
    vapiInstance.off("speech-start", handleSpeechStart);
    vapiInstance.off("speech-end", handleSpeechEnd);
    vapiInstance.stop();
    setCallStarted(false);
    setVapiInstance(null);
    toast.success('Your report is generated !');
    router.replace('/dashboard');
    setLoading(false);
  };

  const GenerateReport = async () => {
    const result = await axios.post("/api/medical-report", {
      messages: Messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    });

    console.log(result.data);
    return result.data;
  };

  useEffect(() => {
    if (sessionId) {
      GetSessionDetails();
    }
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get(
        "/api/session-chat?sessionId=" + sessionId
      );
      setSessionDetail(result.data);
    } catch (error) {
      console.error("Error fetching session details:", error);
    }
  };

  const doctor = sessionDetail?.selectedDoctor;
  const imageSrc = doctor?.image?.startsWith("/")
    ? doctor.image
    : `/${doctor?.image}`;

  return (
    <div className="p-0 md:p-0 lg:p-0 bg-secondary w-full min-h-screen overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-4">
          <div className="w-full max-w-sm aspect-[3/4] relative rounded-2xl overflow-hidden shadow-md border border-gray-200">
            {doctor?.image && (
              <Image
                src={imageSrc}
                alt={doctor.specialist}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative flex flex-col justify-between p-4 bg-gray-50">
          <div className="flex items-center justify-between p-3 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <Circle
                className={`h-3.5 w-3.5 ${
                  callStarted
                    ? "text-green-500 fill-green-500 animate-pulse"
                    : "text-red-500 fill-red-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  callStarted ? "text-green-700" : "text-red-600"
                }`}
              >
                {callStarted ? "Connected" : "Not Connected"}
              </span>
            </div>
            <div className="text-sm text-gray-500 font-mono">00:00</div>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {doctor?.specialist}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{doctor?.description}</p>
            <p className="text-sm italic text-gray-400 mt-1">
              AI Medical Voice Agent
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 overflow-hidden min-h-[200px]">
            {transcripts.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm px-4 py-2 rounded-full w-fit max-w-xs shadow-md transition-opacity duration-500 ease-in-out ${
                  msg.role === "assistant"
                    ? "self-start text-green-800 bg-green-100"
                    : "self-end text-blue-800 bg-blue-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {currentTranscript && (
              <div
                className={`text-sm px-4 py-2 rounded-full w-fit max-w-xs shadow-md italic animate-pulse ${
                  currentRole === "assistant"
                    ? "self-start text-green-800 bg-green-100"
                    : "self-end text-blue-800 bg-blue-100"
                }`}
              >
                {currentTranscript}
              </div>
            )}
          </div>

          <div className="mt-6">
            {!callStarted ? (
              <Button
                onClick={StartCall}
                disabled={loading}
                className="w-full cursor-pointer px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 rounded-xl shadow-md transition duration-200"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="white"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Starting...
                  </>
                ) : (
                  <>
                    <PhoneCall className="w-4 h-4" /> Start Call
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={endCall}
                className="w-full cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneOff className="w-4 h-4" /> Disconnect
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;

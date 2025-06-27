// "use client";
// import axios from "axios";
// import { Circle } from "lucide-react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// export type doctorAgent = {
//   id: number;
//   specialist: string;
//   description: string;
//   image: string;
//   agentPrompt: string;
// };

// type SessionDetail = {
//   id: number;
//   notes: string;
//   sessionId: string;
//   report: JSON;
//   selectedDoctor: doctorAgent;
//   createdOn: string;
// };

// function MedicalVoiceAgent() {
//   const { sessionId } = useParams();
//   const [sessionDetail, setSessionDetail] = useState<SessionDetail>();

//   useEffect(() => {
//     sessionId && GetSessionDetails;
//   }, [sessionId]);
//   const GetSessionDetails = async () => {
//     const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
//     console.log(result.data);
//     setSessionDetail(result.data);
//   };

//   const imageSrc = doctorAgent.image?.startsWith("/")
//       ? doctorAgent.image
//       : `/${doctorAgent.image}`;

//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
//           <Circle className="h-4 w-4" /> Not Connected{" "}
//         </h2>
//         <h2 className="font-bold text-xl text-gray-400">00:00</h2>
//       </div>
//       {sessionDetail && (
//         <div className="w-full h-[150px] relative">
//                 {doctorAgent.image ? (
//                   <Image
//                     src={imageSrc}
//                     alt={doctorAgent.specialist}
//                     width={200}
//                     height={200}
//                     className="w-full h-full object-contain rounded-md"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
//                     No Image
//                   </div>
//                 )}
//               </div>
//       )}
//     </div>
//   );
// }

// export default MedicalVoiceAgent;


"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, PhoneCall } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    if (sessionId) {
      GetSessionDetails();
    }
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
      console.log(result.data);
      setSessionDetail(result.data);
    } catch (error) {
      console.error("Error fetching session details:", error);
    }
  };

  const doctor = sessionDetail?.selectedDoctor;
  const imageSrc = doctor?.image?.startsWith("/") ? doctor.image : `/${doctor?.image}`;

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-secondary rounded-3xl shadow-xl max-w-screen-lg mx-auto mt-10">
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Full responsive image block */}
        <div className="w-full lg:w-1/2 flex justify-center">
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

        {/* Doctor Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <Circle className="h-3 w-3 text-red-500" fill="red" />
            <span className="text-sm text-gray-500">Not Connected</span>
            <span className="ml-auto text-sm text-gray-400">00:00</span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">{doctor?.specialist}</h2>
          <p className="text-gray-500 text-sm">{doctor?.description}</p>
          <p className="text-sm italic text-gray-400">AI Medical Voice Agent</p>

          <div className="bg-gray-50 rounded-xl p-4 shadow-inner text-left mt-4">
            <p className="text-xs text-gray-500 mb-1">Assistant:</p>
            <p className="text-sm font-medium text-gray-700 mb-3">"Hello, how can I assist you today?"</p>
            <p className="text-xs text-gray-500 mb-1">User:</p>
            <p className="text-sm text-gray-700">"I have chest pain and feel short of breath."</p>
          </div>

          <Button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 rounded-xl shadow-md transition duration-200">
            <PhoneCall className="w-4 h-4" /> Start Call
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;

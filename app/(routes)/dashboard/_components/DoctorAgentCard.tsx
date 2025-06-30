import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 transition-transform hover:scale-[1.03] hover:shadow-2xl duration-300 group">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={`/${doctorAgent.image}`}
          alt={doctorAgent.specialist}
          width={400}
          height={300}
          className="w-full h-[250px] object-contain transition-all duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-bold text-blue-700 tracking-tight">
          {doctorAgent.specialist}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {doctorAgent.description}
        </p>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 mt-3 transition-colors duration-300">
          🩺 Start Consultation <IconArrowRight/>
        </Button>
      </div>
    </div>
  );
}

export default DoctorAgentCard;


import React from "react";
import Image from "next/image";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

type props = {
  doctorAgent: doctorAgent;
  setSelectedDoctor: (doctor: doctorAgent) => void;
  isSelected: boolean;
};

function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor, isSelected }: props) {
  const imageSrc = doctorAgent.image?.startsWith("/")
    ? doctorAgent.image
    : `/${doctorAgent.image}`;

  return (
    <div
      className={`flex flex-col p-4 items-center justify-center rounded-2xl shadow-sm transition-all duration-200 border-2 cursor-pointer
        ${isSelected ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 hover:border-blue-400 hover:shadow-lg"}`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      <div className="w-full h-[150px] relative">
        {doctorAgent.image ? (
          <Image
            src={imageSrc}
            alt={doctorAgent.specialist}
            width={200}
            height={200}
            className="w-full h-full object-contain rounded-md"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
            No Image
          </div>
        )}
      </div>

      <h5 className="font-semibold text-sm text-center mt-2 text-gray-500">#{doctorAgent.id}</h5>
      <h2 className="font-bold text-md text-center text-blue-600">{doctorAgent.specialist}</h2>
      <p className="text-sm text-center text-gray-600 mt-1 line-clamp-2">
        {doctorAgent.description}
      </p>
    </div>
  );
}

export default SuggestedDoctorCard;

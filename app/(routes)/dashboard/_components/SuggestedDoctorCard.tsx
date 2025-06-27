
// import React from "react";
// import Image from "next/image";

// export type doctorAgent = {
//   id: number;
//   specialist: string;
//   description: string;
//   image: string;
//   agentPrompt: string;
// };



// type props = {
//   doctorAgent: doctorAgent,
//   setSelectedDoctor:any 
// };

// function SuggestedDoctorCard({ doctorAgent,setSelectedDoctor }: props) {
//   return (
//     <div className="flex flex-col p-5 items-center
//      justify-center border rounded-2xl shadow 
//      hover:border-blue-500 cursor-pointer
//       "
//       onClick={()=> setSelectedDoctor(doctorAgent)}
//       >
//       <Image
//                 src={`/${doctorAgent.image}`}
//                 alt={doctorAgent.specialist}
//                 width={200}
//                 height={200}
//                 className="w-full h-[250px] object-contain transition-all duration-300 group-hover:scale-105"
//               />
//       <h5 className="font-bold text-sm text-center">{doctorAgent.id}</h5>
//       <h2 className="font-bold text-sm text-center">{doctorAgent.specialist}</h2>
//       <p className="text-xs text-center line-clamp-2">{doctorAgent.description}</p>
//     </div>
//   );
// }

// export default SuggestedDoctorCard;

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
};

function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor }: props) {
  const imageSrc = doctorAgent.image?.startsWith("/")
    ? doctorAgent.image
    : `/${doctorAgent.image}`;

  return (
    <div
      className="flex flex-col p-5 items-center justify-center border rounded-2xl shadow hover:border-blue-500 cursor-pointer"
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

      <h5 className="font-bold text-sm text-center mt-3">#{doctorAgent.id}</h5>
      <h2 className="font-bold text-sm text-center">{doctorAgent.specialist}</h2>
      <p className="text-xs text-center text-gray-600 line-clamp-2">
        {doctorAgent.description}
      </p>
    </div>
  );
}

export default SuggestedDoctorCard;

import React from 'react'
import HistoryList from './_components/HistoryList';
import { Button } from '@/components/ui/button';
import DoctorsAgentList from './_components/DoctorsAgentList';
import AddNewSessionDialog from './_components/AddNewSessionDialog';
import Image from 'next/image';

function Dashboard() {
  return (
    <div> 
      <div className='flex justify-between'>
        <h2 className='font-bold text-2xl '>My Dashboard </h2>
        <AddNewSessionDialog/>
      </div>
      <div className="flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2   ">
                <Image
                  src={"/medical-assistance.png"}
                  alt="archana"
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-black-100 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
                />
                <h2 className="font-bold text-xl mt-2">Welcome to AI Voice Medical Assistant</h2>
                <p>Start your first consultation to receive personalized care and expert medical advice—anytime, anywhere.</p>

                <AddNewSessionDialog />
              </div>
      {/* <HistoryList/> */}

      <DoctorsAgentList/>
    </div>
  )
}

export default Dashboard;

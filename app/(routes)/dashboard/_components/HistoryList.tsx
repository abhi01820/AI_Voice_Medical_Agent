"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

function HistoryList() {
  const [historyList, setHistoryList] = useState([]);
  return (
    <div className="mt-10 ">
      {historyList.length == 0 ? (
        <div className="flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2   ">
          <Image
            src={"/medical-assistance.png"}
            alt="archana"
            width={200}
            height={200}
            className="rounded-full border-4 border-black-100 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
          />
          <h2 className="font-bold text-xl mt-2 ">No Recent Consultations </h2>
          <p>It looks like you haven't consulted with any doctor yet . </p>
          <Button className="mt-3">+ Start a Consultation </Button>
        </div>
      ) : (
        <div>List</div>
      )}
    </div>
  );
}

export default HistoryList;

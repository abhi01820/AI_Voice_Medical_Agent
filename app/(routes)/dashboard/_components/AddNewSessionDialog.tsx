


"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const router = useRouter();

  const OnClickNext = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/suggest-doctors", {
        notes: note,
      });
      setSuggestedDoctors(result.data.suggested_doctors || []);
    } catch (err) {
      console.error("Error fetching suggested doctors", err);
    }
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor: selectedDoctor,
      });
      if (result.data?.sessionId) {
        router.push("/dashboard/medical-agent/" + result.data.sessionId);
      }
    } catch (err) {
      console.error("Error starting consultation", err);
    }
    setLoading(false);
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setNote("");
          setSuggestedDoctors([]);
          setSelectedDoctor(undefined);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="mt-3">+ Start a Consultation </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {!Array.isArray(suggestedDoctors) || suggestedDoctors.length === 0 ? (
              <div>
                <h2 className="text-sm font-medium text-gray-600 mb-1">
                  Add Symptoms or Any Other Details
                </h2>
                <Textarea
                  placeholder="Add details here..."
                  className="h-[200px] mt-1"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                />
              </div>
            ) : (
              <div>
                <h2 className="text-sm font-medium text-gray-600 mb-2">
                  Select a Doctor
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                  {suggestedDoctors.map((doctor, index) => (
                    <SuggestedDoctorCard
                      key={index}
                      doctorAgent={doctor}
                      isSelected={selectedDoctor?.id === doctor.id}
                      setSelectedDoctor={() => setSelectedDoctor(doctor)}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          {!Array.isArray(suggestedDoctors) || suggestedDoctors.length === 0 ? (
            <Button disabled={!note || loading} onClick={OnClickNext}>
              {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              Next <ArrowRight className="ml-1" size={16} />
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={onStartConsultation}
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              Start Consultation <ArrowRight className="ml-1" size={16} />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;

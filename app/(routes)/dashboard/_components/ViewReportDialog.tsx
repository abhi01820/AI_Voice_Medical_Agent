"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "./HistoryList";
import moment from "moment";
import axios from "axios";

type Props = {
  record: SessionDetail;
};

type MedicalReport = {
  sessionId: string;
  agent: string;
  user: string;
  timestamp: string;
  chiefComplaint: string;
  summary: string;
  symptoms: string[];
  duration: string;
  severity: string;
  medicationsMentioned: string[];
  recommendations: string[];
};

function ViewReportDialog({ record }: Props) {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<MedicalReport | null>(
    //@ts-ignore
    record.report || null
  );
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/medical-report", {
        sessionId: record.sessionId,
        sessionDetail: record,
        //@ts-ignore
        messages: record.conversation || [],
      });

      setReport(res.data);
    } catch (err) {
      console.error("Failed to fetch report", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && !report) {
      fetchReport();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl md:px-10 px-4 py-8 bg-white shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-2xl font-bold text-blue-700">
              🧠 ABHI AI Voice Agent Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            {loading ? (
              <p className="text-center mt-10 text-gray-500">
                Loading report...
              </p>
            ) : !report ? (
              <p className="text-center text-red-500 mt-10">
                No report available
              </p>
            ) : (
              <div className="max-h-[75vh] overflow-y-auto space-y-6 text-gray-800 text-sm px-2">
                {/* Session Info */}
                <section className="border-b pb-3">
                  <h3 className="text-lg font-semibold text-blue-600 mb-1">
                    Session Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="font-bold">Doctor:</span>{" "}
                      {record.selectedDoctor.specialist}
                    </div>
                    <div>
                      <span className="font-bold">Patient:</span>{" "}
                      {report.user || "Anonymous"}
                    </div>
                    <div>
                      <span className="font-bold">Consulted On:</span>{" "}
                      {moment(new Date(record.createdOn)).format(
                        "MMMM Do YYYY, h:mm A"
                      )}
                    </div>
                    <div>
                      <span className="font-bold">Agent:</span> {report.agent}
                    </div>
                  </div>
                </section>

                {/* Chief Complaint */}
                <section>
                  <h3 className="text-blue-600 font-semibold">
                    Chief Complaint
                  </h3>
                  <p className="italic">{report.chiefComplaint}</p>
                </section>

                {/* Summary */}
                <section>
                  <h3 className="text-blue-600 font-semibold">
                    Consultation Summary
                  </h3>
                  <p>{report.summary}</p>
                </section>

                {/* Symptoms */}
                <section>
                  <h3 className="text-blue-600 font-semibold">Symptoms</h3>
                  <ul className="list-disc list-inside">
                    {report.symptoms.length > 0 ? (
                      report.symptoms.map((symptom, i) => (
                        <li key={i}>{symptom}</li>
                      ))
                    ) : (
                      <li>None</li>
                    )}
                  </ul>
                </section>

                {/* Duration & Severity */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-blue-600 font-semibold">Duration</h3>
                    <p>{report.duration}</p>
                  </div>
                  <div>
                    <h3 className="text-blue-600 font-semibold">Severity</h3>
                    <p>{report.severity}</p>
                  </div>
                </section>

                {/* Medications */}
                <section>
                  <h3 className="text-blue-600 font-semibold">
                    Medications Mentioned
                  </h3>
                  <ul className="list-disc list-inside">
                    {report.medicationsMentioned.length > 0 ? (
                      report.medicationsMentioned.map((med, i) => (
                        <li key={i}>{med}</li>
                      ))
                    ) : (
                      <li>None</li>
                    )}
                  </ul>
                </section>

                {/* Recommendations */}
                <section>
                  <h3 className="text-blue-600 font-semibold">
                    Recommendations
                  </h3>
                  <ul className="list-disc list-inside">
                    {report.recommendations.length > 0 ? (
                      report.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))
                    ) : (
                      <li>None</li>
                    )}
                  </ul>
                </section>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;

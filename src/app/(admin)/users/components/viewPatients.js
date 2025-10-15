

"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ViewPatients({ isOpen, onClose, patient }) {
  if (!isOpen || !patient) return null;
  console.log(patient)
   const guardian = patient.guardianId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="w-full max-w-2xl rounded-md shadow-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
          <CardDescription>View complete information about this patient.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Full Name:</span>
            <span>{patient.fullName || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Gender:</span>
            <span>{patient.gender || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Contact Number:</span>
            <span>{patient.mobileNumber || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span>{patient.status || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{patient.email || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Created At:</span>
            <span>
              {new Date(patient.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>

          <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Patients Details
          </CardTitle>
          <CardDescription>Patients linked with this guardian.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 text-gray-700">
          {guardian ? (
            <div className="border p-3 rounded-lg bg-gray-50">
              <div className="flex justify-between">
                <span className="font-medium">Full Name:</span>
                <span>{guardian.fullName || "—"}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Gender:</span>
                <span>{guardian.gender || "—"}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Age:</span>
                <span>{guardian.age || "—"}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Contact Number:</span>
                <span>{guardian.mobileNumber || "—"}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span>{guardian.status || "—"}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Joining Date:</span>
                <span>
                  {guardian.createdAt
                    ? new Date(guardian.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No guardian linked with this patient.
            </p>
          )}
        </CardContent>


        <CardFooter className="flex justify-end">
          <Button variant="outline" className="rounded-2xl" onClick={onClose}>
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

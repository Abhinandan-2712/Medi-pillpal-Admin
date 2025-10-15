"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ViewPatients({ isOpen, onClose, Caretakers }) {
  if (!isOpen || !Caretakers) return null;
  console.log(Caretakers);

  // Suppose Caretakers.patients = [ { fullName, gender, mobileNumber, status, createdAt }, ... ]
  const patients = Caretakers.patients || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="w-full max-w-2xl rounded-md shadow-lg max-h-[90vh] overflow-y-auto">
        {/* --- Caretakers Details --- */}
        {Caretakers.profilePhoto && (
          <div className="flex justify-center mt-4">
            <img
              src={`${Caretakers.profilePhoto}`}
              alt="Caretakers Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Caretakers Details
          </CardTitle>
          <CardDescription>
            View complete information about this guardian.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 text-gray-700 border-b pb-4">
          <div className="flex justify-between">
            <span className="font-medium">Full Name:</span>
            <span>{Caretakers.fullName || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Gender:</span>
            <span>{Caretakers.gender || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Contact Number:</span>
            <span>{Caretakers.mobileNumber || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{Caretakers.email || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span>{Caretakers.status || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joining Date:</span>
            <span>
              {Caretakers.createdAt
                ? new Date(Caretakers.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "—"}
            </span>
          </div>
        </CardContent>

        {/* --- Patients Section --- */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Patients Details
          </CardTitle>
          <CardDescription>Patients linked with this guardian.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 text-gray-700">
          {patients.length > 0 ? (
            <div className="space-y-3">
              {patients.map((patient, index) => (
                <div
                  key={patient._id || index}
                  className="border p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">Full Name:</span>
                    <span>{patient.fullName || "—"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Gender:</span>
                    <span>{patient.gender || "—"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Age:</span>
                    <span>{patient.age || "—"}</span>
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
                    <span className="font-medium">Joining Date:</span>
                    <span>
                      {patient.createdAt
                        ? new Date(patient.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No patients found under this guardian.
            </p>
          )}
        </CardContent>

        {/* --- Footer --- */}
        <CardFooter className="flex justify-end">
          <Button variant="outline" className="rounded-2xl" onClick={onClose}>
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

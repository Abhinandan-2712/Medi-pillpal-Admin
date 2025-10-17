"use client";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewNotification from "./newNotification";

export default function Notification() {
  const [showModal, setShowModal] = useState(false);
  // ✅ Dummy data
const invoices = [
  {
    srNo: 1,
    fullName: "John Smith",
    email: "john.smith@example.com",
    number: "+1 202-555-0110",
    status: "Sent",
    date: "10/10/2025",
    type: "patient",
    title: "Upcoming Appointment",
    message: "Your upcoming appointment is scheduled for Oct 20th at 10:00 AM.",
  },
  {
    srNo: 2,
    fullName: "Emily Johnson",
    email: "emily.johnson@example.com",
    number: "+1 202-555-0121",
    status: "Pending",
    date: "09/10/2025",
    type: "caretaker",
    title: "Profile Incomplete",
    message: "Please complete your caretaker profile to start accepting assignments.",
  },
  {
    srNo: 3,
    fullName: "Michael Williams",
    email: "michael.williams@example.com",
    number: "+1 202-555-0132",
    status: "Failed",
    date: "08/10/2025",
    type: "guardian",
    title: "Notification Failed",
    message: "Notification failed to send. Please check your contact info.",
  },
  {
    srNo: 4,
    fullName: "Olivia Brown",
    email: "olivia.brown@example.com",
    number: "+1 202-555-0143",
    status: "Sent",
    date: "07/10/2025",
    type: "patient",
    title: "Test Results Available",
    message: "Your test results are now available in the patient portal.",
  },
  {
    srNo: 5,
    fullName: "William Jones",
    email: "william.jones@example.com",
    number: "+1 202-555-0154",
    status: "Pending",
    date: "06/10/2025",
    type: "caretaker",
    title: "Verify Working Hours",
    message: "Reminder: Please verify your working hours for this week.",
  },
  {
    srNo: 6,
    fullName: "Sophia Garcia",
    email: "sophia.garcia@example.com",
    number: "+1 202-555-0165",
    status: "Sent",
    date: "05/10/2025",
    type: "guardian",
    title: "Guardian Verified",
    message: "Guardian verification completed successfully.",
  },
  {
    srNo: 7,
    fullName: "James Miller",
    email: "james.miller@example.com",
    number: "+1 202-555-0176",
    status: "Sent",
    date: "04/10/2025",
    type: "patient",
    title: "Medication Reminder",
    message: "Your medication reminder for today has been sent.",
  },
  {
    srNo: 8,
    fullName: "Isabella Davis",
    email: "isabella.davis@example.com",
    number: "+1 202-555-0187",
    status: "Failed",
    date: "03/10/2025",
    type: "caretaker",
    title: "Notification Error",
    message: "Failed to send notification due to network error.",
  },
  {
    srNo: 9,
    fullName: "Benjamin Martinez",
    email: "benjamin.martinez@example.com",
    number: "+1 202-555-0198",
    status: "Sent",
    date: "02/10/2025",
    type: "guardian",
    title: "New Caretaker Message",
    message: "New message from your assigned caretaker is available.",
  },
  {
    srNo: 10,
    fullName: "Mia Rodriguez",
    email: "mia.rodriguez@example.com",
    number: "+1 202-555-0209",
    status: "Pending",
    date: "01/10/2025",
    type: "patient",
    title: "Appointment Confirmation",
    message: "Please confirm your upcoming appointment on Oct 15th.",
  },
  {
    srNo: 11,
    fullName: "Alexander Wilson",
    email: "alexander.wilson@example.com",
    number: "+1 202-555-0210",
    status: "Sent",
    date: "30/09/2025",
    type: "caretaker",
    title: "Weekly Schedule Updated",
    message: "Your weekly schedule has been updated successfully.",
  },
  {
    srNo: 12,
    fullName: "Charlotte Anderson",
    email: "charlotte.anderson@example.com",
    number: "+1 202-555-0221",
    status: "Sent",
    date: "29/09/2025",
    type: "guardian",
    title: "Guardian Linked Successfully",
    message: "Guardian account has been successfully linked with patient.",
  },
];


  // 🔍 Search
  const [searchTerm, setSearchTerm] = useState("");

  // 🔢 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ✅ Filter + paginate
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) =>
      `${inv.id} ${inv.status} ${inv.method}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredInvoices.length / rowsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handler helpers
  const goToPage = (p) => setCurrentPage(p);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className=" ">
      {/* Header with Title + dropdown + search */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Notifications </h1>

        <div className="flex items-center gap-3">
          {/* Example filter dropdown */}
          {/* <select className="border rounded px-2 py-2 text-sm">
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select> */}
          <Input
            placeholder="Search by fullname, email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-sm"
          />
          <Button
            className=" rounded px-2 py-2 text-sm"
            onClick={() => setShowModal(true)}
          >
            Add Notification
          </Button>
        </div>
      </div>
      <div className=" w-full overflow-x-auto mt-2">
        <Table className="min-w-[900px] table-auto ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Sr No.</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Receipt type</TableHead>

              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date
                   <br />
                (DD/MM/YYYY)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.length > 0 ? (
              paginatedInvoices.map((item) => (
                <TableRow key={item.srNo}>
                  <TableCell className="font-medium">{item.srNo}</TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.number}</TableCell>
                  <TableCell className=" capitalize">{item.type}</TableCell>
                  <TableCell>{item.title}</TableCell>

                  <TableCell
                    className="w-64 overflow-hidden text-ellipsis break-words "
                    title={item.message}
                  >
                    {item.message}
                  </TableCell>

                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        {/* Rows per page */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Rows per page:</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Page numbers */}
        <div className="flex items-center gap-1 text-sm ">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            // show first, last, and neighbors
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              );
            }
            if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page}>…</span>;
            }
            return null;
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </Button>
        </div>
      </div>
      <NewNotification isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

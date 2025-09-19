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
import AddFaq from "./addFaq";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import DeleteFaq from "./deleteFaq"; 
import EditFaq from "./EditFaq"; 

export default function FAQ() {
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [selectedFaq, setSelectedFaq] = useState(null);

  // ✅ Dummy FAQ data
  const faqs = [
    {
      id: 1,
      question: "How can I reset my password?",
      answer: "Click on 'Forgot password' on the login page.",
      status: "Active",
      date: "2025-09-15",
    },
    {
      id: 2,
      question: "How to contact support?",
      answer: "Email us at support@example.com.",
      status: "Active",
      date: "2025-09-14",
    },
    {
      id: 3,
      question: "Can I update my email address?",
      answer: "Yes, go to profile settings and update your email.",
      status: "Inactive",
      date: "2025-09-13",
    },
    {
      id: 4,
      question: "Is my data secure?",
      answer: "We use industry-standard encryption to protect data.",
      status: "Active",
      date: "2025-09-12",
    },
    {
      id: 5,
      question: "Do you offer refunds?",
      answer: "Refunds are processed within 7 business days.",
      status: "Active",
      date: "2025-09-11",
    },
    {
      id: 6,
      question: "Where can I view my invoices?",
      answer: "Invoices are available in your dashboard under 'Billing'.",
      status: "Inactive",
      date: "2025-09-10",
    },
  ];

  // 🔍 Search
  const [searchTerm, setSearchTerm] = useState("");

  // 🔢 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ Filter + paginate
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) =>
      `${faq.question} ${faq.answer} ${faq.status}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredFaqs.length / rowsPerPage);
  const paginatedFaqs = filteredFaqs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (p) => setCurrentPage(p);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">FAQ Management</h1>

        <div className="flex items-center gap-3">
          <select className="border rounded px-2 py-2 text-sm">
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <Input
            placeholder="Search question or answer..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-sm"
          />
          <Button
            className="rounded px-2 py-2 text-sm"
            onClick={() => setShowModal(true)}
          >
            Add FAQ
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[700px] table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Sr No</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFaqs.length > 0 ? (
              paginatedFaqs.map((faq, idx) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * rowsPerPage + idx + 1}
                  </TableCell>
                  <TableCell className="whitespace-pre-wrap">
                    {faq.question}
                  </TableCell>
                  <TableCell className="whitespace-pre-wrap">
                    {faq.answer}
                  </TableCell>
                  <TableCell>{faq.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setSelectedFaq(faq);
                          setEditModalOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <FiEdit />
                      </button>
                      {/* <button
                        onClick={() => console.log("View", faq.id)}
                        className="cursor-pointer"
                      >
                        <FaRegEye />
                      </button> */}
                      <button
                        onClick={() => {
                          setSelectedFaq(faq);
                          setDeleteModalOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{faq.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No FAQs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
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
            {[5, 10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
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

      {/* Add FAQ Modal */}
      <AddFaq isOpen={showModal} onClose={() => setShowModal(false)} />
        <DeleteFaq
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => {
          console.log("Deleting FAQ id:", selectedFaq?.id);
          // 👉 Yahan actual delete API call karein
        }}
      />
        <EditFaq
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
       faq={selectedFaq} 
      />
    </div>
  );
}

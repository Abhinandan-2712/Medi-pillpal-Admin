"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddFaq from "./addFaq";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import DeleteFaq from "./deleteFaq";
import EditFaq from "./EditFaq";
import api from "@/lib/axiosClient";
import toast from "react-hot-toast";

export default function FAQ() {
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (searchTerm === "") {
      // Agar search clear ho gaya to debounce skip karo
      setDebouncedSearch("");
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // 👉 yaha le aaya
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchFaqs = async () => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    // toast.dismiss();
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/api/faq/all`, {
        params: {
          limit: rowsPerPage,
          page: currentPage,
          search: debouncedSearch,
          status,
        },
        headers: { token },
        signal,
      });
      // console.log(res)
      setFaqs(res.data.result.FAQ || []);
      setTotalPages(res.data.result.totalPage || 1);
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Failed to fetch FAQs:", err);
        setFaqs([]);
        setTotalPages(1);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort(); // cleanup
  };

  // Fetch whenever page, rowsPerPage, debouncedSearch, or status changes
  useEffect(() => {
    fetchFaqs();
  }, [rowsPerPage, currentPage, debouncedSearch, status]);

  const goToPage = (p) => setCurrentPage(p);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 w-full">
        <h1 className="text-2xl font-bold text-gray-800">FAQ Management</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search question or answer..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setCurrentPage(1);
            }}
            className="w-full sm:w-64"
          />
          <Button
            className="w-full sm:w-auto rounded px-4 py-2 text-sm"
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
              <TableHead>
                Date <br />
                (DD/MM/YYYY)
              </TableHead>
              <TableHead>Action</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : faqs.length > 0 ? (
              faqs.map((faq, idx) => (
                <TableRow key={faq._id}>
                  <TableCell>
                    {(currentPage - 1) * rowsPerPage + idx + 1}
                  </TableCell>
                  <TableCell>{faq.question}</TableCell>
                  <TableCell
                    // style={{
                    //   display: "-webkit-box",
                    //   WebkitLineClamp: 5,
                    //   WebkitBoxOrient: "vertical",
                    //   overflow: "hidden",
                    //   maxWidth: "300px",
                    // }}
                    title={faq.answer}
                  >
                    {faq.answer}
                  </TableCell>
                  <TableCell>{faq.status}</TableCell>
                   <TableCell >
                    {new Date(faq.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <button
                      className="text-green-500"
                        onClick={() => {
                          setSelectedFaq(faq);
                          setEditModalOpen(true);
                        }}
                      >
                        <FiEdit />
                      </button>
                      <button
                      className=" text-red-500"
                        onClick={() => {
                          setSelectedFaq(faq);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </div>
                  </TableCell>
                 
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

      {/* Pagination */}
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
            {[10, 25, 50].map((n) => (
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

      {/* Modals */}
      {/* <AddFaq isOpen={showModal} onClose={() => setShowModal(false)} /> */}
      <AddFaq
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdded={() => {
          fetchFaqs(); // re-fetch FAQs from API
          setCurrentPage(1); // optional: reset to first page
        }}
      />

      <DeleteFaq
        isOpen={deleteModalOpen}
        faqId={selectedFaq?._id}
        onClose={() => setDeleteModalOpen(false)}
        onDeleted={() => fetchFaqs()}
      />

      <EditFaq
        isOpen={editModalOpen}
        faq={selectedFaq}
        onClose={() => setEditModalOpen(false)}
        onUpdated={() => fetchFaqs()}
      />
    </div>
  );
}

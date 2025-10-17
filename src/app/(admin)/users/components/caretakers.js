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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import api from "@/lib/axiosClient";
import toast from "react-hot-toast";
import ViewCaretakers from "./viewCaretakers";
import { MdBlockFlipped } from "react-icons/md";

export default function User() {
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCaretakers, setSelectedCaretakers] = useState(null);

  const [caretakers, setCaretakers] = useState([]);
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

  const fetchCaretakers = async () => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    toast.dismiss();

    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/api/caretaker/get-all`, {
        params: {
          limit: rowsPerPage,
          page: currentPage,
          search: debouncedSearch,
          status,
        },
        headers: { token },
        signal,
      });
      console.log(res);
      setCaretakers(res.data.result.caretakers || []);
      setTotalPages(res.data.result.totalPage || 1);
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Failed to fetch caretakers:", err);
        setCaretakers([]);
        setTotalPages(1);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort(); // cleanup
  };

  // Fetch whenever page, rowsPerPage, debouncedSearch, or status changes
  useEffect(() => {
    fetchCaretakers();
  }, [rowsPerPage, currentPage, debouncedSearch, status]);

  const goToPage = (p) => setCurrentPage(p);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="my-10 min-h-[80vh] space-y-6">
      {/* Header with Title + dropdown + search */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Caregivers</h1>

        <div className="flex items-center gap-3">
          {/* Example filter dropdown */}
          {/* <select className="border rounded px-2 py-1 text-sm">
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select> */}

          <Input
            placeholder="Search by fullname, gender..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setCurrentPage(1);
            }}
            className="max-w-sm"
          />
        </div>
      </div>

      <div className=" w-full overflow-x-auto ">
        <Table className="min-w-[900px] table-auto ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Sr No.</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Patients</TableHead>

              <TableHead>Contact Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date
                   <br />
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
            ) : caretakers.length > 0 ? (
              caretakers.map((caretakers, idx) => (
                <TableRow key={caretakers._id}>
                  <TableCell>
                    {(currentPage - 1) * rowsPerPage + idx + 1}
                  </TableCell>
                  <TableCell>{caretakers.fullName}</TableCell>
                  <TableCell>{caretakers.gender}</TableCell>
                  <TableCell>{caretakers.age|| 26}</TableCell>
                  <TableCell>{caretakers.totalPatients ||0 }</TableCell>
                  <TableCell>+{caretakers.mobileNumber}</TableCell>
                  <TableCell>{caretakers.status}</TableCell>
                  <TableCell>
                    {new Date(caretakers.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <button
                       className=" text-green-500"
                        onClick={() => {
                          setSelectedCaretakers(caretakers);
                          setShowModal(true);
                        }}
                      >
                        <FiEye />
                      </button>
                      {/* <button
                        onClick={() => {
                          setSelectedCaretakers(caretakers);
                          setEditModalOpen(true);
                        }}
                      >
                        <FiEdit />
                      </button> */}
                      <button
                      className=" text-red-500"
                        onClick={() => {
                          setSelectedCaretakers(caretakers);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <MdBlockFlipped />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No caretakers found
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
      <ViewCaretakers
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        Caretakers={selectedCaretakers}
      />
    </div>
  );
}

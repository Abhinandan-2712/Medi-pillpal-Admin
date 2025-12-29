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
import ViewPatients from "./viewGuardians";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import BlockUserModal from "./BlockGuardian";
import DeleteCaretakerModal from "./Delete";
import EditModal from "./EditModal";

export default function User() {
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedGuardians, setSelectedGuardians] = useState(null);

  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("Guardian");

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

  const fetchGuardians = async () => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    // toast.dismiss();

    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/api/guardian/getAllGuardiansByAdmin`, {
        params: {
          limit: rowsPerPage,
          page: currentPage,
          search: debouncedSearch,
          statusFilter,
        },
        headers: { token },
        signal,
      });
      // console.log(res);
      setGuardians(res.data.result.guardians || []);
      setTotalPages(res.data.result.totalPage || 1);
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Failed to fetch Guardians:", err);
        setGuardians([]);
        setTotalPages(1);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort(); // cleanup
  };

  // Fetch whenever page, rowsPerPage, debouncedSearch, or status changes
  useEffect(() => {
    fetchGuardians();
  }, [rowsPerPage, currentPage, debouncedSearch, statusFilter]);

  const goToPage = (p) => setCurrentPage(p);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="my-10 min-h-[80vh] space-y-6">
      {/* Header with Title + dropdown + search */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Guardians</h1>

        <div className="flex items-center gap-3">
          {/* Example filter dropdown */}
          <select
            className="border rounded px-2 py-[6px] text-sm"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>

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
              <TableHead className="w-[120px]">Sr. No.</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Gender</TableHead>
              {/* <TableHead>Age</TableHead> */}
              <TableHead>Patients</TableHead>
              <TableHead>Caregivers</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                Joined Date
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
            ) : guardians.length > 0 ? (
              guardians.map((guardians, idx) => (
                <TableRow key={guardians._id}>
                  <TableCell>
                    {(currentPage - 1) * rowsPerPage + idx + 1}
                  </TableCell>
                  <TableCell className="overflow-hidden ">
                    <p className="line-clamp-4 !break-words w-64  !whitespace-normal">
                      {guardians.fullName}
                    </p>
                  </TableCell>
                  <TableCell>{guardians.gender}</TableCell>
                  {/* <TableCell>{guardians.age}</TableCell> */}
                  <TableCell>{guardians.totalPatients || 0}</TableCell>
                  <TableCell>{guardians.totalCaretakers || 0}</TableCell>
                  <TableCell>{guardians.mobileNumber}</TableCell>
                  <TableCell
                    className={`${
                      guardians.status === "Active"
                        ? "text-green-600"
                        : "text-red-500 "
                    }`}
                  >
                    {guardians.status}
                  </TableCell>
                  <TableCell>
                    {new Date(guardians.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <button
                        className="text-blue-600"
                        onClick={() => {
                          setSelectedGuardians(guardians);
                          setEditModalOpen(true);
                        }}
                      >
                        <FiEdit />
                      </button>

                      <button
                        className=" text-green-500"
                        onClick={() => {
                          setSelectedGuardians(guardians);
                          setShowModal(true);
                        }}
                      >
                        <FiEye />
                      </button>

                      <button
                        className={`${
                          guardians.status === "Active"
                            ? "text-red-500"
                            : "text-red-600 text-base"
                        }`}
                        onClick={() => {
                          setSelectedGuardians(guardians);
                          setSelectedUserType("Guardian");
                          setIsModalOpen(true);
                        }}
                      >
                        {guardians.status === "Active" ? (
                          <MdBlock /> // Block icon (red)
                        ) : (
                          <CgUnblock /> // Unblock icon (green) → replace with your preferred icon
                        )}
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => {
                          setSelectedGuardians(guardians);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <MdOutlineDeleteOutline size={20} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No guardians found
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
      <ViewPatients
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        Guardian={selectedGuardians}
      />
      <BlockUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        Guardian={selectedGuardians}
        userType={selectedUserType}
        onUpdated={fetchGuardians}
      />
      <DeleteCaretakerModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        caretakers={selectedGuardians}
        userType="Guardian"
        onUpdated={fetchGuardians}
      />
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        caretakers={selectedGuardians}
        userType="Guardian"
        onUpdated={fetchGuardians}
      />
    </div>
  );
}

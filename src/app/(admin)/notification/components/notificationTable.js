"use client";
import { useState, useMemo, useEffect } from "react";
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
import api from "@/lib/axiosClient";

export default function Notification() {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // 🔢 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ✅ Filter + paginate
  useEffect(() => {
    if (searchTerm === "") {
      setDebouncedSearch("");
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchNotifications = async () => {
    setLoading(true);
    const controller = new AbortController();

    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/api/notification/admin/get", {
        params: {
          page: currentPage,
          limit: rowsPerPage,
          search: debouncedSearch,
          status: statusFilter,
        },
        headers: { token },
        signal: controller.signal,
      });
      // console.log(res);

      setNotifications(res.data.notifications || []);
      const totalCount = res.data.total || 0;
      setTotalPages(Math.max(1, Math.ceil(totalCount / rowsPerPage)));
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Failed to fetch notifications", err);
        setNotifications([]);
        setTotalPages(1);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };
  useEffect(() => {
    fetchNotifications();
  }, [rowsPerPage, currentPage, debouncedSearch, statusFilter]);

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
              <TableHead className="w-[120px]">Sr. No.</TableHead>
              {/* <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact Number</TableHead> */}
              <TableHead>Recipient type</TableHead>

              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                Date
                <br />
                (DD/MM/YYYY)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.length > 0 ? (
              notifications.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </TableCell>

                  {/* <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.number}</TableCell> */}
                  <TableCell className="capitalize">{item.userType}</TableCell>
                  {/* <TableCell >{item.title}</TableCell> */}
                  <TableCell className="overflow-hidden ">
                    <p className="line-clamp-4 !break-words w-64  !whitespace-normal">
                      {item.title}
                    </p>
                  </TableCell>
                  {/* <TableCell
                    className="w-64 overflow-hidden text-ellipsis break-words"
                    title={item.message}
                  >
                    {item.message}
                  </TableCell> */}
                  <TableCell className="overflow-hidden ">
                    <p className="line-clamp-4 !break-words w-64  !whitespace-normal">
                      {item.message}
                    </p>
                  </TableCell>
                  {/* <TableCell>{item.status}</TableCell> */}
                   <TableCell     className={`${
                      item.status === "Sent"
                        ? "text-green-600"
                        : "text-red-500 "
                    }`}>{item.status}
                    </TableCell>
                  
                  {/* <TableCell className=" capitalize">sent</TableCell> */}
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
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
      <NewNotification
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchNotifications}
      />
    </div>
  );
}

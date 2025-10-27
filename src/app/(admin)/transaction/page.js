"use client";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";

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

export default function User() {
  // ✅ Dummy data
  const invoices = [
    {
      srNo: 1,
      fullName: "John Smith",
      email: "john.smith@example.com",
      number: "+1 202-555-0110",
      patientName: "Michael Smith",
      status: "Paid",
      date: "10/10/2025",
      plan: "Basic",
    },
    {
      srNo: 2,
      fullName: "Emily Johnson",
      email: "emily.johnson@example.com",
      number: "+1 202-555-0121",
      patientName: "Olivia Johnson",
      status: "Pending",
      date: "10/10/2025",
      plan: "Premium",
    },
    {
      srNo: 3,
      fullName: "Michael Williams",
      email: "michael.williams@example.com",
      number: "+1 202-555-0132",
      patientName: "Sophia Williams",
      status: "Failed",
      date: "10/10/2025",
      plan: "Basic",
    },
    {
      srNo: 4,
      fullName: "Olivia Brown",
      email: "olivia.brown@example.com",
      number: "+1 202-555-0143",
      patientName: "Liam Brown",
      status: "Paid",
      date: "10/10/2025",
      plan: "Family",
    },
    {
      srNo: 5,
      fullName: "William Jones",
      email: "william.jones@example.com",
      number: "+1 202-555-0154",
      patientName: "Emma Jones",
      status: "Pending",
      date: "10/10/2025",
      plan: "Basic",
    },
    {
      srNo: 6,
      fullName: "Sophia Garcia",
      email: "sophia.garcia@example.com",
      number: "+1 202-555-0165",
      patientName: "Noah Garcia",
      status: "Paid",
      date: "10/10/2025",
      plan: "Premium",
    },
    {
      srNo: 7,
      fullName: "James Miller",
      email: "james.miller@example.com",
      number: "+1 202-555-0176",
      patientName: "Ava Miller",
      status: "Pending",
      date: "10/10/2025",
      plan: "Basic",
    },
    {
      srNo: 8,
      fullName: "Isabella Davis",
      email: "isabella.davis@example.com",
      number: "+1 202-555-0187",
      patientName: "Elijah Davis",
      status: "Paid",
      date: "10/10/2025",
      plan: "Premium",
    },
    {
      srNo: 9,
      fullName: "Benjamin Martinez",
      email: "benjamin.martinez@example.com",
      number: "+1 202-555-0198",
      patientName: "Mia Martinez",
      status: "Pending",
      date: "10/10/2025",
      plan: "Basic",
    },
    {
      srNo: 10,
      fullName: "Mia Rodriguez",
      email: "mia.rodriguez@example.com",
      number: "+1 202-555-0209",
      patientName: "Lucas Rodriguez",
      status: "Paid",
      date: "10/10/2025",
      plan: "Family",
    },
    {
      srNo: 11,
      fullName: "Alexander Wilson",
      email: "alexander.wilson@example.com",
      number: "+1 202-555-0211",
      patientName: "Charlotte Wilson",
      status: "Paid",
      date: "09/10/2025",
      plan: "Basic",
    },
    {
      srNo: 12,
      fullName: "Ella Thompson",
      email: "ella.thompson@example.com",
      number: "+1 202-555-0222",
      patientName: "Henry Thompson",
      status: "Pending",
      date: "08/10/2025",
      plan: "Premium",
    },
    {
      srNo: 13,
      fullName: "Daniel Anderson",
      email: "daniel.anderson@example.com",
      number: "+1 202-555-0233",
      patientName: "Grace Anderson",
      status: "Failed",
      date: "07/10/2025",
      plan: "Basic",
    },
    {
      srNo: 14,
      fullName: "Madison Thomas",
      email: "madison.thomas@example.com",
      number: "+1 202-555-0244",
      patientName: "Ethan Thomas",
      status: "Paid",
      date: "06/10/2025",
      plan: "Premium",
    },
    {
      srNo: 15,
      fullName: "Christopher Taylor",
      email: "christopher.taylor@example.com",
      number: "+1 202-555-0255",
      patientName: "Avery Taylor",
      status: "Pending",
      date: "05/10/2025",
      plan: "Basic",
    },
    {
      srNo: 16,
      fullName: "Abigail Moore",
      email: "abigail.moore@example.com",
      number: "+1 202-555-0266",
      patientName: "Samuel Moore",
      status: "Paid",
      date: "04/10/2025",
      plan: "Premium",
    },
    {
      srNo: 17,
      fullName: "Matthew Jackson",
      email: "matthew.jackson@example.com",
      number: "+1 202-555-0277",
      patientName: "Sofia Jackson",
      status: "Pending",
      date: "03/10/2025",
      plan: "Basic",
    },
    {
      srNo: 18,
      fullName: "Hannah White",
      email: "hannah.white@example.com",
      number: "+1 202-555-0288",
      patientName: "Lucas White",
      status: "Paid",
      date: "02/10/2025",
      plan: "Premium",
    },
    {
      srNo: 19,
      fullName: "Joshua Harris",
      email: "joshua.harris@example.com",
      number: "+1 202-555-0299",
      patientName: "Lily Harris",
      status: "Failed",
      date: "01/10/2025",
      plan: "Basic",
    },
  ];

  // 🔄 Export to Excel
  const exportToExcel = async () => {
    try {
      // Show loading state (you can add a toast/notification here)
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Transactions");

      // Style the header row
      const headerRow = worksheet.addRow([
        "Sr. No.",
        "Guardian Name",
        "Guardian Email",
        "Contact Number",
        "Patient Name",
        "Plan",
        "Status",
        "Payment Date",
      ]);

      // Apply header styling
      headerRow.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
      headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4472C4" },
      };
      headerRow.alignment = { vertical: "middle", horizontal: "center" };
      headerRow.height = 20;

      // Add data rows
      invoices.forEach((inv, index) => {
        const row = worksheet.addRow([
          inv.srNo,
          inv.fullName,
          inv.email,
          inv.number,
          inv.patientName,
          inv.plan,
          inv.status,
          inv.date,
        ]);

        // Alternate row colors
        if (index % 2 === 0) {
          row.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF2F2F2" },
          };
        }

        // Status color coding
        const statusCell = row.getCell(7);
        if (
          inv.status.toLowerCase() === "paid" ||
          inv.status.toLowerCase() === "completed"
        ) {
          statusCell.font = { color: { argb: "FF00B050" }, bold: true };
        } else if (inv.status.toLowerCase() === "pending") {
          statusCell.font = { color: { argb: "FFFFC000" }, bold: true };
        } else if (
          inv.status.toLowerCase() === "failed" ||
          inv.status.toLowerCase() === "cancelled"
        ) {
          statusCell.font = { color: { argb: "FFFF0000" }, bold: true };
        }
      });

      // Auto-fit columns
      worksheet.columns.forEach((column) => {
        let maxLength = 10;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 15 ? 15 : maxLength + 2;
      });

      // Add borders to all cells
      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin", color: { argb: "FFD0D0D0" } },
            left: { style: "thin", color: { argb: "FFD0D0D0" } },
            bottom: { style: "thin", color: { argb: "FFD0D0D0" } },
            right: { style: "thin", color: { argb: "FFD0D0D0" } },
          };
        });
      });

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `transactions_${timestamp}.xlsx`;

      // Generate & download file
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), filename);

      // Success notification (add your notification system here)
      console.log("Excel exported successfully!");
      return true;
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      // Error notification (add your notification system here)
      return false;
    }
  };

  // 🔄 Export to PDF
  const exportToPDF = () => {
    try {
      const doc = new jsPDF({ orientation: "landscape" }); // Landscape for more columns

      // Title with styling
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text("Medipill Pal Transaction Report", 14, 15);

      // Add metadata
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
      doc.text(`Total Records: ${invoices.length}`, 14, 27);

      const tableData = invoices.map((inv) => [
        inv.srNo,
        inv.fullName,
        inv.email,
        inv.number,
        inv.patientName,
        inv.plan,
        inv.status,
        inv.date,
      ]);

      autoTable(doc, {
        head: [
          [
            "Sr. No.",
            "Guardian Name",
            "Guardian Email",
            "Contact Number",
            "Patient Name",
            "Plan",
            "Status",
            "Payment Date",
          ],
        ],
        body: tableData,
        startY: 32,
        theme: "grid",
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [68, 114, 196],
          textColor: 255,
          fontStyle: "bold",
          halign: "center",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: 20, halign: "center" },
          1: { cellWidth: 35, halign: "center" },
          2: { cellWidth: 55, halign: "center" },
          3: { cellWidth: 40, halign: "center" },
          4: { cellWidth: 35, halign: "center" },
          5: { cellWidth: 30, halign: "center" },
          6: { cellWidth: 25, halign: "center" },
          7: { cellWidth: 25, halign: "center" },
        },
        didParseCell: function (data) {
          // Color code status column
          if (data.column.index === 6 && data.section === "body") {
            const status = data.cell.raw.toString().toLowerCase();
            if (status === "paid" || status === "completed") {
              data.cell.styles.textColor = [0, 176, 80];
              data.cell.styles.fontStyle = "bold";
            } else if (status === "pending") {
              data.cell.styles.textColor = [255, 192, 0];
              data.cell.styles.fontStyle = "bold";
            } else if (status === "failed" || status === "cancelled") {
              data.cell.styles.textColor = [255, 0, 0];
              data.cell.styles.fontStyle = "bold";
            }
          }
        },
        margin: { top: 32 },
      });

      // Footer with page numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `transactions_${timestamp}.pdf`;

      doc.save(filename);

      // Success notification
      console.log("PDF exported successfully!");
      return true;
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      // Error notification
      return false;
    }
  };

  // 🔍 Search
  const [searchTerm, setSearchTerm] = useState("");

  // 🔢 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ✅ Filter + paginate
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) =>
      `${inv.fullName} ${inv.email} ${inv.number} ${inv.patientName} ${inv.status}`
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
    <div className="min-h-[80vh] p-4  mx-auto my-10 bg-white rounded-md shadow ">
      {/* Header with Title + dropdown + search */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>

        <div className="flex md:flex-row flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Button onClick={exportToExcel}>Export Excel</Button>
            <Button onClick={exportToPDF}>Export PDF</Button>
          </div>
          <div className="flex items-center gap-3">
            {/* <select className="border rounded px-2 py-1 text-sm">
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select> */}

            <Input
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="max-w-sm"
            />
          </div>

          {/* Example filter dropdown */}
        </div>
      </div>

      <div className=" w-full overflow-x-auto mt-2 ">
        <Table className="min-w-[900px] table-auto ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Sr. No.</TableHead>
              <TableHead>Guardian Name</TableHead>
              <TableHead>Guardian Email</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Patients Name</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Payment Date
                <br />
                (DD/MM/YYYY)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.length > 0 ? (
              paginatedInvoices.map((inv) => (
                <TableRow key={inv.srNo}>
                  <TableCell className="font-medium">{inv.srNo}</TableCell>
                  <TableCell>{inv.fullName}</TableCell>
                  <TableCell>{inv.email}</TableCell>
                  <TableCell>{inv.number}</TableCell>
                  <TableCell>{inv.patientName}</TableCell>
                  <TableCell>{inv.plan}</TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        inv.status === "Paid"
                          ? "text-green-500"
                          : inv.status === "Pending"
                          ? "text-yellow-500"
                          : inv.status === "Failed"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{inv.date}</TableCell>
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
    </div>
  );
}

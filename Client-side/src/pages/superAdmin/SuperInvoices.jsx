import React, { useState, useRef } from "react";
import {
  MagnifyingGlassIcon,
  PrinterIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import logoImage from "../../components/imgs/Acculizein_Final_Logo.png"; // Adjust the path as necessary

const LOGO_URL = logoImage;

const loadImageAsBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (err) => reject(err);
  });
};

// Company details
const COMPANY_DETAILS = {
  name: "Acculizain Tech Pvt Ltd",
  address: `Office No. 7-8, 4th Floor, Raj Deep Bhawan, near Gurudwara Guru Ka Taal, 
  Transport Colony, Transport Nagar, Agra, Uttar Pradesh 282007`,
  email: "info@acculizeintech.com",
  phone: "+91 8650006677",
  gstin: "09AAXCB1234E1Z7", // Sample GSTIN
  bank: {
    name: "State Bank of India",
    account: "123456789012",
    ifsc: "SBIN0001234",
    branch: "Transport Nagar, Agra",
  },
};

// Updated invoices array with GST fields
const invoices = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    client: {
      name: "The Coffee House",
      address: "123 MG Road, Agra, UP 282001",
      gstin: "09AABCT1234F1Z6",
    },
    email: "billing@coffeehouse.com",
    services: [
      {
        description: "Premium Listing",
        quantity: 1,
        rate: 250.0,
        cgst: 9.0,
        sgst: 9.0,
      },
      {
        description: "Featured Placement",
        quantity: 1,
        rate: 49.0,
        cgst: 9.0,
        sgst: 9.0,
      },
    ],
    status: "Paid",
    issueDate: "2024-01-01",
    dueDate: "2024-01-15",
    paidDate: "2024-01-10",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    client: {
      name: "Tech Solutions Inc",
      address: "456 Tech Park, Noida, UP 201301",
      gstin: "09AAACT5678G1Z5",
    },
    email: "accounts@techsolutions.com",
    services: [
      {
        description: "Enterprise Plan",
        quantity: 1,
        rate: 500.0,
        cgst: 9.0,
        sgst: 9.0,
      },
      {
        description: "Custom Integration",
        quantity: 1,
        rate: 99.0,
        cgst: 9.0,
        sgst: 9.0,
      },
    ],
    status: "Pending",
    issueDate: "2024-01-15",
    dueDate: "2024-02-01",
    paidDate: null,
    paymentMethod: null,
  },
  // Add other invoices similarly...
];

const clientToOwnerMap = {
  "The Coffee House": "John Smith",
  "Tech Solutions Inc": "Sarah Johnson",
  "Fashion Boutique": "Mike Brown",
  "Fitness Center Pro": "Emily Davis",
  "Digital Marketing Agency": "David Wilson",
};

const SuperInvoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const previewRef = useRef(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || invoice.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce(
      (sum, inv) => sum + inv.services.reduce((s, svc) => s + svc.rate, 0),
      0
    );
  const pendingAmount = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce(
      (sum, inv) => sum + inv.services.reduce((s, svc) => s + svc.rate, 0),
      0
    );
  const overdueAmount = invoices
    .filter((inv) => inv.status === "Overdue")
    .reduce(
      (sum, inv) => sum + inv.services.reduce((s, svc) => s + svc.rate, 0),
      0
    );
  const totalInvoices = invoices.length;

  const handlePreviewClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedInvoice(null);
  };

  const handleOutsideClick = (e) => {
    if (previewRef.current && !previewRef.current.contains(e.target)) {
      handleClosePreview();
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const taxableAmount = selectedInvoice.services.reduce(
      (sum, svc) => sum + svc.quantity * svc.rate,
      0
    );
    const cgstAmount = selectedInvoice.services.reduce(
      (sum, svc) => sum + (svc.quantity * svc.rate * svc.cgst) / 100,
      0
    );
    const sgstAmount = selectedInvoice.services.reduce(
      (sum, svc) => sum + (svc.quantity * svc.rate * svc.sgst) / 100,
      0
    );
    const totalAmount = taxableAmount + cgstAmount + sgstAmount;

    printWindow.document.write(`
      <html>
        <head>
          <title>TAX INVOICE ${selectedInvoice?.invoiceNumber || ""}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .details { margin-bottom: 20px; display: flex; justify-content: space-between; }
            .details div { width: 48%; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total { text-align: right; font-weight: bold; }
            .logo { max-width: 150px; height: auto; margin: 0 auto; display: block; }
            .footer { text-align: center; margin-top: 20px; }
            .bank-details { margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <img src="${LOGO_URL}" class="logo" alt="Bizvility Logo" />
              <p>${COMPANY_DETAILS.name}</p>
              <p>${COMPANY_DETAILS.address}</p>
              <p>GSTIN: ${COMPANY_DETAILS.gstin}</p>
              <p>Email: ${COMPANY_DETAILS.email} | Phone: ${
      COMPANY_DETAILS.phone
    }</p>
              <p>Invoice Date: ${selectedInvoice?.issueDate || ""}</p>
            </div>
            <div class="details">
              <div>
                <p><strong>Invoice Number:</strong> ${
                  selectedInvoice?.invoiceNumber || ""
                }</p>
                <p><strong>Due Date:</strong> ${
                  selectedInvoice?.dueDate || ""
                }</p>
                <p><strong>Status:</strong> ${selectedInvoice?.status || ""}</p>
                ${
                  selectedInvoice?.paidDate
                    ? `<p><strong>Paid Date:</strong> ${selectedInvoice.paidDate}</p>`
                    : ""
                }
                ${
                  selectedInvoice?.paymentMethod
                    ? `<p><strong>Payment Method:</strong> ${selectedInvoice.paymentMethod}</p>`
                    : ""
                }
              </div>
              <div>
                <p><strong>Bill To:</strong> ${
                  selectedInvoice?.client.name || ""
                }</p>
                <p>${selectedInvoice?.client.address || ""}</p>
                <p>GSTIN: ${selectedInvoice?.client.gstin || "N/A"}</p>
                <p>Email: ${selectedInvoice?.email || ""}</p>
                <p><strong>Business Owner:</strong> ${
                  clientToOwnerMap[selectedInvoice?.client.name] || "N/A"
                }</p>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Taxable Value</th>
                  <th>CGST (${selectedInvoice?.services[0]?.cgst || 0}%)</th>
                  <th>SGST (${selectedInvoice?.services[0]?.sgst || 0}%)</th>
                </tr>
              </thead>
              <tbody>
                ${
                  selectedInvoice?.services
                    ?.map(
                      (svc, idx) => `
                  <tr>
                    <td>${svc.description}</td>
                    <td>${svc.quantity}</td>
                    <td>$${svc.rate.toFixed(2)}</td>
                    <td>$${(svc.quantity * svc.rate).toFixed(2)}</td>
                    <td>$${((svc.quantity * svc.rate * svc.cgst) / 100).toFixed(
                      2
                    )}</td>
                    <td>$${((svc.quantity * svc.rate * svc.sgst) / 100).toFixed(
                      2
                    )}</td>
                  </tr>
                `
                    )
                    .join("") || ""
                }
                <tr>
                  <td colspan="3" style="text-align: right;">Total</td>
                  <td>$${taxableAmount.toFixed(2)}</td>
                  <td>$${cgstAmount.toFixed(2)}</td>
                  <td>$${sgstAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div class="total">
              <p>Grand Total: $${totalAmount.toFixed(2)}</p>
            </div>
            <div class="footer">
              <p>Thank you for your business!</p>
              <p>For any queries, please contact us at: ${
                COMPANY_DETAILS.email
              }</p>
              <p>Authorized Signatory: ____________________</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadPDF = async () => {
    if (!selectedInvoice) return;
    const doc = new jsPDF();
    let yPos = 10;
    const margin = 6;
    const contentWidth = 210 - 2 * margin;
    const taxableAmount = selectedInvoice.services.reduce(
      (sum, svc) => sum + svc.quantity * svc.rate,
      0
    );
    const cgstAmount = selectedInvoice.services.reduce(
      (sum, svc) => sum + (svc.quantity * svc.rate * svc.cgst) / 100,
      0
    );
    const sgstAmount = selectedInvoice.services.reduce(
      (sum, svc) => sum + (svc.quantity * svc.rate * svc.sgst) / 100,
      0
    );
    const totalAmount = taxableAmount + cgstAmount + sgstAmount;

    doc.setFont("helvetica");
    doc.setFillColor(249, 250, 251);
    doc.rect(0, 0, 210, 297, "F");
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.rect(margin, margin, contentWidth, 297 - 2 * margin);
    yPos += margin;

    // Header
    doc.setFillColor(219, 234, 254);
    doc.rect(margin, margin, contentWidth, 70, "F");
    try {
      const logoBase64 = await loadImageAsBase64(LOGO_URL);
      doc.addImage(logoBase64, "PNG", 80, yPos, 50, 15);
      yPos += 25;
    } catch (err) {
      console.error("Failed to load logo:", err);
      doc.setFontSize(20);
      doc.text("Bizvility Logo", 105, yPos, { align: "center" });
      yPos += 10;
    }
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55);
    doc.setFont("helvetica", "bold");
    // doc.text('TAX INVOICE (Original)', 105, yPos, { align: 'center' });
    yPos += 4;
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.setFont("helvetica", "normal");
    doc.text(COMPANY_DETAILS.name, 105, yPos, { align: "center" });
    yPos += 4;
    doc.text(COMPANY_DETAILS.address, 105, yPos, { align: "center" });
    yPos += 9;
    doc.text(`GSTIN: ${COMPANY_DETAILS.gstin}`, 105, yPos, { align: "center" });
    yPos += 4;
    doc.text(
      `Email: ${COMPANY_DETAILS.email} | Phone: ${COMPANY_DETAILS.phone}`,
      105,
      yPos,
      { align: "center" }
    );
    yPos += 4;
    doc.text(`Invoice Date: ${selectedInvoice.issueDate}`, 105, yPos, {
      align: "center",
    });
    yPos += 12;

    // Invoice Details
    yPos += 6;
    doc.setFillColor(229, 231, 235);
    doc.rect(margin, yPos - 5, contentWidth, 8, "F");
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Details", margin + 2, yPos);
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos + 3, margin + contentWidth, yPos + 3);
    yPos += 10;

    doc.setFontSize(11);
    // Left Column
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Number:", margin + 2, yPos);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    doc.text(selectedInvoice.invoiceNumber, margin + 68, yPos);
    yPos += 6;
    doc.setDrawColor(209, 213, 219);
    doc.line(margin + 2, yPos, margin + 92, yPos);
    yPos += 6;

    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text("Due Date:", margin + 2, yPos);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    doc.text(selectedInvoice.dueDate, margin + 68, yPos);
    yPos += 6;
    doc.line(margin + 2, yPos, margin + 92, yPos);
    yPos += 6;

    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text("Status:", margin + 2, yPos);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    doc.text(selectedInvoice.status, margin + 68, yPos);
    yPos += 6;
    doc.line(margin + 2, yPos, margin + 92, yPos);
    yPos += 6;

    if (selectedInvoice.paidDate) {
      doc.setTextColor(17, 24, 39);
      doc.setFont("helvetica", "bold");
      doc.text("Paid Date:", margin + 2, yPos);
      doc.setTextColor(55, 65, 81);
      doc.setFont("helvetica", "normal");
      doc.text(selectedInvoice.paidDate, margin + 68, yPos);
      yPos += 6;
      doc.line(margin + 2, yPos, margin + 92, yPos);
      yPos += 6;
    }

    if (selectedInvoice.paymentMethod) {
      doc.setTextColor(17, 24, 39);
      doc.setFont("helvetica", "bold");
      doc.text("Payment Method:", margin + 2, yPos);
      doc.setTextColor(55, 65, 81);
      doc.setFont("helvetica", "normal");
      doc.text(selectedInvoice.paymentMethod, margin + 68, yPos);
      yPos += 6;
      doc.line(margin + 2, yPos, margin + 92, yPos);
      yPos += 6;
    }

    // Right Column
    let clientYPos =
      yPos -
      (selectedInvoice.paidDate && selectedInvoice.paymentMethod
        ? 60
        : selectedInvoice.paidDate || selectedInvoice.paymentMethod
        ? 48
        : 36);
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", margin + 102, clientYPos);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    doc.text(selectedInvoice.client.name, margin + 192, clientYPos, {
      align: "right",
    });
    clientYPos += 6;
    doc.line(margin + 102, clientYPos, margin + 192, clientYPos);
    clientYPos += 6;

    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text("Address:", margin + 102, clientYPos);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    doc.text(selectedInvoice.client.address, margin + 192, clientYPos, {
      align: "right",
    });
    clientYPos += 6;
    doc.line(margin + 102, clientYPos, margin + 192, clientYPos);
    clientYPos += 6;

    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text("GSTIN:", margin + 102, clientYPos);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    doc.text(selectedInvoice.client.gstin || "N/A", margin + 192, clientYPos, {
      align: "right",
    });
    clientYPos += 6;
    doc.line(margin + 102, clientYPos, margin + 192, clientYPos);
    clientYPos += 6;

    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text("Email:", margin + 102, clientYPos);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    doc.text(selectedInvoice.email, margin + 192, clientYPos, {
      align: "right",
    });
    clientYPos += 6;
    doc.line(margin + 102, clientYPos, margin + 192, clientYPos);
    clientYPos += 6;

    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text("Business Owner:", margin + 102, clientYPos);
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    doc.text(
      clientToOwnerMap[selectedInvoice.client.name] || "N/A",
      margin + 192,
      clientYPos,
      { align: "right" }
    );

    // Services
    yPos += 6;
    doc.setFillColor(229, 231, 235);
    doc.rect(margin, yPos - 5, contentWidth, 8, "F");
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.setFont("helvetica", "bold");
    doc.text("Services", margin + 4, yPos);
    yPos += 10;

    doc.setFillColor(59, 130, 246);
    doc.rect(margin + 2.5, yPos - 5, contentWidth - 5, 8, "F");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Description", margin + 15, yPos); // Reduced width from 20 to 15
    doc.text("Qty", margin + 80, yPos);
    doc.text("Rate", margin + 100, yPos);
    doc.text("Taxable", margin + 120, yPos);
    doc.text("CGST", margin + 140, yPos);
    doc.text("SGST", margin + 160, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(17, 24, 39);
    selectedInvoice.services.forEach((svc, idx) => {
      if (idx % 2 === 0) {
        doc.setFillColor(243, 244, 246);
        doc.rect(margin + 2.5, yPos - 5, contentWidth - 5, 8, "F");
      } else {
        doc.setFillColor(255, 255, 255);
        doc.rect(margin + 2.5, yPos - 5, contentWidth - 5, 8, "F");
      }
      doc.setDrawColor(209, 213, 219);
      doc.setLineWidth(0.2);
      doc.rect(margin + 15, yPos - 5, 35, 8); // Adjusted width
      doc.rect(margin + 50, yPos - 5, 30, 8); // Reduced width from 60 to 35
      doc.rect(margin + 80, yPos - 5, 20, 8);
      doc.rect(margin + 100, yPos - 5, 20, 8);
      doc.rect(margin + 120, yPos - 5, 20, 8);
      doc.rect(margin + 140, yPos - 5, 20, 8);
      doc.rect(margin + 160, yPos - 5, 18, 8);
      doc.text(svc.description, margin + 17, yPos); // Adjusted x position
      doc.text(`${svc.quantity}`, margin + 82, yPos);
      doc.text(`$${svc.rate.toFixed(2)}`, margin + 102, yPos);
      doc.text(`$${(svc.quantity * svc.rate).toFixed(2)}`, margin + 122, yPos);
      doc.text(
        `$${((svc.quantity * svc.rate * svc.cgst) / 100).toFixed(2)}`,
        margin + 142,
        yPos
      );
      doc.text(
        `$${((svc.quantity * svc.rate * svc.sgst) / 100).toFixed(2)}`,
        margin + 162,
        yPos
      );
      yPos += 8;
    });

    doc.setFillColor(219, 234, 254);
    doc.rect(margin + 2.5, yPos - 5, contentWidth - 5, 8, "F");
    doc.rect(margin + 2, yPos - 5, 115, 8);
    doc.rect(margin + 120, yPos - 5, 20, 8);
    doc.rect(margin + 140, yPos - 5, 20, 8);
    doc.rect(margin + 160, yPos - 5, 18, 8);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total", margin + 4, yPos);
    doc.text(`$${taxableAmount.toFixed(2)}`, margin + 122, yPos);
    doc.text(`$${cgstAmount.toFixed(2)}`, margin + 142, yPos);
    doc.text(`$${sgstAmount.toFixed(2)}`, margin + 162, yPos);
    yPos += 12;

    doc.text(`Grand Total: $${totalAmount.toFixed(2)}`, margin + 192, yPos, {
      align: "right",
    });
    yPos += 12;

    // Bank Details
    // doc.setFontSize(12);
    // doc.setTextColor(31, 41, 55);
    // doc.setFont("helvetica", "bold");
    // doc.text('Bank Details', margin + 4, yPos);
    // yPos += 6;
    // doc.setFontSize(10);
    // doc.setTextColor(55, 65, 81);
    // doc.setFont("helvetica", "normal");
    // doc.text(`Bank Name: ${COMPANY_DETAILS.bank.name}`, margin + 4, yPos);
    // yPos += 4;
    // doc.text(`Account Number: ${COMPANY_DETAILS.bank.account}`, margin + 4, yPos);
    // yPos += 4;
    // doc.text(`IFSC Code: ${COMPANY_DETAILS.bank.ifsc}`, margin + 4, yPos);
    // yPos += 4;
    // doc.text(`Branch: ${COMPANY_DETAILS.bank.branch}`, margin + 4, yPos);
    // yPos += 12;

    // Footer
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.line(margin + 2, yPos, margin + 192, yPos);
    yPos += 12;
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.text("Thank you for your business!", 105, yPos, { align: "center" });
    yPos += 4;
    doc.text(
      `For any queries, please contact us at ${COMPANY_DETAILS.email}`,
      105,
      yPos,
      { align: "center" }
    );
    yPos += 4;
    doc.text("Authorized Signatory: ____________________", 105, yPos, {
      align: "center",
    });

    doc.save(`TAX_Invoice_${selectedInvoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending Amount</h3>
          <p className="text-2xl font-bold text-yellow-600">
            ${pendingAmount.toFixed(2)}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Overdue Amount</h3>
          <p className="text-2xl font-bold text-red-600">
            ${overdueAmount.toFixed(2)}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Invoices</h3>
          <p className="text-2xl font-bold text-gray-900">{totalInvoices}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
              <input
                type="text"
                placeholder="Search invoices..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Invoice
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Client
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  GSTIN
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Due Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        Issued: ${invoice.issueDate}
                      </div>
                      {invoice.paidDate && (
                        <div className="text-sm text-green-600">
                          Paid: ${invoice.paidDate}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.client.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {invoice.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {invoice.client.gstin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      $
                      {invoice.services
                        .reduce((sum, svc) => sum + svc.quantity * svc.rate, 0)
                        .toFixed(2)}
                    </div>
                    {invoice.paymentMethod && (
                      <div className="text-sm text-gray-500">
                        {invoice.paymentMethod}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm ${
                        invoice.status === "Overdue"
                          ? "text-red-600 font-medium"
                          : "text-gray-900"
                      }`}
                    >
                      {invoice.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Print"
                        onClick={() => handlePreviewClick(invoice)}
                      >
                        <PrinterIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPreview && selectedInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div
            ref={previewRef}
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl max-h-[100vh] transform transition-all duration-300 opacity-100 scale-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Invoice Preview
              </h2>
              <button
                onClick={handleClosePreview}
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50">
              <div className="p-4 text-center bg-blue-100 rounded-t-lg">
                <img
                  src={LOGO_URL}
                  alt="Bizvility Logo"
                  className="mx-auto mb-4"
                  style={{ maxWidth: "150px", height: "auto" }}
                />
                {/* <h2 className="text-xl font-semibold text-gray-800">TAX INVOICE (Original)</h2> */}
                <p className="text-sm text-gray-600">{COMPANY_DETAILS.name}</p>
                <p className="text-sm text-gray-600">
                  {COMPANY_DETAILS.address}
                </p>
                <p className="text-sm text-gray-600">
                  GSTIN: {COMPANY_DETAILS.gstin}
                </p>
                <p className="text-sm text-gray-600">
                  Email: {COMPANY_DETAILS.email} | Phone:{" "}
                  {COMPANY_DETAILS.phone}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Invoice Date: {selectedInvoice.issueDate}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-200 border-b-2 border-blue-500 rounded">
                  Invoice Details
                </h3>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Invoice Number:
                      </span>
                      <span className="text-sm text-gray-700">
                        {selectedInvoice.invoiceNumber}
                      </span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Due Date:
                      </span>
                      <span className="text-sm text-gray-700">
                        {selectedInvoice.dueDate}
                      </span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Status:
                      </span>
                      <span className="text-sm text-gray-700">
                        {selectedInvoice.status}
                      </span>
                    </div>
                    <hr className="border-gray-300" />
                    {selectedInvoice.paidDate && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm font-semibold text-gray-900">
                            Paid Date:
                          </span>
                          <span className="text-sm text-gray-700">
                            {selectedInvoice.paidDate}
                          </span>
                        </div>
                        <hr className="border-gray-300" />
                      </>
                    )}
                    {selectedInvoice.paymentMethod && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm font-semibold text-gray-900">
                            Payment Method:
                          </span>
                          <span className="text-sm text-gray-700">
                            {selectedInvoice.paymentMethod}
                          </span>
                        </div>
                        <hr className="border-gray-300" />
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Bill To:
                      </span>
                      <span className="text-sm text-gray-700">
                        {selectedInvoice.client.name}
                      </span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Address:
                      </span>
                      <span className="text-sm text-gray-700">
                        {selectedInvoice.client.address}
                      </span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        GSTIN:
                      </span>
                      <span className="text-sm text-gray-700">
                        {selectedInvoice.client.gstin || "N/A"}
                      </span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Email:
                      </span>
                      <span className="text-sm text-gray-700">
                        {selectedInvoice.email}
                      </span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Business Owner:
                      </span>
                      <span className="text-sm text-gray-700">
                        {clientToOwnerMap[selectedInvoice.client.name] || "N/A"}
                      </span>
                    </div>
                    <hr className="border-gray-300" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-200 rounded">
                  Services
                </h3>
                <table className="w-full mt-4 border-collapse">
                  <thead>
                    <tr className="text-white bg-blue-500">
                      <th className="p-3 text-left border border-gray-300">
                        Description
                      </th>
                      <th className="p-3 text-right border border-gray-300">
                        Qty
                      </th>
                      <th className="p-3 text-right border border-gray-300">
                        Rate
                      </th>
                      <th className="p-3 text-right border border-gray-300">
                        Taxable
                      </th>
                      <th className="p-3 text-right border border-gray-300">
                        CGST
                      </th>
                      <th className="p-3 text-right border border-gray-300">
                        SGST
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.services.map((svc, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="p-3 border border-gray-300">
                          {svc.description}
                        </td>
                        <td className="p-3 text-right border border-gray-300">
                          {svc.quantity}
                        </td>
                        <td className="p-3 text-right border border-gray-300">
                          ${svc.rate.toFixed(2)}
                        </td>
                        <td className="p-3 text-right border border-gray-300">
                          ${(svc.quantity * svc.rate).toFixed(2)}
                        </td>
                        <td className="p-3 text-right border border-gray-300">
                          $
                          {((svc.quantity * svc.rate * svc.cgst) / 100).toFixed(
                            2
                          )}
                        </td>
                        <td className="p-3 text-right border border-gray-300">
                          $
                          {((svc.quantity * svc.rate * svc.sgst) / 100).toFixed(
                            2
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-semibold bg-blue-100">
                      <td className="p-3 border border-gray-300" colSpan="3">
                        Total
                      </td>
                      <td className="p-3 text-right border border-gray-300">
                        $
                        {selectedInvoice.services
                          .reduce(
                            (sum, svc) => sum + svc.quantity * svc.rate,
                            0
                          )
                          .toFixed(2)}
                      </td>
                      <td className="p-3 text-right border border-gray-300">
                        $
                        {selectedInvoice.services
                          .reduce(
                            (sum, svc) =>
                              sum + (svc.quantity * svc.rate * svc.cgst) / 100,
                            0
                          )
                          .toFixed(2)}
                      </td>
                      <td className="p-3 text-right border border-gray-300">
                        $
                        {selectedInvoice.services
                          .reduce(
                            (sum, svc) =>
                              sum + (svc.quantity * svc.rate * svc.sgst) / 100,
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    Grand Total: $
                    {(
                      selectedInvoice.services.reduce(
                        (sum, svc) => sum + svc.quantity * svc.rate,
                        0
                      ) +
                      selectedInvoice.services.reduce(
                        (sum, svc) =>
                          sum + (svc.quantity * svc.rate * svc.cgst) / 100,
                        0
                      ) +
                      selectedInvoice.services.reduce(
                        (sum, svc) =>
                          sum + (svc.quantity * svc.rate * svc.sgst) / 100,
                        0
                      )
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* <div className="mt-6">
                <h3 className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-200 rounded">Bank Details</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-700">Bank Name: {COMPANY_DETAILS.bank.name}</p>
                  <p className="text-sm text-gray-700">Account Number: {COMPANY_DETAILS.bank.account}</p>
                  <p className="text-sm text-gray-700">IFSC Code: {COMPANY_DETAILS.bank.ifsc}</p>
                  <p className="text-sm text-gray-700">Branch: {COMPANY_DETAILS.bank.branch}</p>
                </div>
              </div> */}

              <div className="pt-4 mt-6 text-center border-t border-blue-500">
                <p className="text-sm text-gray-600">
                  Thank you for your business!
                </p>
                <p className="text-sm text-gray-600">
                  For any queries, please contact us at: {COMPANY_DETAILS.email}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Authorized Signatory: ____________________
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Download
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperInvoices;

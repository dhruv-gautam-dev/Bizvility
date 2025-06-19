import { useState, useRef } from 'react';
import { DocumentTextIcon, XMarkIcon, ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { jsPDF } from 'jspdf';

const initialInvoices = [
  { id: 'INV-001', date: '2025-06-01', amount: 150.00, status: 'Paid', paidDate: '2025-06-05', paymentMethod: 'Credit Card' },
  { id: 'INV-002', date: '2025-05-15', amount: 300.00, status: 'Pending', paidDate: null, paymentMethod: null },
  { id: 'INV-003', date: '2025-04-10', amount: 200.00, status: 'Overdue', paidDate: null, paymentMethod: null },
];

// Sample items for the invoice (for demonstration)
const invoiceItems = [
  { description: 'Service Fee', quantity: 1, unitPrice: 100.00, total: 100.00 },
  { description: 'Additional Charges', quantity: 1, unitPrice: 50.00, total: 50.00 },
];

export default function UserInvoice() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const previewRef = useRef(null);

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleOutsideClick = (e) => {
    if (previewRef.current && !previewRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  const handleDownloadPDF = () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF();
    let yPos = 10;

    // Set font to Helvetica for a professional look
    doc.setFont("helvetica");

    // Overall Background (matching bg-gray-50)
    doc.setFillColor(249, 250, 251); // RGB equivalent of bg-gray-50
    doc.rect(0, 0, 210, 297, 'F'); // Fill entire A4 page

    // Content Container with Border (matching border-gray-200)
    const margin = 6; // Matches p-6
    const contentWidth = 210 - 2 * margin;
    const contentHeight = 297 - 2 * margin;
    doc.setDrawColor(229, 231, 235); // RGB equivalent of border-gray-200
    doc.setLineWidth(0.3);
    doc.rect(margin, margin, contentWidth, contentHeight);

    // Adjust starting position
    yPos += margin;

    // Header: Invoice Title (matching preview)
    doc.setFontSize(30); // Matches text-3xl
    doc.setTextColor(17, 24, 39); // RGB equivalent of text-gray-900
    doc.setFont("helvetica", "bold");
    doc.text('INVOICE', 105, yPos, { align: 'center' });
    yPos += 8;

    // Header: Invoice Number (matching preview)
    doc.setFontSize(16); // Matches text-lg
    doc.setTextColor(75, 85, 99); // RGB equivalent of text-gray-600
    doc.setFont("helvetica", "normal");
    doc.text(`#${selectedInvoice.id}`, 105, yPos, { align: 'center' });
    yPos += 8;

    // Header: Blue Underline (matching bg-blue-500)
    doc.setDrawColor(59, 130, 246); // RGB equivalent of bg-blue-500
    doc.setLineWidth(0.5); // Matches h-1 (approx. 4px, scaled to 0.5mm)
    doc.line(85, yPos, 125, yPos); // Matches w-32 (128px, scaled to 40mm)
    yPos += 10;

    // Company Info and Invoice Details (matching flex justify-between)
    yPos += 6;
    doc.setFontSize(11); // Matches text-sm
    // Left: Company Info
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text('ListingPro Inc.', margin + 2, yPos);
    yPos += 6;
    doc.setTextColor(75, 85, 99);
    doc.setFont("helvetica", "normal");
    doc.text('123 Business Avenue', margin + 2, yPos);
    yPos += 6;
    doc.text('City, State, 12345', margin + 2, yPos);
    yPos += 6;
    doc.text('Email: billing@listingpro.com', margin + 2, yPos);
    yPos += 6;
    doc.text('Phone: (123) 456-7890', margin + 2, yPos);

    // Right: Invoice Details
    let rightYPos = yPos - 24;
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text('Date:', margin + 162, rightYPos);
    doc.setTextColor(75, 85, 99);
    doc.setFont("helvetica", "normal");
    doc.text(selectedInvoice.date, margin + 192, rightYPos, { align: 'right' });
    rightYPos += 6;
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text('Status:', margin + 162, rightYPos);
    doc.setTextColor(75, 85, 99);
    doc.setFont("helvetica", "normal");
    doc.text(selectedInvoice.status, margin + 192, rightYPos, { align: 'right' });
    yPos += 10;

    // Billed To Section (centered)
    yPos += 6;
    doc.setFontSize(14); // Matches text-lg
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text('Billed To', 105, yPos, { align: 'center' });
    yPos += 6;
    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);
    doc.setFont("helvetica", "normal");
    doc.text('John Doe', 105, yPos, { align: 'center' });
    yPos += 6;
    doc.text('456 Client Road', 105, yPos, { align: 'center' });
    yPos += 6;
    doc.text('City, State, 67890', 105, yPos, { align: 'center' });
    yPos += 6;
    doc.text('Email: john.doe@example.com', 105, yPos, { align: 'center' });
    yPos += 10;

    // Items Table
    yPos += 6;
    doc.setFontSize(11);
    // Table Header (matching bg-blue-50)
    doc.setFillColor(219, 234, 254); // RGB equivalent of bg-blue-50
    doc.rect(margin + 2.5, yPos - 5, contentWidth - 5, 8, 'F');
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.text('Description', margin + 4, yPos);
    doc.text('Qty', margin + 120, yPos);
    doc.text('Unit Price', margin + 150, yPos);
    doc.text('Total', margin + 192, yPos, { align: 'right' });
    yPos += 8;

    // Table Rows (no alternating colors, all white)
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    invoiceItems.forEach((item) => {
      doc.setFillColor(255, 255, 255);
      doc.rect(margin + 2.5, yPos - 5, contentWidth - 5, 8, 'F');
      doc.setDrawColor(209, 213, 219);
      doc.setLineWidth(0.2);
      doc.rect(margin + 2, yPos - 5, (contentWidth - 4) * 0.5, 8); // Description
      doc.rect(margin + 2 + (contentWidth - 4) * 0.5, yPos - 5, (contentWidth - 4) * 0.15, 8); // Qty
      doc.rect(margin + 2 + (contentWidth - 4) * 0.65, yPos - 5, (contentWidth - 4) * 0.15, 8); // Unit Price
      doc.rect(margin + 2 + (contentWidth - 4) * 0.80, yPos - 5, (contentWidth - 4) * 0.20, 8); // Total
      doc.text(item.description, margin + 4, yPos);
      doc.text(item.quantity.toString(), margin + 120, yPos);
      doc.text(`$${item.unitPrice.toFixed(2)}`, margin + 150, yPos);
      doc.text(`$${item.total.toFixed(2)}`, margin + 192, yPos, { align: 'right' });
      yPos += 8;
    });

    // Total Row (bold, no special background)
    doc.setFillColor(255, 255, 255);
    doc.rect(margin + 2.5, yPos - 5, contentWidth - 5, 8, 'F');
    doc.setDrawColor(209, 213, 219);
    doc.setLineWidth(0.2);
    doc.rect(margin + 2, yPos - 5, (contentWidth - 4) * 0.80, 8);
    doc.rect(margin + 2 + (contentWidth - 4) * 0.80, yPos - 5, (contentWidth - 4) * 0.20, 8);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 24, 39);
    doc.text('Total', margin + 4, yPos);
    doc.text(`$${selectedInvoice.amount.toFixed(2)}`, margin + 192, yPos, { align: 'right' });
    yPos += 24;

    // Footer (centered, no blue border)
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.text('Thank you for your business!', 105, yPos, { align: 'center' });
    yPos += 4;
    doc.text('For inquiries, please contact us at billing@listingpro.com', 105, yPos, { align: 'center' });

    // Save the PDF
    doc.save(`Invoice_${selectedInvoice.id}.pdf`);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${selectedInvoice?.id || ''}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            .header { text-align: center; padding-bottom: 10px; margin-bottom: 20px; }
            .details { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #dbeafe; }
            .total { text-align: right; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <h1 style="font-size: 30px; font-weight: bold;">INVOICE</h1>
              <p style="font-size: 16px; color: #4b5563;">#${selectedInvoice?.id || ''}</p>
              <div style="height: 4px; width: 128px; background-color: #3b82f6; margin: 0 auto;"></div>
            </div>
            <div class="details">
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <p style="font-weight: bold; color: #111827;">ListingPro Inc.</p>
                  <p style="color: #4b5563;">123 Business Avenue</p>
                  <p style="color: #4b5563;">City, State, 12345</p>
                  <p style="color: #4b5563;">Email: billing@listingpro.com</p>
                  <p style="color: #4b5563;">Phone: (123) 456-7890</p>
                </div>
                <div style="text-align: right;">
                  <p style="color: #111827; font-weight: bold;">Date: <span style="color: #4b5563;">${selectedInvoice?.date || ''}</span></p>
                  <p style="color: #111827; font-weight: bold;">Status: <span style="color: #4b5563;">${selectedInvoice?.status || ''}</span></p>
                </div>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                <p style="font-weight: bold; color: #111827; font-size: 16px;">Billed To</p>
                <p style="color: #4b5563;">John Doe</p>
                <p style="color: #4b5563;">456 Client Road</p>
                <p style="color: #4b5563;">City, State, 67890</p>
                <p style="color: #4b5563;">Email: john.doe@example.com</p>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceItems.map(item => `
                  <tr>
                    <td style="color: #4b5563;">${item.description}</td>
                    <td style="color: #4b5563;">${item.quantity}</td>
                    <td style="color: #4b5563;">$${item.unitPrice.toFixed(2)}</td>
                    <td style="color: #4b5563; text-align: right;">$${item.total.toFixed(2)}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td colspan="3" style="text-align: right; font-weight: bold; color: #111827;">Total</td>
                  <td style="text-align: right; font-weight: bold; color: #111827;">$${selectedInvoice?.amount?.toFixed(2) || '0.00'}</td>
                </tr>
              </tbody>
            </table>
            <div class="footer" style="text-align: center;">
              <p style="color: #4b5563; font-style: italic;">Thank you for your business!</p>
              <p style="color: #4b5563;">For inquiries, please contact us at billing@listingpro.com</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : invoice.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleViewDetails(invoice)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <DocumentTextIcon className="h-4 w-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Invoice Preview */}
      {isModalOpen && selectedInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={handleOutsideClick}
        >
          <div
            ref={previewRef}
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl max-h-[100vh] transform transition-all duration-300 opacity-100 scale-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Invoice #{selectedInvoice.id}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Invoice Preview */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 flex-1 overflow-y-auto">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">INVOICE</h1>
                <p className="text-lg text-gray-600 mt-1">#{selectedInvoice.id}</p>
                <div className="mt-2 h-1 w-32 bg-blue-500 mx-auto rounded"></div>
              </div>

              {/* Company Info and Invoice Details */}
              <div className="flex justify-between mb-6">
                <div>
                  <p className="font-semibold text-gray-900 text-lg">ListingPro Inc.</p>
                  <p className="text-sm text-gray-600 mt-1">123 Business Avenue</p>
                  <p className="text-sm text-gray-600">City, State, 12345</p>
                  <p className="text-sm text-gray-600">Email: billing@listingpro.com</p>
                  <p className="text-sm text-gray-600">Phone: (123) 456-7890</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Date:</span> {selectedInvoice.date}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Status:</span> {selectedInvoice.status}
                  </p>
                </div>
              </div>

              {/* Billed To */}
              <div className="mb-6 text-center">
                <p className="font-semibold text-gray-900 text-lg">Billed To</p>
                <p className="text-sm text-gray-600 mt-1">John Doe</p>
                <p className="text-sm text-gray-600">456 Client Road</p>
                <p className="text-sm text-gray-600">City, State, 67890</p>
                <p className="text-sm text-gray-600">Email: john.doe@example.com</p>
              </div>

              {/* Items Table */}
              <div className="mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                        Description
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                        Qty
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                        Unit Price
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceItems.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 px-4 text-sm text-gray-600">{item.description}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.quantity}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3" className="py-3 px-4 text-right font-semibold text-gray-900">
                        Total
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        ${selectedInvoice.amount.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer Note */}
              <div className="text-center text-sm text-gray-600">
                <p className="italic">Thank you for your business!</p>
                <p className="mt-1">For inquiries, please contact us at billing@listingpro.com.</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Download PDF
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <PrinterIcon className="h-5 w-5" />
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
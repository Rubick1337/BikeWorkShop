import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const PdfPartButton = ({ parts }) => {
    const handleDownloadPDF = () => {
        const pdfDoc = new jsPDF();
        const totalPages = "{total_pages_count_string}";

        pdfDoc.text("Product Parts", 15, 10);

        const partData = parts.map(part => ({
            name: part.name,
            brand: part.brand,
            model: part.model,
            price: part.price,
            inSell: part.inSell ? 'Yes' : 'No'
        }));

        autoTable(pdfDoc, {
            theme: "grid",
            headStyles: {
                fontSize: 10,
                fillColor: [0, 123, 255]
            },
            bodyStyles: {
                fontSize: 8,
                fontStyle: "italic"
            },
            columns: [
                { header: 'Name Part', dataKey: 'name' },
                { header: 'Brand Part', dataKey: 'brand' },
                { header: 'Price', dataKey: 'price' },
                { header: 'In Sell', dataKey: 'inSell' }
            ],
            body: partData
        });

        if (typeof pdfDoc.putTotalPages === "function") {
            pdfDoc.putTotalPages(totalPages);
        }

        pdfDoc.save("ReportParts.pdf");
    };

    return (
        <button className="create__buton" onClick={handleDownloadPDF}>
            Download PDF
        </button>
    );
};

export default PdfPartButton;

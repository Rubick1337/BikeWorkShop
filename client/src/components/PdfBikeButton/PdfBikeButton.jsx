import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const PdfBikeButton = ({ bikes}) => {
    const handleDownloadPDF = () => {
        const pdfDoc = new jsPDF();
        const totalPages = "{total_pages_count_string}";

        pdfDoc.text("Product Bikes", 15, 10);

        const bikeData = bikes.map(bike => ({
            name: bike.name,
            brand: bike.brand,
            model: bike.model,
            price: bike.price,
            inSell: bike.inSell ? 'Yes' : 'No'
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
                { header: 'Name Bike', dataKey: 'name' },
                { header: 'Brand Bike', dataKey: 'brand' },
                { header: 'Model Bike', dataKey: 'model' },
                { header: 'Price', dataKey: 'price' },
                { header: 'In Sell', dataKey: 'inSell' }
            ],
            body: bikeData
        });

        if (typeof pdfDoc.putTotalPages === "function") {
            pdfDoc.putTotalPages(totalPages);
        }

        pdfDoc.save("ReportTable.pdf");
    };

    return (
        <button className="create__buton" onClick={handleDownloadPDF}>
            Download PDF
        </button>
    );
};

export default PdfBikeButton;

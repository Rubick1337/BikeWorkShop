import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import PartService from '../../service/PartService';

const PdfPartButton = () => {
    const [loading, setLoading] = useState(false); // Состояние загрузки

    const handleDownloadPDF = async () => {
        setLoading(true);

        try {
            const response = await PartService.fetchParts({
                sortOrder: '',
                searchQuery: '',
                category: '',
                type: '',
                minPrice: '',
                maxPrice: '',
                page: 1,
                limit: 1000000 // Получаем все детали
            });

            const parts = response.rows || response;

            // Генерация PDF
            const pdfDoc = new jsPDF();
            const totalPages = "{total_pages_count_string}";

            pdfDoc.text("Product Parts", 15, 10);

            const partData = parts.map(part => ({
                name: part.name,
                brand: part.brand,
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
        } catch (error) {
            console.error("Ошибка при создании PDF:", error);
        }

        setLoading(false);
    };

    return (
        <button className="create__buton" onClick={handleDownloadPDF} disabled={loading}>
            {loading ? 'Generating...' : 'Download PDF'}
        </button>
    );
};

export default PdfPartButton;

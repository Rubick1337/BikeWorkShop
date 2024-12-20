import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import BikeService from '../../service/BikeService';

const PdfBikeButton = () => {
    const [loading, setLoading] = useState(false); // Состояние загрузки

    const handleDownloadPDF = async () => {
        setLoading(true);

        try {
            // Выполняем запрос напрямую через BikeService
            const response = await BikeService.fetchBikes({
                sortOrder: '',
                searchQuery: '',
                category: '',
                type: '',
                minPrice: '',
                maxPrice: '',
                page: 1,
                limit: 1000000, // Получаем все велосипеды
            });

            const bikes = response.rows || response; // Обработка структуры ответа

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

            pdfDoc.save("ReportBikes.pdf");
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

export default PdfBikeButton;

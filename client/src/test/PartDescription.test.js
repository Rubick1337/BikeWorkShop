import React from 'react';
import { render } from '@testing-library/react';
import PartDescription from '../components/PartDescription/PartDescription';

describe('PartDescription Component', () => {
    const mockPart = {
        id_type_part: '1',
        id_category_part: '2',
        img: '/path/to/image.jpg',
        brand: 'BrandName',
        model: 'ModelName',
        price: 100,
        description: 'This is a test part description.'
    };

    const mockGetTypeName = jest.fn(() => 'Тип детали');
    const mockGetCategoryName = jest.fn(() => 'Категория товара');

    it('matches snapshot', () => {
        const { asFragment } = render(
            <PartDescription
                part={mockPart}
                getTypeName={mockGetTypeName}
                getCategoryName={mockGetCategoryName}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
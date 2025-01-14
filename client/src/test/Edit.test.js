import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditBikeDialog from '../components/EditBikeDialog/EditBikeDialog';

describe('EditBikeDialog Component', () => {
    const mockClose = jest.fn();
    const mockSubmit = jest.fn();
    const bike = {
        _id: '1',
        name: 'Тестовый велосипед',
        price: 1000, // Убедитесь, что это число
        model: 'Модель 1',
        brand: 'Бренд 1',
        description: 'Описание велосипеда',
        id_category_bike: 'cat1',
        id_type_bike: 'type1',
        img: null,
        inSell: true
    };
    const categories = [{ _id: 'cat1', name: 'Категория 1' }, { _id: 'cat2', name: 'Категория 2' }];
    const types = [{ _id: 'type1', name: 'Тип 1' }, { _id: 'type2', name: 'Тип 2' }];

    beforeEach(() => {
        jest.clearAllMocks(); // Очищаем моки перед каждым тестом
    });

    it('displays the correct bike data from props', () => {
        render(
            <EditBikeDialog
                open={true}
                handleClose={mockClose}
                bike={bike}
                handleEditBikeSubmit={mockSubmit}
                categories={categories}
                types={types}
            />
        );

        // Проверяем, что данные отображаются правильно
        expect(screen.getByLabelText(/Название/i)).toHaveValue(bike.name);
        expect(screen.getByLabelText(/Цена/i)).toHaveValue(bike.price);
        expect(screen.getByLabelText(/Модель/i)).toHaveValue(bike.model);
        expect(screen.getByLabelText(/Бренд/i)).toHaveValue(bike.brand);
        expect(screen.getByLabelText(/Описание/i)).toHaveValue(bike.description);
    });

    it('calls handleClose when close button is clicked', () => {
        render(
            <EditBikeDialog
                open={true}
                handleClose={mockClose}
                bike={bike}
                handleEditBikeSubmit={mockSubmit}
                categories={categories}
                types={types}
            />
        );

        fireEvent.click(screen.getByText(/Закрыть/i));
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('updates the state when input values change', () => {
        render(
            <EditBikeDialog
                open={true}
                handleClose={mockClose}
                bike={bike}
                handleEditBikeSubmit={mockSubmit}
                categories={categories}
                types={types}
            />
        );

        // Изменяем значение в поле "Название"
        fireEvent.change(screen.getByLabelText(/Название/i), { target: { value: 'Обновленный велосипед' } });
        expect(screen.getByLabelText(/Название/i)).toHaveValue('Обновленный велосипед');

        // Изменяем значение в поле "Цена"
        fireEvent.change(screen.getByLabelText(/Цена/i), { target: { value: 1500 } });
        expect(screen.getByLabelText(/Цена/i)).toHaveValue(1500);
    });

    it('calls handleEditBikeSubmit with updated data when save button is clicked', () => {
        render(
            <EditBikeDialog
                open={true}
                handleClose={mockClose}
                bike={bike}
                handleEditBikeSubmit={mockSubmit}
                categories={categories}
                types={types}
            />
        );

        fireEvent.change(screen.getByLabelText(/Название/i), { target: { value: 'Обновленный велосипед' } });
        fireEvent.click(screen.getByText(/Сохранить/i));

        expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Обновленный велосипед' }));
    });
});
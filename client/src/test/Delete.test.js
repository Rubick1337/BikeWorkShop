import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeletePartDialog from '../components/DeletePartDialog/DeletePartDialog';

describe('DeletePartDialog Component', () => {
    const mockHandleClose = jest.fn();
    const mockHandleConfirmDelete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Сбрасываем состояния моков перед каждым тестом
    });

    it('renders dialog with correct title and content', () => {
        render(
            <DeletePartDialog
                open={true}
                handleClose={mockHandleClose}
                handleConfirmDelete={mockHandleConfirmDelete}
            />
        );

        expect(screen.getByText('Удалить деталь')).toBeInTheDocument();
    });

    it('calls handleClose when cancel button is clicked', () => {
        render(
            <DeletePartDialog
                open={true}
                handleClose={mockHandleClose}
                handleConfirmDelete={mockHandleConfirmDelete}
            />
        );

        fireEvent.click(screen.getByText('Отмена'));
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });

    it('calls handleConfirmDelete when delete button is clicked', () => {
        render(
            <DeletePartDialog
                open={true}
                handleClose={mockHandleClose}
                handleConfirmDelete={mockHandleConfirmDelete}
            />
        );

        fireEvent.click(screen.getByText('Удалить'));
        expect(mockHandleConfirmDelete).toHaveBeenCalledTimes(1);
    });

    it('does not render dialog when open is false', () => {
        render(
            <DeletePartDialog
                open={false}
                handleClose={mockHandleClose}
                handleConfirmDelete={mockHandleConfirmDelete}
            />
        );

        expect(screen.queryByText('Удалить деталь')).not.toBeInTheDocument();
    });
});
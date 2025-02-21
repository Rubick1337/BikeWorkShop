import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomAlert from '../components/CustomAlert/CustomAlert';


describe('CustomAlert Component', () => {
    const handleClose = jest.fn();

    it('renders correctly when open', () => {
        const { asFragment } = render(
            <CustomAlert
                open={true}
                message="Тестовое сообщение"
                severity="success"
                handleClose={handleClose}
            />
        );

        // Проверяем, что сообщение отображается
        expect(screen.getByText(/Тестовое сообщение/i)).toBeInTheDocument();

        // Сравниваем снэпшот
        expect(asFragment()).toMatchSnapshot();
    });

    it('does not render when open is false', () => {
        const { asFragment } = render(
            <CustomAlert
                open={false}
                message="Тестовое сообщение"
                severity="success"
                handleClose={handleClose}
            />
        );

        // Проверяем, что сообщение не отображается
        expect(screen.queryByText(/Тестовое сообщение/i)).not.toBeInTheDocument();

        // Сравниваем снэпшот
        expect(asFragment()).toMatchSnapshot();
    });

    it('calls handleClose when alert is closed', () => {
        render(
            <CustomAlert
                open={true}
                message="Тестовое сообщение"
                severity="success"
                handleClose={handleClose}
            />
        );

        // Имитируем закрытие алерта
        fireEvent.click(screen.getByRole('button')); // Клик на кнопку закрытия

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
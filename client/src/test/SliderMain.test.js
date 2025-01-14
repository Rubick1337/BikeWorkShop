import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SliderMain from '../components/SliderMain/SliderMain'; // Убедитесь, что путь правильный

describe('SliderMain Component', () => {
    beforeEach(() => {
        render(<SliderMain />);
    });

    it('renders correctly with initial state', () => {
        // Проверяем, что заголовок отображается
        expect(screen.getByText(/Bike workshop/i)).toBeInTheDocument();
        expect(screen.getByText(/Веломастерская позаботиться о вашем велосипеде/i)).toBeInTheDocument();

        // Проверяем, что первый слайд активен
        const activeSlide = screen.getByRole('button', { name: /Go to slide 1/i });
        expect(activeSlide).toHaveClass('active');
    });

    it('changes slide when next button is clicked', () => {
        // Находим кнопку для следующего слайда
        const nextButton = screen.getByRole('button', { name: /Next slide/i });

        // Имитируем клик по кнопке "Next"
        fireEvent.click(nextButton);

        // Проверяем, что второй слайд активен
        const activeSlide = screen.getByRole('button', { name: /Go to slide 2/i });
        expect(activeSlide).toHaveClass('active');
    });

    it('changes slide when prev button is clicked', () => {
        // Находим кнопку для следующего слайда
        const nextButton = screen.getByRole('button', { name: /Next slide/i });
        fireEvent.click(nextButton); // Переходим на второй слайд

        // Находим кнопку для предыдущего слайда
        const prevButton = screen.getByRole('button', { name: /Previous slide/i });

        // Имитируем клик по кнопке "Prev"
        fireEvent.click(prevButton);

        // Проверяем, что первый слайд снова активен
        const activeSlide = screen.getByRole('button', { name: /Go to slide 1/i });
        expect(activeSlide).toHaveClass('active');
    });

    it('changes slide when pagination button is clicked', () => {
        // Находим кнопку пагинации для второго слайда
        const paginationButton = screen.getByRole('button', { name: /Go to slide 2/i });

        // Имитируем клик по кнопке пагинации
        fireEvent.click(paginationButton);

        // Проверяем, что второй слайд активен
        const activeSlide = screen.getByRole('button', { name: /Go to slide 2/i });
        expect(activeSlide).toHaveClass('active');
    });

    it('matches snapshot', () => {
        // Сравниваем снэпшот
        const { asFragment } = render(<SliderMain />);
        expect(asFragment()).toMatchSnapshot();
    });
});
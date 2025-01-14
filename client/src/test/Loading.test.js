import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../components/Loading/Loading'; // Убедитесь, что путь правильный

describe('Loading Component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Loading />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders loading elements correctly', () => {
        const { getByText } = render(<Loading />);

        // Проверяем наличие класса для загрузки
        expect(document.querySelector('.container__loading')).toBeInTheDocument();
        expect(document.querySelector('.bike')).toBeInTheDocument();
        expect(document.querySelector('.wheel')).toBeInTheDocument();
    });
});
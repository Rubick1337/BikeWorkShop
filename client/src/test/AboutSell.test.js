import React from 'react';
import { render } from '@testing-library/react';
import AboutSell from '../components/AboutSell/AboutSell';

describe('AboutSell Component', () => {
    // Тест на сравнение с снимком
    it('renders correctly', () => {
        const { container } = render(<AboutSell />);
        expect(container).toMatchSnapshot();
    });

    it('renders correct headings', () => {
        const { getByText } = render(<AboutSell />);
        expect(getByText('О наших товарах')).toBeInTheDocument();
        expect(getByText('Партнерские поставки')).toBeInTheDocument();
        expect(getByText('Гарантия качества')).toBeInTheDocument();
        expect(getByText('Надежность')).toBeInTheDocument();
        expect(getByText('Поддержка клиентов')).toBeInTheDocument();
    });

    it('renders correct descriptions', () => {
        const { getByText } = render(<AboutSell />);
        expect(getByText(/наши велосипеды и комплектующие поставляются только от проверенных партнеров/i)).toBeInTheDocument();
        expect(getByText(/каждая деталь и велосипед проходят строгий контроль качества и сопровождаются гарантией на срок до 2 лет/i)).toBeInTheDocument();
        expect(getByText(/мы выбираем материалы, которые обеспечивают долговечность и надежность вашего велосипеда даже при интенсивном использовании/i)).toBeInTheDocument();
        expect(getByText(/покупая у нас, вы получаете квалифицированную поддержку и возможность сервисного обслуживания у наших партнеров/i)).toBeInTheDocument();
    });

    it('renders without crashing', () => {
        const { getByText } = render(<AboutSell />);
        expect(getByText('О наших товарах')).toBeInTheDocument();
    });

    it('handles unexpected props gracefully', () => {
        const { container } = render(<AboutSell unexpectedProp="unexpected" />);
        expect(container).toBeInTheDocument();
    });
});
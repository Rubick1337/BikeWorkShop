// WelcomePartSell.test.js
import React from 'react';
import { render } from '@testing-library/react';
import WelcomPartSell from '../components/WelcomePartSell/WelcomePartSell'; // Убедитесь, что путь правильный

describe('WelcomPartSell Component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<WelcomPartSell />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with correct class names and text content', () => {
        const { container } = render(<WelcomPartSell />);

        // Проверка наличия контейнера с фоном
        const backgroundPart = container.querySelector('.background__sell__part');
        expect(backgroundPart).toBeInTheDocument();

        // Проверка заголовка h2
        const title = container.querySelector('h2');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Ride Free, Ride Far');

        // Проверка заголовка h3
        const subtitle = container.querySelector('h3');
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toHaveTextContent('Посмотрите нашу коллекцию');

        // Проверка ссылки
        const link = container.querySelector('.link__sell');
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent('За покупками');
    });
});
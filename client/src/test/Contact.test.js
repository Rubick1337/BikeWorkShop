import React from 'react';
import { render } from '@testing-library/react';
import ContactInfo from '../components/ContactInfo/ContactInfo'; // Убедитесь, что путь правильный

describe('ContactInfo Component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<ContactInfo />);
        expect(asFragment()).toMatchSnapshot();
    });
});
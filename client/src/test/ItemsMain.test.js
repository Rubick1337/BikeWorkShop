import React from 'react';
import { render } from '@testing-library/react';
import ItemsMain from '../components/ItemsMain/ItemsMain';

describe('ItemsMain Component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<ItemsMain />);
        expect(asFragment()).toMatchSnapshot();
    });
});
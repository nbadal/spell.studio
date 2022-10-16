import React from 'react';
import { act } from '@testing-library/react';
import { render, screen } from '../test-utils';
import { App } from '../App';

it('renders without crashing', () => {
    act(() => {
        render(<App />);
    });
    const titleElement = screen.getByText(/spellstudio/i);
    expect(titleElement).toBeInTheDocument();
});

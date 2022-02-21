import React from 'react';
import { render, screen } from '../test-utils';
import { App } from '../App';

it('renders without crashing', () => {
    render(<App />);
    const titleElement = screen.getByText(/spellstudio/i);
    expect(titleElement).toBeInTheDocument();
});

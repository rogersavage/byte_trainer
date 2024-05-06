import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Welcome alert appears', () => {
  render(<App />);
  const welcomeAlert = screen.getByText(/Welcome/i);
  expect(welcomeAlert).toBeInTheDocument();
});

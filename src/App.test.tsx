import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock Chart.js for testing
jest.mock('chart.js/auto', () => ({
  Chart: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
    update: jest.fn(),
    resize: jest.fn(),
  })),
  registerables: [],
}));

jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="bar-chart">Bar Chart</div>,
  Doughnut: () => <div data-testid="doughnut-chart">Doughnut Chart</div>,
}));

test('renders candidate nurturing dashboard', () => {
  render(<App />);
  const dashboardTitle = screen.getByText(/candidate nurturing dashboard/i);
  expect(dashboardTitle).toBeInTheDocument();
});

test('displays active candidates section', () => {
  render(<App />);
  const candidatesSection = screen.getByText(/active candidates \(10\)/i);
  expect(candidatesSection).toBeInTheDocument();
});

test('shows candidate cards', () => {
  render(<App />);
  const candidateNames = screen.getByText(/john smith/i);
  expect(candidateNames).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import React from "react";
import App from '../App';

//Test Case ID: Test18
test('renders App with Flash Learning message', () => {
  render(<App />);

  expect(screen.getByText("Flash Learning")).toBeInTheDocument()
});

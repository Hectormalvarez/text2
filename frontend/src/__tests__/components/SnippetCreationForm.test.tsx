// src/app/components/__tests__/SnippetCreationForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SnippetCreationForm from '@/app/components/SnippetCreationForm';

// Mock the fetch function
global.fetch = jest.fn() as jest.Mock;

describe('SnippetCreationForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the form correctly', () => {
    render(<SnippetCreationForm />);
    expect(screen.getByPlaceholderText(/enter.*snippet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create snippet/i })).toBeInTheDocument();
  });

  it('submits the form and displays success message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 'abc123' }),
    });

    render(<SnippetCreationForm />);
    fireEvent.change(screen.getByPlaceholderText(/enter.*snippet/i), { target: { value: 'Test snippet' } });
    fireEvent.click(screen.getByRole('button', { name: /create snippet/i }));

    await waitFor(() => {
      expect(screen.getByText(/snippet created successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/abc123/)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/snippets', expect.any(Object));
  });

  it('displays an error message when snippet creation fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to create snippet'));

    render(<SnippetCreationForm />);
    fireEvent.change(screen.getByPlaceholderText(/enter.*snippet/i), { target: { value: 'Test snippet' } });
    fireEvent.click(screen.getByRole('button', { name: /create snippet/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to create snippet/i)).toBeInTheDocument();
    });
  });
});
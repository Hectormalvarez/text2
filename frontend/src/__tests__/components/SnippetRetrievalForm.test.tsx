import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SnippetRetrievalForm from '@/app/components/SnippetRetrievalForm';

// Mock the fetch function
global.fetch = jest.fn() as jest.Mock;

describe('SnippetRetrievalForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the form correctly', () => {
    render(<SnippetRetrievalForm />);
    expect(screen.getByPlaceholderText(/enter.*id/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retrieve snippet/i })).toBeInTheDocument();
  });

  it('retrieves and displays a snippet when form is submitted with valid ID', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ text: 'Test snippet content' }),
    });

    render(<SnippetRetrievalForm />);
    fireEvent.change(screen.getByPlaceholderText(/enter.*id/i), { target: { value: 'abc123' } });
    fireEvent.click(screen.getByRole('button', { name: /retrieve snippet/i }));

    await waitFor(() => {
      expect(screen.getByText('Test snippet content')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/\/api\/snippets\/abc123/), expect.any(Object));
  });

  it('displays a "not found" message when the snippet does not exist', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<SnippetRetrievalForm />);
    fireEvent.change(screen.getByPlaceholderText(/enter.*id/i), { target: { value: 'nonexistent' } });
    fireEvent.click(screen.getByRole('button', { name: /retrieve snippet/i }));

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  it('displays an error message when retrieval fails for reasons other than "not found"', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to retrieve snippet'));

    render(<SnippetRetrievalForm />);
    fireEvent.change(screen.getByPlaceholderText(/enter.*id/i), { target: { value: 'abc123' } });
    fireEvent.click(screen.getByRole('button', { name: /retrieve snippet/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to retrieve snippet/i)).toBeInTheDocument();
    });
  });
});
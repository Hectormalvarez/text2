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

  it('renders the form with an input field and submit button', () => {
    render(<SnippetRetrievalForm />);
    expect(screen.getByPlaceholderText(/Enter Snippet ID/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Retrieve Snippet/i })).toBeInTheDocument();
  });

  it('displays an error when submitting an empty form', async () => {
    render(<SnippetRetrievalForm />);
    fireEvent.click(screen.getByRole('button', { name: /Retrieve Snippet/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a Snippet ID/i)).toBeInTheDocument();
    });
  });

  it('makes a GET request with the correct ID when submitting a valid form', async () => {
    render(<SnippetRetrievalForm />);
    fireEvent.change(screen.getByPlaceholderText(/Enter Snippet ID/i), { target: { value: 'abc123' } });
    fireEvent.click(screen.getByRole('button', { name: /Retrieve Snippet/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/snippets/abc123', expect.objectContaining({
        method: 'GET'
      }));
    });
  });

  it('displays the snippet content when successfully retrieved', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ text: 'This is a test snippet' }),
    });

    render(<SnippetRetrievalForm />);
    fireEvent.change(screen.getByPlaceholderText(/Enter Snippet ID/i), { target: { value: 'abc123' } });
    fireEvent.click(screen.getByRole('button', { name: /Retrieve Snippet/i }));

    await waitFor(() => {
      expect(screen.getByText('This is a test snippet')).toBeInTheDocument();
    });
  });

  it('displays a "not found" message when the snippet does not exist', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<SnippetRetrievalForm />);
    fireEvent.change(screen.getByPlaceholderText(/Enter Snippet ID/i), { target: { value: 'nonexistent' } });
    fireEvent.click(screen.getByRole('button', { name: /Retrieve Snippet/i }));

    await waitFor(() => {
      expect(screen.getByText(/Snippet not found/i)).toBeInTheDocument();
    });
  });

  it('displays an error message when the retrieval fails for reasons other than "not found"', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<SnippetRetrievalForm />);
    fireEvent.change(screen.getByPlaceholderText(/Enter Snippet ID/i), { target: { value: 'abc123' } });
    fireEvent.click(screen.getByRole('button', { name: /Retrieve Snippet/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to retrieve snippet/i)).toBeInTheDocument();
    });
  });
});

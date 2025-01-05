import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SnippetForm from "@/app/components/SnippetCreationForm";

// Mock the fetch function
global.fetch = jest.fn() as jest.Mock;

describe('SnippetForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the form with a textarea and submit button', () => {
    render(<SnippetForm />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Snippet/i })).toBeInTheDocument();
  });

  it('displays an error message when submitting an empty form', async () => {
    render(<SnippetForm />);
    fireEvent.click(screen.getByRole('button', { name: /Create Snippet/i }));
    await waitFor(() => {
      expect(screen.getByText(/please enter a snippet/i)).toBeInTheDocument();
    });
  });
})

describe("Snippet form creation", () => {  
  it('sends a POST request with the correct data when submitting a valid form', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 'abc123' }),
    });

    render(<SnippetForm />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test snippet' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Snippet/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'Test snippet' }),
      });
    });
  });

  it('displays the snippet ID after successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 'abc123' }),
    });
    
    render(<SnippetForm />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test snippet' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Snippet/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/snippet created successfully! id: abc123/i)).toBeInTheDocument();
    });
  });
  
  it('displays an error message when the API request fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    
    render(<SnippetForm />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test snippet' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Snippet/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to create snippet. Please try again./i)).toBeInTheDocument();
    });
  });

  it('clears the form after successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 'abc123' }),
    });
    
    render(<SnippetForm />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Test snippet' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Snippet/i }));

    await waitFor(() => {
      expect(textarea.value).toBe('');
    });
  });
});

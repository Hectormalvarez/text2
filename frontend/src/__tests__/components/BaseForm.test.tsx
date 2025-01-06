import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BaseForm from '@/app/components/BaseForm';

describe('BaseForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders input form correctly', () => {
    render(
      <BaseForm
        onSubmit={mockSubmit}
        buttonText="Submit"
        inputType="input"
        placeholder="Enter text"
        ariaLabel="Text input"
      />
    );

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders textarea form correctly', () => {
    render(
      <BaseForm
        onSubmit={mockSubmit}
        buttonText="Submit"
        inputType="textarea"
        placeholder="Enter long text"
        ariaLabel="Long text input"
      />
    );

    expect(screen.getByPlaceholderText('Enter long text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('calls onSubmit with input value when form is submitted', () => {
    render(
      <BaseForm
        onSubmit={mockSubmit}
        buttonText="Submit"
        inputType="input"
        placeholder="Enter text"
        ariaLabel="Text input"
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter text'), { target: { value: 'Test input' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalledWith('Test input');
  });

  it('displays error message when submitted with empty input', () => {
    render(
      <BaseForm
        onSubmit={mockSubmit}
        buttonText="Submit"
        inputType="input"
        placeholder="Enter text"
        ariaLabel="Text input"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('This field cannot be empty')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
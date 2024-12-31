import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react';
import HomePage from 'src/app/page';

describe('HomePage', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders the welcome message', () => {
    render(<HomePage />);
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveTextContent('Welcome to TextShare!');
  });

  it('applies the correct CSS class to the heading', () => {
    render(<HomePage />);
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveClass('title');
  });
});

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import HomePage from 'src/app/page';

describe('HomePage', () => {
  let headingElement;

  beforeEach(() => {
    render(<HomePage />);
    headingElement = screen.getByRole('heading', { level: 1 });
  });

  it('renders the welcome message', () => {
    expect(headingElement).toHaveTextContent('Welcome to TextShare!');
  });

  it('applies the correct CSS class to the heading', () => {
    expect(headingElement).toHaveClass('title');
  });
});

import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import SnippetForm from "src/app/components/SnippetForm";

describe("Snippet Input Form", () => {
  beforeEach(() => {
    render(<SnippetForm />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders a text area for snippet input", () => {
    const textArea = screen.getByRole("textbox", {
      name: /enter your snippet/i,
    });
    expect(textArea).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("prevents submission of empty snippets", () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });
    const textArea = screen.getByRole("textbox", {
      name: /enter your snippet/i,
    });

    fireEvent.click(submitButton);
    expect(screen.getByText(/please enter a snippet/i)).toBeInTheDocument();

    fireEvent.change(textArea, {
      target: { value: "prevents submission of empty snippets" },
    });
    fireEvent.click(submitButton);
    expect(
      screen.queryByText(/please enter a snippet/i)
    ).not.toBeInTheDocument();
  });

  it("clears the text area after successful submission", () => {
    const textArea = screen.getByRole("textbox", {
      name: /enter your snippet/i,
    });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(textArea, {
      target: { value: "clears the text area after successful submission" },
    });
    fireEvent.click(submitButton);
    expect(textArea).toHaveValue("");
  });
});

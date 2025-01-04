import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import SnippetID from "@/app/components/SnippetID";

describe("SnippetID component", () => {
  afterEach(cleanup);

  it("should render the SnippetID text field", () => {
    render(<SnippetID />);
    const snippetIDInput = screen.getByLabelText("Snippet ID");
    expect(snippetIDInput).toBeInTheDocument();
  });

  it("should update the value when typed into", () => {
    render(<SnippetID />);
    const snippetIDInput = screen.getByLabelText("Snippet ID");
    fireEvent.change(snippetIDInput, { target: { value: "test-id" } });
    expect(snippetIDInput).toHaveValue("test-id");
  });

  it("should display an error message when submitted empty", () => {
    render(<SnippetID />);
    const submitButton = screen.getByText("Retrieve Snippet");
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Please enter a Snippet ID");
    expect(errorMessage).toBeInTheDocument();
  });
});
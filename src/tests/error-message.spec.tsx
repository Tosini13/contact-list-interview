import { render, screen } from "@testing-library/react";
import ErrorMessage from "src/ErrorMessage";

describe("ErrorMessage component tests", () => {
  test("render error message", () => {
    render(<ErrorMessage error={"It is error message"} />);
    const text = screen.getByText(/It is error message/i);
    const container = screen.getByTestId("error_message");
    expect(text).toBeInTheDocument();
    expect(container).toBeVisible();
  });

  test("render error message", () => {
    render(<ErrorMessage />);
    const text = screen.queryByText(/It is error message/i);
    const container = screen.getByTestId("error_message");
    expect(text).not.toBeInTheDocument();
    expect(container).not.toBeVisible();
  });
});

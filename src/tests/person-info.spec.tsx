import { render, screen } from "@testing-library/react";
import PersonInfo from "src/PersonInfo";

const props = {
  data: {
    id: "test-id",
    firstNameLastName: "test-firstName test-LastName",
    jobTitle: "test-jobTitle",
    emailAddress: "test-emailAddress",
  },
  isSelected: false,
  onSelect: jest.fn(),
};

describe("PersonInfo component tests", () => {
  test("render person info", () => {
    render(<PersonInfo {...props} />);
    const initials = screen.getByText(/tt/i);
    const container = screen.getByTestId("personal-info");
    expect(initials).toBeInTheDocument();
    expect(container.style.outline).toBe("none");
  });

  test("render selected person info", () => {
    render(<PersonInfo {...props} isSelected />);
    const container = screen.getByTestId("personal-info");
    expect(container.style.outline).toBe("1px solid green");
  });
});

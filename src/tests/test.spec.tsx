import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import apiData from "src/api";
import App from "../App";

jest.mock("src/api");
const mockTestingData = [
  {
    id: "1",
    jobTitle: "Tester1",
    emailAddress: "test1@test.com",
    firstNameLastName: "TestName1 TestLName1",
  },
  {
    id: "2",
    jobTitle: "Tester2",
    emailAddress: "test2@test.com",
    firstNameLastName: "TestName2 TestLName2",
  },
];

describe("rendered with data", () => {
  test("render list with data", async () => {
    (apiData as jest.MockedFunction<typeof apiData>).mockResolvedValueOnce(
      mockTestingData
    );
    render(<App />);

    const list = screen.getByTestId("contact-list");

    await waitFor(() => {
      expect(list.children).toHaveLength(2);
      expect(list.children[0].textContent).toContain("Tester1");
      expect(list.children[1].textContent).toContain("Tester2");
    });
    const text = screen.getByText(/Selected contacts: 0/i);
    const button = screen.getByTestId("fetch-button");
    const loading = screen.queryByTestId("loading");
    expect(text).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
  });

  test("render list with selected contact", async () => {
    (apiData as jest.MockedFunction<typeof apiData>).mockResolvedValueOnce(
      mockTestingData
    );
    render(<App />);
    const list = screen.getByTestId("contact-list");
    await waitFor(() => expect(list.children).toHaveLength(2));

    act(() => {
      fireEvent.click(list.children[1]);
    });

    await waitFor(() => {
      expect(list.children[0].textContent).toContain("Tester2");
      expect(list.children[1].textContent).toContain("Tester1");
      expect(screen.getByText(/Selected contacts: 1/i)).toBeInTheDocument();
    });
  });
});

describe("rendered with error", () => {
  test("render error", async () => {
    (apiData as jest.MockedFunction<typeof apiData>).mockRejectedValueOnce(
      "Test Error Message"
    );

    return import("../api").then(async () => {
      render(<App />);
      const list = screen.getByTestId("contact-list");
      const error = screen.getByTestId("error_message");
      await waitFor(() => {
        expect(list.children).toHaveLength(0);
        expect(error.textContent).toContain("Test Error Message");
      });
      const loading = screen.queryByTestId("loading");
      expect(loading).not.toBeInTheDocument();
    });
  });
});

describe("rendered with loading", () => {
  test("render loading", async () => {
    (apiData as jest.MockedFunction<typeof apiData>).mockImplementation(
      () => new Promise(() => {})
    );

    return import("../api").then(async () => {
      render(<App />);
      const loading = screen.queryByTestId("loading");
      expect(loading).toBeInTheDocument();
    });
  });
});

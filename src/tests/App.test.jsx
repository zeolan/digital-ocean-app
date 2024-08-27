import { render, screen } from "@testing-library/react";

import App from "../App";
import { renderWithProviders } from "./test-utils.tsx";

describe("Test Terms Of Use Modal Popup", () => {
  test("Renders Terms Of Use Modal Popup should renders", () => {
    renderWithProviders(<App />);
    const termsOfUseElement = screen.queryByTestId("terms-of-use");
    expect(termsOfUseElement).toBeInTheDocument();
  });
  test("should render agree button", () => {
    renderWithProviders(<App />);
    const termsOfUseElement = screen.queryByTestId("terms-of-use-agree-btn");
    expect(termsOfUseElement).toBeInTheDocument();
  });
});

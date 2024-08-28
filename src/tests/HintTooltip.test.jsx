import { render, screen } from "@testing-library/react";

import HintTooltip from "../components/HintTooltip.tsx";
import { renderWithProviders } from "./test-utils.tsx";

describe("Test HintTooltip", () => {
  test("should render HintTooltip with children", () => {
    renderWithProviders(
      <HintTooltip open={true}>
        <div>HintTooltip children</div>
      </HintTooltip>
    );
    const hintTooltipElement = screen.queryByTestId("hint-tooltip");
    expect(hintTooltipElement).toBeVisible();
    const hintTooltipChildren = screen.getByText("HintTooltip children");
    expect(hintTooltipChildren).toBeVisible();
  });
  xtest("should not render HintTooltip", () => {
    renderWithProviders(
      <HintTooltip open={false}>
        <div>HintTooltip children</div>
      </HintTooltip>
    );
    const hintTooltipElement = screen.queryByTestId("hint-tooltip");
    expect(hintTooltipElement).not.toBeVisible();
  });
});

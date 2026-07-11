import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import App from "./App.js";

vi.mock("./api/api.js", () => ({
  default: vi.fn(() => new Promise(() => {})),
}));

describe("App", () => {
  it("renders the loading state without making a real API request", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
      await screen.findByRole("img", { name: "loading" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "RU" }));

    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
  });
});

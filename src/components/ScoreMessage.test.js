import ScoreMessage from "./ScoreMessage";
import { render, screen, waitFor } from "@testing-library/react";

describe("ScoreMessage", () => {
  test("renders", async () => {
    render(<ScoreMessage message="This is update" />);
    const heading = await waitFor(() =>
      screen.findByText(/Updates: This is update/i)
    );
    expect(heading).toBeInTheDocument();
  });
});

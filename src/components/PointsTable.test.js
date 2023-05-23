import PointsTable from "./PointsTable";
import { render, screen, waitFor } from "@testing-library/react";

const data = {
  homeSetScore: 1,
  awaySetScore: 2,
  homePointScore: 15,
  awayPointScore: 30,
};
describe("PointsTable", () => {
  test("renders", async () => {
    render(
      <PointsTable
        homePointScore={data.homePointScore}
        awayPointScore={data.awayPointScore}
        homeSetScore={data.homeSetScore}
        awaySetScore={data.awaySetScore}
      />
    );
    const homePointScore = await waitFor(() => screen.findByText(/15/i));
    expect(homePointScore).toBeInTheDocument();

    const awayPointScore = await waitFor(() => screen.findByText(/30/i));
    expect(awayPointScore).toBeInTheDocument();
  });
});

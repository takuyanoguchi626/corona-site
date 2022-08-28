import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Main from "../components/Main";
import TopPage from "../pages/TopPage";
import { PrefectureProvider } from "../providers/PrefectureProvider";
import {} from "axios-mock-adapter"

describe("mainコンポーネントのテスト", () => {
  test("都道府県をクリックしたら正しく詳細ページが表示される", async () => {
    //レンダーする
    render(<Main></Main>, { wrapper: PrefectureProvider });
    await screen.findByText("北海道");
    //クリックする
    userEvent.click(screen.getByTestId("北海道"));
    //詳細ページの何かが表示されてるかのエクスペクト
    expect(screen.getByText("累積陽性者: 595,415人")).toBeInTheDocument();
  });
});

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopPage from "./pages/TopPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage></TopPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PrefecuturePage from "../components/PrefecuturePage";

export default function TopPage() {
  return (
    <>
      <PrefecuturePage></PrefecuturePage>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </>
  );
}

import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PrefecuturePage from "../components/PrefecuturePage";
import MainGraph from "../components/MainGraph";

export default function TopPage() {
  return (
    <>
      <PrefecuturePage></PrefecuturePage>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
      <MainGraph></MainGraph>
    </>
  );
}

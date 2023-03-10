import { styled } from "@chakra-ui/react";
import React from "react";
import Header from "./common/Header";
import style from "../styles/Common.module.css";

const Layout = ({ children, title }: any) => {
  return (
    <>
      <Header />
      <main>
        <h2 className={style.title}>{title}</h2>
        {children}
      </main>
    </>
  );
};

export default Layout;

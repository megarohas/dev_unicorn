import "react-semantic-toasts/styles/react-semantic-alert.css";

import React from "react";

import { MainWrapper, Body, Spacer } from "./layout_sc";
import Meta from "../meta/meta";

export default function Layout({ children }) {
  return (
    <MainWrapper>
      <Meta />
      <Body>
        <Spacer />
        {children}
        <Spacer />
      </Body>
    </MainWrapper>
  );
}

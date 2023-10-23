import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

import { useIsFetching } from "@tanstack/react-query";

export default function Header(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  const fetchingInProgress = useIsFetching();
  return (
    <>
      <div id="main-header-loading">
        {fetchingInProgress > 0 && <progress />}
      </div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{props.children}</nav>
      </header>
    </>
  );
}

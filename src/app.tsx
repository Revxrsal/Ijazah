import {Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start/router";
import {Suspense} from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import {ColorModeProvider, ColorModeScript} from "@kobalte/core";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Nav/>
          <Suspense>
            <ColorModeScript/>
            <ColorModeProvider>{props.children}</ColorModeProvider>
          </Suspense>
        </>
      )}
    >
      <FileRoutes/>
    </Router>
  );
}

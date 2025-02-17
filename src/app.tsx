import {Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start/router";
import {Suspense} from "solid-js";
import "./app.css";
import {ColorModeProvider, ColorModeScript} from "@kobalte/core";
import {MetaProvider} from "@solidjs/meta";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Suspense>
            <ColorModeScript/>
            <ColorModeProvider>{props.children}</ColorModeProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes/>
    </Router>
  );
}

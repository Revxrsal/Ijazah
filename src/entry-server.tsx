// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>

        <meta property="og:title" content="همم 3"/>
        <meta property="og:description"
              content="نموذج تسجيل الإجازات والشهادات لسنن النسائي - همم 3"/>
        <meta property="og:image" content="https://ijazah.vercel.app/android-chrome-192x192.png"/>
        <meta property="og:url" content="https://ijazah.vercel.app/"/>

        {/*<meta property="og:title" content="نموذج تسجيل الإجازات والشهادات"/>*/}
        {/*<meta property="og:site_name" content="همم 3"/>*/}
        {/*<meta property="og:url" content="https://ijazah.vercel.app/"/>*/}
        {/*<meta property="og:description"*/}
        {/*      content="نموذج تسجيل الإجازات والشهادات لسنن النسائي - الدورة العلمية المكثّفة - همم 3"/>*/}
        {/*<meta property="og:type" content=""/>*/}
        {/*<meta property="og:image" content=""/>*/}
        {assets}
      </head>
      <body>
      <div id="app">{children}</div>
      {scripts}
      </body>
      </html>
    )}
  />
));

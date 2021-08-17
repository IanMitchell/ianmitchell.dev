import React, { Fragment, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";
import { SWRConfig } from "swr";
import MDX from "../components/MDX";
import Social from "../components/Social";
import "../styles/main.scss";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load("LKSXEXQK", {
      includedDomains: ["ianmitchell.dev"],
      url: "https://macaw.ianmitchell.dev/script.js",
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router]);

  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = localStorage.getItem("theme");

    if (theme === "dark" || (darkMode && theme == null)) {
      document.documentElement.classList.add("dark-mode");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark-mode");
    }

    // // Whenever the user explicitly chooses light mode
    // localStorage.theme = 'light';

    // // Whenever the user explicitly chooses dark mode
    // localStorage.theme = 'dark';

    // // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem('theme');
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Ian Mitchell</title>
      </Head>

      <Social />

      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <MDX>
          <Component {...pageProps} />
        </MDX>
      </SWRConfig>
    </Fragment>
  );
}

import React from "react";
import Vercel from "./icons/Vercel";
import Next from "./icons/Next";
import Sass from "./icons/Sass";
import Markdown from "./icons/Markdown";

export default function Footer() {
  return (
    <footer>
      <img className="splash" src="/footer.svg" alt="" />
      <section>
        <div className="container">
          <p>
            This website is developed using{" "}
            <span>
              <Next /> Next.js
            </span>
            . It's styled using{" "}
            <span>
              {" "}
              <Sass /> SCSS
            </span>
            . All the content is written in{" "}
            <span>
              <Markdown /> Markdown
            </span>
            , and it is hosted on{" "}
            <span>
              <Vercel /> Vercel
            </span>
            . The source code is{" "}
            <a href="https://github.com/ianmitchell/ianmitchell.dev">
              hosted on GitHub
            </a>
            .
          </p>
          <p className="copyright">
            &copy; Copyright {new Date().getFullYear()} Ian Mitchell.
          </p>
        </div>
      </section>
    </footer>
  );
}

import React from "react";

export default function Footer() {
  return (
    <footer>
      <img className="splash" src="/footer.svg" alt="" />
      <section>
        <div className="container">
          <p className="copyright">
            &copy; Copyright {new Date().getFullYear()} Ian Mitchell.
          </p>
        </div>
      </section>
    </footer>
  );
}

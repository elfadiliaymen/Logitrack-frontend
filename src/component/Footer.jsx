import React from "react";

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} LogiTrack. Tous droits réservés.</p>
    </footer>
  );
}

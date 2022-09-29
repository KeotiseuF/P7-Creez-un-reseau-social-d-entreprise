import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export function NavPrincipal() {
  useEffect(() => {
    const deconnected = document.getElementById("deconnected");
    deconnected.addEventListener("click", () => {
      localStorage.clear();
    });
  }, []);

  return (
    <nav>
      <Link to="/" id="deconnected">
        Deconnexion
      </Link>
      <Link to={`./create_post`}>Créer un post</Link>
    </nav>
  );
}

export function NavHome() {
  return (
    <nav>
      <Link to={`../accueil`}>Accueil</Link>
    </nav>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export function NavRegisterOrConnect() {
  return (
    <nav>
      <Link to="/register">Inscription</Link>
      <Link to="/connect">Connexion</Link>
    </nav>
  );
}

export function NavHome() {
  return (
    <nav>
      <Link to="/">Accueil</Link>
    </nav>
  );
}

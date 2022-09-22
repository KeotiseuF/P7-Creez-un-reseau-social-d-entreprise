import React from "react";
import { Link } from "react-router-dom";

const url = window.location.search; // Permet d'afficher les paramètres de l'url.
const params = new URLSearchParams(url); // Cherche dans les paramètres de l'url le premier paramètre.
const id = params.get("id"); // Renvoie le premier paramètre qui est pour le cas "l'id".

export function NavAccueil() {
  return (
    <nav>
      <Link to="/">Deconnexion</Link>
      <Link to={`./create_post?id=${id}`}>Créer un post</Link>
    </nav>
  );
}

export function NavCreatePost() {
  return <Link to={`../accueil?id=${id}`}>Accueil</Link>;
}

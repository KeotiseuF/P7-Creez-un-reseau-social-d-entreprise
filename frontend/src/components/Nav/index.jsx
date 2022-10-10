import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { StyledNavHome } from "../../utils/style/Home";

// Liens de déconnexion et de création de post.
export function NavPrincipal() {
    useEffect(() => {
        const deconnected = document.getElementById("deconnected");
        deconnected.addEventListener("click", () => {
            localStorage.clear();
        });
    }, []);

    return (
        <StyledNavHome>
            <Link to="/" id="deconnected">
                Déconnexion
            </Link>
            <Link to={`./create_post`}>Créer un post</Link>
        </StyledNavHome>
    );
}

// Lien vers la page d'accueil.
export function NavHome() {
    return (
        <nav>
            <Link to={`../accueil`}>Accueil</Link>
        </nav>
    );
}

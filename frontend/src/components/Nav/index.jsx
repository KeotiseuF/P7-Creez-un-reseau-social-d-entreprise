import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { StyledNavHome } from "../../utils/style/Home";
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
                Deconnexion
            </Link>
            <Link to={`./create_post`}>Créer un post</Link>
        </StyledNavHome>
    );
}

export function NavHome() {
    return (
        <nav>
            <Link to={`../accueil`}>Accueil</Link>
        </nav>
    );
}

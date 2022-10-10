import { NavHome, NavPrincipal } from "../../components/Nav"; // Importe une fonction qui gère des liens de navigation.
import { StyledHeader, StyledLogo } from "../../utils/style/Home"; // importe le style de ma page d'accueil.

// Affiche le logo avec les liens principales de la page d'accueil.
export function HeaderHome() {
    return (
        <StyledHeader>
            <StyledLogo
                src={require("../../assets/logo.svg").default}
                alt="logo_Groupomania"
            />
            <NavPrincipal />
        </StyledHeader>
    );
}

// Affiche le logo avec le lien pour retourner à la page d'accueil.
export function HeaderCreateModifyPost() {
    return (
        <StyledHeader>
            <StyledLogo
                src={require("../../assets/logo.svg").default}
                alt="logo_Groupomania"
            />
            <NavHome />
        </StyledHeader>
    );
}

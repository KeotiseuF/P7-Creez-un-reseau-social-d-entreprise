import {
    StyledError,
    StyledImgError,
    StyledMessageError,
} from "../../utils/style/Error";

// Erreur qui s'affiche lorsque l'utilisateur se trompe dans l'url.
export function Error() {
    return (
        <StyledError>
            <StyledImgError
                src={require("../../assets/error.svg").default}
                alt="log"
            />
            <StyledMessageError>
                Une erreur est survenue, veuillez verifier l'url.
            </StyledMessageError>
        </StyledError>
    );
}

// Erreur qui s'affiche lorsque l'utilisateur essaye d'accéder à une page du site alors qu'il n'est pas connecté.
export function ErrorAuth() {
    return (
        <StyledError>
            <StyledImgError
                src={require("../../assets/error.svg").default}
                alt="log"
            />
            <StyledMessageError>Veuillez-vous authentifier.</StyledMessageError>
        </StyledError>
    );
}

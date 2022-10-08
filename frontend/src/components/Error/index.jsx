import {
    StyledError,
    StyledImgError,
    StyledMessageError,
} from "../../utils/style/Error";

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

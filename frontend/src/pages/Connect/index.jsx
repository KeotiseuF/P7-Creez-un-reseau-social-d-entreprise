import { useForm } from "react-hook-form"; // Hook qui permet de gérer un formulaire.
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

// Importe le style des éléments de ma page.
import {
    StyledConnect,
    StyledHeader,
    StyledForm,
    StyledFrame,
    StyledLabel,
    StyledInput,
    StyledGroupo,
    StyledOneSubmit,
    StyledSubmits,
    StyledPrimaryTitle,
    StyledSecondaryTitle,
    StyledError,
    StyledDisplayPass,
    StyledListing,
    StyledLastBlock,
    StyledInputLastBlock,
} from "../../utils/style/Connect";

// Affiche la page de connexion.
function Connect() {
    const {
        register, //  Permet d'enregistrer une entrée.
        handleSubmit, // Reçoit les données du formulaire si la validation du formulaire est réussie.
        formState: { errors }, // Contient des informations sur l'état complet du formulaire.
        watch, // Permet de regarder les données du formulaire.
    } = useForm({ mode: "onTouched" }); // La validation se déclenchera à chaque événement.

    const watchPassword = watch(["password", "confirm_password"]);
    const validPassword = watchPassword[0] === watchPassword[1];
    const [loader, setLoader] = useState(true);
    const [displayPassword, setDisplayPassword] = useState(false);
    const [password, setPassword] = useState("");
    const oneUppercaseLetter = /[A-Z]/.test(password);
    const oneLowercaseLetter = /[a-z]/.test(password);
    const oneNumber = /[0-9]/.test(password);
    const oneSpecialCharacter = /[*.!@#$%^&(){}[\]:;]/.test(password);
    const lengthPassword = password.length >= 12;
    const [choiceUser, setChoiceUser] = useState(false);

    // Génère les composants pour s'inscrire.
    const testRegister = () => {
        const displayBlock = document.getElementById("frame_confirm_password");
        const addTrue = document.getElementById("confirm_password");
        const connect = document.getElementsByClassName("connection");
        const inscription = document.getElementsByClassName("register");
        const inputRegister = document.getElementById("inputRegister");
        const inputConnect = document.getElementById("inputConnect");

        inscription[0].style.display = "flex";
        connect[0].style.display = "none";
        displayBlock.style.display = "flex";
        addTrue.setAttribute("required", true);
        inputRegister.style.display = "none";
        inputConnect.style.display = "flex";
        setChoiceUser(true);
    };

    // Génère les composants pour se connecter.
    const testConnect = () => {
        const displayBlock = document.getElementById("frame_confirm_password");
        const addTrue = document.getElementById("confirm_password");
        const connect = document.getElementsByClassName("connection");
        const inscription = document.getElementsByClassName("register");
        const inputRegister = document.getElementById("inputRegister");
        const inputConnect = document.getElementById("inputConnect");

        inscription[0].style.display = "none";
        connect[0].style.display = "flex";
        displayBlock.style.display = "none";
        addTrue.removeAttribute("required");
        inputRegister.style.display = "flex";
        inputConnect.style.display = "none";
        setChoiceUser(false);
    };

    // Envoie les données du formulaire au backend.
    const onSubmit = (data) => {
        fetch(
            `http://localhost:4200/api/auth/${choiceUser ? "signup" : "login"}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                const inputConnect = document.getElementById("inputConnect");
                const token = data.token;
                const userId = data.userId;
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("userId", JSON.stringify(userId));
                data.error === undefined
                    ? choiceUser
                        ? inputConnect.click()
                        : data && (window.location.href = `/accueil`)
                    : alert("Veuillez vérifier vos données");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    // Permet de définir le temps d'affichage du composant de chargement le temps que les éléments de la page d'accueil se charge.
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    // Affiche le composant de chargement s'il est vrai sinon affiche la page d'accueil.
    return loader ? (
        <Loader />
    ) : (
        <StyledConnect>
            <StyledHeader>
                <StyledPrimaryTitle>
                    <StyledGroupo>Groupomania</StyledGroupo> Network
                </StyledPrimaryTitle>
                <StyledSecondaryTitle>
                    Bienvenue, on vous attendez !
                </StyledSecondaryTitle>
            </StyledHeader>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledFrame id="frame_email">
                    <StyledLabel htmlFor="email">Email : </StyledLabel>
                    <StyledInput
                        id="email"
                        type="email"
                        {...register("email", {
                            pattern: {
                                value: /^[A-Za-z][-a-z0-9._]+[-a-z0-9]@[-a-z0-9]+[.]{1}[a-z]{2,5}$/,
                                message: "• Email n'est pas valide",
                            },
                            required: true,
                        })}
                    />
                </StyledFrame>
                <StyledError>{errors.email?.message}</StyledError>

                <StyledFrame id="frame_password">
                    <StyledLabel htmlFor="password">
                        Mot de passe :{" "}
                    </StyledLabel>
                    <StyledInput
                        id="password"
                        type={displayPassword ? "text" : "password"}
                        {...register("password", {
                            pattern: {
                                value: /^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
                            },
                            required: true,
                        })}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <StyledDisplayPass
                        type="button"
                        onClick={() => setDisplayPassword(!displayPassword)}
                        value={displayPassword ? "Cacher" : "Afficher"}
                    />
                </StyledFrame>

                {password && (
                    <StyledListing>
                        {oneUppercaseLetter ? null : (
                            <li>Doit contenir 1 majuscule</li>
                        )}
                        {oneLowercaseLetter ? null : <li>1 minuscule</li>}
                        {oneNumber ? null : <li>1 chiffre</li>}
                        {oneSpecialCharacter ? null : (
                            <li>1 caractère spécial</li>
                        )}
                        {lengthPassword ? null : (
                            <li>Une longueur d'au moins 12</li>
                        )}
                    </StyledListing>
                )}
                <StyledFrame
                    id="frame_confirm_password"
                    style={{ display: "none" }}>
                    <StyledLabel htmlFor="confirm_password">
                        Confirme mot de passe :{" "}
                    </StyledLabel>
                    <StyledInput
                        id="confirm_password"
                        type={displayPassword ? "text" : "password"}
                        {...register("confirm_password", {
                            pattern: {
                                value: /^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
                                message: "• Mot de passe non similaire",
                            },
                        })}
                    />
                    <StyledDisplayPass
                        type="button"
                        onClick={(e) => setDisplayPassword(!displayPassword)}
                        value={displayPassword ? "Cacher" : "Afficher"}
                    />
                </StyledFrame>

                {validPassword ? null : (
                    <StyledError>
                        {errors.confirm_password?.message}
                    </StyledError>
                )}

                <StyledSubmits className="valid_form">
                    <StyledOneSubmit
                        value="Connexion"
                        className="connection"
                        type="submit"
                    />
                    <StyledOneSubmit
                        value="Inscription"
                        className="register"
                        type="submit"
                        style={{ display: "none" }}
                    />
                </StyledSubmits>
            </StyledForm>
            <StyledLastBlock>
                <StyledInputLastBlock
                    type="button"
                    value="Mot de passe oublié ?"
                />

                <StyledInputLastBlock
                    type="button"
                    value="S'inscrire"
                    onClick={testRegister}
                    id="inputRegister"
                />
                <StyledInputLastBlock
                    type="button"
                    value="Se connecter"
                    onClick={testConnect}
                    id="inputConnect"
                    style={{ display: "none" }}
                />
            </StyledLastBlock>
        </StyledConnect>
    );
}

export default Connect;

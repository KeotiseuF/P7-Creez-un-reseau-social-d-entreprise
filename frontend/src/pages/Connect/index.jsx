import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

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
    StyledButton,
    StyledListing,
    StyledLastBlock,
} from "../../utils/style/Connect";

function Connect() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({ mode: "onTouched" });

    const watchPassword = watch(["password", "confirm_password"]);
    const validPassword = watchPassword[0] === watchPassword[1];
    const [loader, setLoader] = useState(true);
    const [displayPassword, setDisplayPassword] = useState(false);
    const [password, setPassword] = useState("");
    const oneUppercaseLetter = /[A-Z]/.test(password);
    const oneLowercaseLetter = /[a-z]/.test(password);
    const oneNumber = /[0-9]/.test(password);
    const oneSpecialCharacter = /[*.!@#$%^&(){}[]:;]/.test(password);
    const lengthPassword = password.length >= 12;
    const [choiceUser, setChoiceUser] = useState(false);

    const testRegister = () => {
        // const displayBlock = document.getElementById("frame_confirm_password");
        //const addTrue = document.getElementById("confirm_password");
        //displayBlock.style.display = "flex";
        //addTrue.setAttribute("required", true);
        setChoiceUser(true);
    };

    const testConnect = () => {
        // const displayBlock = document.getElementById("frame_confirm_password");
        //displayBlock.style.display = "none";
        //const addTrue = document.getElementById("confirm_password");
        //addTrue.removeAttribute("required");
        setChoiceUser(false);
    };

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
                console.log(data);
                const token = data.token;
                const userId = data.userId;
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("userId", JSON.stringify(userId));
                console.log(token);
                data.error === undefined
                    ? data && console.log("(window.location.href = `/accueil`)")
                    : alert("Veuillez vérifier vos données");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

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
                                message: "● Email n'est pas valide",
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
                    <StyledButton
                        onClick={() => setDisplayPassword(!displayPassword)}>
                        {displayPassword ? "Cacher" : "Afficher"}
                    </StyledButton>
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
                    />
                </StyledSubmits>
            </StyledForm>
            <StyledLastBlock>
                <input type="button" value="Mot de passe oublié ?" />

                <input
                    type="button"
                    value="S'inscrire"
                    onClick={testRegister}
                    id="inputRegister"
                />
                <input
                    type="button"
                    value="Se connecter"
                    onClick={testConnect}
                    id="inputConnect"
                />
            </StyledLastBlock>
        </StyledConnect>
    );
}

export default Connect;

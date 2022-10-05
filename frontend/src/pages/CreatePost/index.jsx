import { useForm } from "react-hook-form"; // Hook qui permet de gérer un formulaire.
import { HeaderCreateModifyPost } from "../../components/Header"; // Importe une fonction qui gère le header de la page.
import { ErrorAuth } from "../../components/Error"; //Importe une fonction qui gère les erreurs d'authentification.
import React, { useEffect, useState } from "react"; // Va permettre d'inclure le mode strict autour de mes composants.
import {
    StyledInputImg,
    StyledFrame,
    StyledLabel,
    StyledValidForm,
    StyledInputValidForm,
    StyledInputMessage,
    StyledForm,
} from "../../utils/style/CreateOrModifyPost"; // Importe le stylr de ma page.

// Affiche la page pour créer un post .
function CreatePost() {
    const token = JSON.parse(localStorage.getItem("token"));

    const {
        register, //  Permet d'enregistrer une entrée.
        handleSubmit, // Reçoit les données du formulaire si la validation du formulaire est réussie.
    } = useForm({ mode: "onTouched" }); // La validation se déclenchera à événement.

    // Envoie les données du formulaire au backend.
    const onSubmit = (data) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const post = new FormData();

        post.append("post", JSON.stringify({ postMessage: data.postMessage }));
        post.append("image", data.imageUrl[0]);

        fetch("http://localhost:4200/api/posts", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: post,
        })
            .then((response) => {
                response.json();
            })
            .then(() => {
                window.location.href = `/accueil`;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const fileTypes = ["jpg", "jpeg", "png"];
    const [verifMessage, setVerifMessage] = useState("");
    const [verifImage, setVerifImage] = useState("");

    // Vérifie l'extension des fichiers, une alert intervient s'il ne s'agit pas d'image.
    const validFileType = () => {
        const image = document.getElementById("image").value.split(".")[1];
        const validForm = document.getElementById("valid_form");
        const validation = fileTypes.find((e) => e === image);

        if (validation === undefined) {
            alert("Type de fichier invalide");
            validForm.style.display = "none";
        } else {
            setVerifImage(true);
        }
    };

    useEffect(() => {
        const inputValid = document.getElementById("postMessage");
        inputValid.addEventListener("change", () => {
            setVerifMessage(true);
        });
    }, []);

    if (verifMessage && verifImage) {
        const validForm = document.getElementById("valid_form");
        validForm.removeAttribute("disabled");
        validForm.style.display = "block";
    }

    return token ? (
        <React.StrictMode>
            <HeaderCreateModifyPost />
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledFrame className="frame_commentaire">
                    <StyledLabel htmlFor="postMessage">
                        Commentaire :
                    </StyledLabel>
                    <StyledInputMessage
                        name="postMessage"
                        id="postMessage"
                        type="text"
                        {...register("postMessage", { required: true })}
                    />
                </StyledFrame>

                <StyledFrame className="frame_image">
                    <StyledLabel htmlFor="image">
                        Veuillez insérer une image :
                    </StyledLabel>
                    <StyledInputImg
                        id="image"
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg,"
                        {...register("imageUrl")}
                        onChange={() => validFileType()}
                    />
                </StyledFrame>

                <StyledValidForm className="valid_form">
                    <StyledInputValidForm
                        disabled
                        value="Valider"
                        id="valid_form"
                        type="submit"
                    />
                </StyledValidForm>
            </StyledForm>
        </React.StrictMode>
    ) : (
        <ErrorAuth />
    );
}

export default CreatePost;

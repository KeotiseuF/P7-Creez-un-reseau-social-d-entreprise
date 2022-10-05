import { ErrorAuth } from "../../components/Error"; //Importe une fonction qui gère les erreurs d'authentification.
import { HeaderCreateModifyPost } from "../../components/Header"; // Importe une fonction qui gère des liens de navigation.
import { useForm } from "react-hook-form"; // Hook qui permet de gérer un formulaire.
import { useParams } from "react-router-dom"; //  Renvoie un objet de paires clé/valeur des paramètres dynamiques de l'URL
import React, { useState, useEffect } from "react"; //Importe 2 hook et react va permettre d'inclure le mode strict autour de mes composants.
import {
    StyledInputImg,
    StyledFrame,
    StyledLabel,
    StyledValidForm,
    StyledInputValidForm,
    StyledInputMessage,
    StyledForm,
} from "../../utils/style/CreateOrModifyPost"; // Importe le style de ma page.

// Affiche la page pour modifier un post .
function ModifyPost() {
    const token = JSON.parse(localStorage.getItem("token"));
    let { id } = useParams();

    const [message, setMessage] = useState(" ");
    const [image, setImage] = useState(" ");
    const [altImage, setAltImage] = useState(" ");

    const {
        register, //  Permet d'enregistrer une entrée.
        handleSubmit, // Reçoit les données du formulaire si la validation du formulaire est réussie.
    } = useForm({ mode: "onTouched" }); // La validation se déclenchera à événement.

    // Va attendre que le token et l'id soit définit pour récupérer au backend le post à modifier.
    useEffect(() => {
        fetch(`http://localhost:4200/api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                setMessage(data.postMessage);
                setImage(data.imageUrl);
                setAltImage(data.imageUrl.split("/images/")[1]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id, token]);

    // Envoie les données du formulaire au backend.
    const onSubmit = (data) => {
        const post = new FormData();
        post.append(
            "post",
            JSON.stringify({
                postMessage:
                    data.postMessage === " " ? message : data.postMessage,
            })
        );
        post.append("image", data.imageUrl[0]);

        const postMessage =
            data.postMessage === " " ? message : data.postMessage;

        // S'il n'y a pas d'image envoie juste le message sinon envoie le message et l'image modifiés.
        if (data.imageUrl.length === 0) {
            fetch(`http://localhost:4200/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ postMessage }),
            })
                .then((response) => {
                    response.json();
                })
                .then(() => {
                    alert("Post modifié !");
                    document.location.href = "http://localhost:3000/accueil";
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            fetch(`http://localhost:4200/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: post,
            })
                .then((response) => {
                    response.json();
                })
                .then(() => {
                    alert("Post modifié !");
                    document.location.href = "http://localhost:3000/accueil";
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

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
                        value={message}
                        {...register("postMessage", { required: true })}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </StyledFrame>

                <img src={image} alt={altImage}></img>
                <StyledFrame className="frame_image">
                    <StyledLabel htmlFor="image">
                        Veuillez remplaer l'image ci-dessus :
                    </StyledLabel>
                    <StyledInputImg
                        id="image"
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg,"
                        {...register("imageUrl")}
                    />
                </StyledFrame>

                <StyledValidForm className="valid_form">
                    <input value="Valider" id="valid_form" type="submit" />
                </StyledValidForm>
            </StyledForm>
        </React.StrictMode>
    ) : (
        <ErrorAuth />
    );
}

export default ModifyPost;
